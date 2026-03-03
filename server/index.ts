import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const multer = require('multer');

import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import { prisma } from './prisma.js';
import { supabase } from './supabase.js';
import { getAllSettings, setSettings, getVideos, getAdminByCredentials, updateAdminPassword, seedIfNeeded, DEFAULT_SETTINGS } from './db.js';

let adminSession: { token: string; adminId: bigint } | null = null;

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';
const frontendUrl = (process.env.FRONTEND_URL || '').trim();

app.use(cors({
  origin: frontendUrl || true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

const COOKIE_NAME = 'peleai_admin_session';

// Auth middleware: cookie (HttpOnly) ou header Authorization (rétrocompat)
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const tokenFromCookie = req.cookies?.[COOKIE_NAME];
  const auth = req.headers.authorization;
  const tokenFromHeader = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  const token = tokenFromCookie || tokenFromHeader;
  if (!token || !adminSession || token !== adminSession.token) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  (req as express.Request & { adminId?: bigint }).adminId = adminSession.adminId;
  next();
};

// --- Public API ---

app.get('/api/health', (_req, res) => {
  const ok = !!process.env.DATABASE_URL;
  res.json({ ok, env: ok ? 'loaded' : 'missing' });
});

app.get('/api/site', async (_req, res) => {
  try {
    const [settings, videos] = await Promise.all([getAllSettings(), getVideos()]);
    const s = Object.keys(settings || {}).length ? settings : DEFAULT_SETTINGS;
    return res.json({ settings: s || {}, videos: videos || [] });
  } catch (e) {
    console.error('api/site error:', e);
    return res.status(200).json({ settings: DEFAULT_SETTINGS, videos: [] });
  }
});

// --- Admin API ---

app.post('/api/admin/logout', (_req, res) => {
  adminSession = null;
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ success: true });
});

app.get('/api/admin/me', authMiddleware, (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Identifiants requis' });
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const admin = await getAdminByCredentials(username, hash);
    if (!admin) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    adminSession = { token, adminId: admin.id };
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: frontendUrl ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      path: '/',
    });
    res.json({ success: true });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Erreur serveur. Vérifiez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env' });
  }
});

app.post('/api/admin/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Fichier requis' });
    const { type } = req.body || {};
    const ext = req.file.originalname.split('.').pop() || 'png';
    const name = `${type || 'file'}-${Date.now()}.${ext}`;
    const path = `assets/${name}`;
    const { data, error } = await supabase.storage.from('assets').upload(path, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true,
    });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('assets').getPublicUrl(data.path);
    res.json({ url: urlData.publicUrl });
  } catch (e) {
    console.error('upload error:', e);
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/admin/settings', authMiddleware, async (req, res) => {
  try {
    const settings = req.body;
    if (typeof settings !== 'object') {
      return res.status(400).json({ error: 'Données invalides' });
    }
    await setSettings(settings);
    res.json({ success: true });
  } catch (e) {
    console.error('settings error:', e);
    res.status(500).json({ error: String(e) });
  }
});

app.get('/api/admin/videos', authMiddleware, async (_req, res) => {
  try {
    const videos = await getVideos();
    res.json(videos);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post('/api/admin/videos', authMiddleware, async (req, res) => {
  try {
    const { url, title, description, thumbnail_url, is_preview } = req.body;
    if (!url) return res.status(400).json({ error: 'URL requise' });
    const max = await prisma.video.findFirst({ orderBy: { sortOrder: 'desc' }, select: { sortOrder: true } });
    const sortOrder = (max?.sortOrder ?? 0) + 1;
    const video = await prisma.video.create({
      data: {
        url,
        title: title || '',
        description: description || '',
        thumbnailUrl: thumbnail_url || '',
        isPreview: !!is_preview,
        sortOrder,
      },
    });
    res.json({ id: Number(video.id) });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/admin/videos/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, thumbnail_url, is_preview } = req.body;
    await prisma.video.update({
      where: { id: BigInt(id) },
      data: { url, title, description, thumbnailUrl: thumbnail_url, isPreview: !!is_preview },
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.delete('/api/admin/videos/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.video.delete({ where: { id: BigInt(req.params.id) } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/admin/videos/:id/preview', authMiddleware, async (req, res) => {
  try {
    await prisma.video.updateMany({ data: { isPreview: false } });
    await prisma.video.update({ where: { id: BigInt(req.params.id) }, data: { isPreview: true } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put('/api/admin/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Nouveau mot de passe requiert au moins 6 caractères' });
    }
    const adminId = (req as express.Request & { adminId?: bigint }).adminId;
    if (!adminId) return res.status(401).json({ error: 'Non autorisé' });
    const currentHash = crypto.createHash('sha256').update(currentPassword).digest('hex');
    const newHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    const ok = await updateAdminPassword(adminId, currentHash, newHash);
    if (!ok) return res.status(400).json({ error: 'Mot de passe actuel incorrect' });
    adminSession = null;
    res.json({ success: true });
  } catch (e) {
    console.error('password change error:', e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/visit', async (_req, res) => {
  try {
    const sessionId = _req.headers['x-visit-session'] as string || null;
    const visit = await prisma.visit.create({ data: { sessionId: sessionId || undefined } });
    const total = await prisma.visit.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await prisma.visit.count({
      where: { createdAt: { gte: today } },
    });
    res.json({ total, today: todayCount });
  } catch (e) {
    console.error('visit error:', e);
    res.status(500).json({ total: 0, today: 0 });
  }
});

app.get('/api/admin/stats', authMiddleware, async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const [total, todayCount, videosCount] = await Promise.all([
      prisma.visit.count(),
      prisma.visit.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.video.count(),
    ]);
    res.json({ visitors: total, visitorsToday: todayCount, videosCount });
  } catch (e) {
    console.error('stats error:', e);
    res.status(200).json({ visitors: 0, visitorsToday: 0, videosCount: 0 });
  }
});

// En production : servir le frontend (SPA) si dist existe (déploiement monolithique)
// Si API_ONLY=true (Netlify + Render), on ne sert pas le frontend
const apiOnly = process.env.API_ONLY === 'true';
if (isProd && !apiOnly) {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

// Démarrer le serveur
async function start() {
  const envOk = !!process.env.DATABASE_URL;
  console.log(envOk ? '✓ DATABASE_URL chargée (Prisma)' : '⚠ DATABASE_URL manquante dans .env');
  try {
    await seedIfNeeded();
  } catch (e) {
    console.warn('Seed skipped:', e instanceof Error ? e.message : e);
  }
  try {
    await supabase.storage.createBucket('assets', { public: true });
    console.log('✓ Bucket assets créé');
  } catch {
    /* bucket existe déjà */
  }
  const server = app.listen(PORT, () => {
    console.log(`API PeleAI 360° sur http://localhost:${PORT}`);
  });
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠ Port ${PORT} déjà utilisé. Fermez l'autre processus ou exécutez :`);
      console.error(`   taskkill /F /IM node.exe\n`);
    } else {
      throw err;
    }
  });
}

start();

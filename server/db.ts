import crypto from 'crypto';
import { prisma } from './prisma.js';

export const DEFAULT_SETTINGS: Record<string, string> = {
  logo_url: 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png',
  favicon_url: 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png',
  site_name: 'PeleAI 360°',
  email: 'peleai.ci@gmail.com',
  phone: '+225 05 06 80 53 82',
  address: 'Cocody, Abidjan, CI',
  whatsapp_number: '2250506805382',
  whatsapp_url: 'https://wa.me/2250506805382',
  whatsapp_default_message: "Bonjour, je suis intéressé par la solution PeleAI 360°. J'aimerais avoir plus d'informations.",
  facebook_url: '#',
  twitter_url: '#',
  instagram_url: '#',
  linkedin_url: '#',
  about_subtitle: "L'Agence PeleAI 360°",
  about_title: 'Propulser les marchands africains vers le futur.',
  about_desc1: "Nous ne sommes pas juste une boîte de logiciels. Nous sommes vos partenaires de croissance. PeleAI est née de la volonté de briser les barrières technologiques pour les commerçants locaux.",
  about_desc2: "Notre mission est claire : démocratiser l'accès aux outils de gestion de classe mondiale. Nous combinons une expertise technique pointue avec une connaissance profonde des réalités du marché africain pour créer des solutions qui fonctionnent vraiment.",
  about_stat_marchands: '500+',
  about_stat_satisfaction: '98%',
  about_stat_support: '24/7',
  about_stat_frais: '0',
  about_experts_count: '+12',
  about_experts_label: 'Experts à votre service',
  about_vision_label: 'Vision',
  about_vision_text: 'Innovation sans frontières',
  about_button_text: "En savoir plus sur notre vision",
  about_button_link: '#',
  contact_title: 'Prêt à digitaliser votre commerce ?',
  contact_subtitle: "Notre équipe d'experts est prête à vous accompagner. Discutons de vos besoins spécifiques et voyons comment PeleAI peut vous aider.",
  meta_title: 'PeleAI 360° - Solution de Gestion Commerciale',
  meta_description: 'Pilotez votre commerce physique et en ligne d\'une seule main. E-commerce, POS, stock. 350 000 FCFA, sans abonnement.',
};

export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.setting.findMany({ select: { key: true, value: true } });
    const obj: Record<string, string> = {};
    for (const row of rows) {
      obj[row.key] = row.value ?? '';
    }
    return obj;
  } catch (e) {
    console.error('getAllSettings exception:', e);
    return {};
  }
}

export async function setSettings(settings: Record<string, string>) {
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}

export async function getVideos() {
  try {
    const data = await prisma.video.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return data.map((v) => ({
      ...v,
      id: Number(v.id),
      thumbnail_url: v.thumbnailUrl ?? '',
      is_preview: v.isPreview ? 1 : 0,
      sort_order: v.sortOrder,
    }));
  } catch (e) {
    console.error('getVideos exception:', e);
    return [];
  }
}

export async function getAdminByCredentials(username: string, passwordHash: string) {
  try {
    const admin = await prisma.admin.findFirst({
      where: { username, passwordHash },
      select: { id: true },
    });
    return admin;
  } catch (e) {
    console.error('getAdminByCredentials exception:', e);
    return null;
  }
}

export async function updateAdminPassword(adminId: bigint, currentPasswordHash: string, newPasswordHash: string) {
  const admin = await prisma.admin.findFirst({
    where: { id: adminId, passwordHash: currentPasswordHash },
  });
  if (!admin) return false;
  await prisma.admin.update({
    where: { id: adminId },
    data: { passwordHash: newPasswordHash },
  });
  return true;
}

export async function seedIfNeeded() {
  try {
    const count = await prisma.setting.count();
    if (count === 0) {
      for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
        await prisma.setting.create({ data: { key, value } });
      }
    }

    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
      const hash = crypto.createHash('sha256').update('admin123').digest('hex');
      await prisma.admin.create({ data: { username: 'admin', passwordHash: hash } });
    }

    const videoCount = await prisma.video.count();
    if (videoCount === 0) {
      await prisma.video.create({
        data: {
          url: 'https://www.youtube.com/embed/v74_j_6L_X0',
          title: "Découvrez l'Innovation en Action",
          description: "Voyez comment PeleAI transforme la gestion quotidienne de centaines de marchands grâce à l'intelligence artificielle.",
          thumbnailUrl: 'https://picsum.photos/seed/digital-business/1920/1080',
          isPreview: true,
          sortOrder: 0,
        },
      });
    }
  } catch (e) {
    console.warn('Seed skipped:', e instanceof Error ? e.message : e);
  }
}

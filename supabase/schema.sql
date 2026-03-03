-- Exécutez ce script dans Supabase : SQL Editor > New query
-- https://supabase.com/dashboard > Votre projet > SQL Editor

-- Table des paramètres du site
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Table des vidéos
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  is_preview BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des admins
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Un seul enregistrement peut être la vidéo de prévisualisation
CREATE UNIQUE INDEX IF NOT EXISTS idx_videos_preview 
ON videos (is_preview) WHERE is_preview = true;

-- Données par défaut (optionnel - le serveur les insère au premier lancement)
INSERT INTO settings (key, value) VALUES
  ('logo_url', 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png'),
  ('favicon_url', 'https://storage.googleapis.com/aistudio-user-uploads/62j5j67gddsyu3dilz5nze/logo_peleai.png'),
  ('site_name', 'PeleAI 360°'),
  ('email', 'peleai.ci@gmail.com'),
  ('phone', '+225 05 06 80 53 82'),
  ('address', 'Cocody, Abidjan, CI'),
  ('whatsapp_number', '2250506805382'),
  ('whatsapp_url', 'https://wa.me/2250506805382'),
  ('facebook_url', '#'),
  ('twitter_url', '#'),
  ('instagram_url', '#'),
  ('linkedin_url', '#'),
  ('about_subtitle', 'L''Agence PeleAI 360°'),
  ('about_title', 'Propulser les marchands africains vers le futur.'),
  ('about_desc1', 'Nous ne sommes pas juste une boîte de logiciels. Nous sommes vos partenaires de croissance.'),
  ('about_desc2', 'Notre mission est claire : démocratiser l''accès aux outils de gestion de classe mondiale.'),
  ('about_stat_marchands', '500+'),
  ('about_stat_satisfaction', '98%'),
  ('about_stat_support', '24/7'),
  ('about_stat_frais', '0'),
  ('about_vision_label', 'Vision'),
  ('about_vision_text', 'Innovation sans frontières'),
  ('about_button_text', 'En savoir plus sur notre vision'),
  ('about_button_link', '#'),
  ('contact_title', 'Prêt à digitaliser votre commerce ?'),
  ('contact_subtitle', 'Notre équipe d''experts est prête à vous accompagner.')
ON CONFLICT (key) DO NOTHING;

-- Admin par défaut : admin / admin123
INSERT INTO admins (username, password_hash) VALUES
  ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
ON CONFLICT (username) DO NOTHING;

-- Vidéo de démo par défaut (uniquement si aucune vidéo de prévisualisation n'existe)
INSERT INTO videos (url, title, description, thumbnail_url, is_preview, sort_order)
SELECT 'https://www.youtube.com/embed/v74_j_6L_X0', 'Découvrez l''Innovation en Action', 'Voyez comment PeleAI transforme la gestion quotidienne de centaines de marchands grâce à l''intelligence artificielle.', 'https://picsum.photos/seed/digital-business/1920/1080', true, 0
WHERE NOT EXISTS (SELECT 1 FROM videos WHERE is_preview = true);

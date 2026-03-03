# Déploiement Netlify + Render - PeleAI 360°

Architecture : **Frontend sur Netlify** + **API sur Render** (gratuit).

---

## Étape 1 : Déployer l'API sur Render

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. Connectez votre repo GitHub
3. Configurez :
   - **Name** : `peleai360-api`
   - **Build Command** : `npm install && npx prisma generate`
   - **Start Command** : `npm run start`
   - ⚠️ **Ne pas** exécuter `npm run build` (le frontend va sur Netlify)
4. Variables d'environnement :
   - `NODE_ENV` = `production`
   - `API_ONLY` = `true`
   - `DATABASE_URL` = (Supabase)
   - `SUPABASE_URL` = (Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` = (Supabase)
   - `FRONTEND_URL` = `https://votre-site.netlify.app` (à mettre à jour après Netlify)
5. **Create** → Notez l'URL : `https://peleai360-api.onrender.com`

Exécutez `npm run db:push` une fois (local ou shell Render).

---

## Étape 2 : Déployer le frontend sur Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connectez GitHub et sélectionnez le repo
3. Paramètres (Netlify les détecte via `netlify.toml`) :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. **Environment variables** → **Add variable** :
   - `VITE_API_URL` = `https://peleai360-api.onrender.com` (votre URL Render)
5. **Deploy site**

Votre site : `https://random-name-123.netlify.app`

---

## Étape 3 : Mettre à jour le backend

Retournez sur Render → **Environment** :
- `FRONTEND_URL` = `https://votre-site.netlify.app` (l'URL Netlify réelle)
- **Save** → le service redémarre

---

## Récapitulatif

| Service | URL | Rôle |
|---------|-----|------|
| **Netlify** | https://xxx.netlify.app | Frontend (React) |
| **Render** | https://peleai360-api.onrender.com | API (Express + Prisma) |

- **Site public** : l'URL Netlify
- **Admin** : `https://xxx.netlify.app/admin`

---

## Domaine personnalisé (optionnel)

Dans Netlify : **Domain settings** → **Add custom domain** (ex: `peleai360.com`).

Puis sur Render : mettez à jour `FRONTEND_URL` avec le nouveau domaine.

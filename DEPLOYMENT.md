# Déploiement gratuit - PeleAI 360°

Guide pour héberger le projet gratuitement sur **Render.com**.

## Prérequis

- Compte [Render.com](https://render.com) (gratuit)
- Projet Supabase (base PostgreSQL + Storage)
- Repo GitHub du projet

---

## 1. Préparer Supabase

1. **Base de données** : Supabase fournit déjà PostgreSQL
2. **Connection string** : Dashboard Supabase → Settings → Database → Connection string (URI)
   - Utilisez la version **Transaction** ou **Session** (port 5432) pour Prisma
   - Ou la version **Pooler** (port 6543) avec `?pgbouncer=true`
3. **Storage** : Créez un bucket `assets` (public) si besoin
4. **Variables** : Notez `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` (Settings → API)

---

## 2. Déployer sur Render

### Option A : Via le tableau de bord (recommandé)

1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. **New** → **Web Service**
3. Connectez votre repo GitHub et sélectionnez le projet
4. Configurez :
   - **Name** : `peleai360` (ou autre)
   - **Region** : Frankfurt ou Oregon
   - **Branch** : `main`
   - **Runtime** : Node
   - **Build Command** : `npm install && npm run build && npx prisma generate`
   - **Start Command** : `npm run start`
5. **Environment** : Ajoutez les variables
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (votre connection string Supabase)
   - `SUPABASE_URL` = (votre URL Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` = (votre clé service role)
6. **Create Web Service**

### Option B : Via render.yaml (Blueprint)

1. Poussez le fichier `render.yaml` à la racine du repo
2. Render → **New** → **Blueprint**
3. Connectez le repo
4. Ajoutez les variables secrètes dans le dashboard (DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
5. Déployez

---

## 3. Base de données

Exécutez la migration Prisma une fois :

```bash
# En local avec DATABASE_URL pointant vers Supabase
npm run db:push
```

Ou via Render : ajoutez une tâche one-off ou exécutez `npx prisma db push` dans le shell du service.

---

## 4. Après le déploiement

- **URL** : `https://peleai360.onrender.com` (ou votre nom)
- **Admin** : `https://votre-url.onrender.com/admin` (login : `admin` / `admin123`)
- **Première visite** : changez le mot de passe admin immédiatement

---

## 5. Limites du plan gratuit Render

- **Spin-down** : le service s’arrête après 15 min d’inactivité
- **Première requête** : peut prendre 30–60 s (cold start)
- **Heures** : 750 h/mois gratuites
- **Bande passante** : limitée

---

## Alternatives gratuites

| Plateforme | Frontend | Backend | Notes |
|------------|----------|---------|-------|
| **Render** | ✓ | ✓ | Tout-en-un, simple |
| **Vercel** | ✓ | ✓ (serverless) | Nécessite d’adapter Express |
| **Railway** | ✓ | ✓ | ~5 $/mois de crédit gratuit |
| **Fly.io** | ✓ | ✓ | Bon pour Node.js |

---

## Dépannage

- **502 Bad Gateway** : Vérifiez que `PORT` est bien utilisé (Render injecte `PORT`)
- **Build échoue** : Vérifiez les logs, `npm run build` et `prisma generate` doivent réussir
- **Erreur base** : Vérifiez `DATABASE_URL` et que `db:push` a été exécuté

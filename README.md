# PeleAI 360°

Solution de gestion commerciale (E-commerce, POS, stock) pour marchands africains.

## Stack

- **Frontend** : React 19, Vite, Tailwind, Motion
- **Backend** : Express, Prisma
- **Base de données** : PostgreSQL (Supabase)

## Prérequis

- Node.js 18+
- Compte Supabase

## Installation

1. **Cloner et installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   - Copier `.env.example` vers `.env`
   - Remplir `DATABASE_URL` (Supabase > Settings > Database > Connection string URI)

3. **Synchroniser la base de données**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Lancer l'application**
   ```bash
   npm run dev
   ```

- **Client** : http://localhost:3000
- **API** : http://localhost:3001
- **Admin** : http://localhost:3000/admin (login : `admin` / `admin123`)

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le client et l'API |
| `npm run build` | Build de production |
| `npm run start` | Démarre le serveur en production (frontend + API) |
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Synchronise le schéma avec la base |
| `npm run db:studio` | Interface Prisma Studio |

## Déploiement gratuit

- **[DEPLOYMENT_NETLIFY.md](DEPLOYMENT_NETLIFY.md)** : Frontend Netlify + API Render (recommandé)
- **[DEPLOYMENT.md](DEPLOYMENT.md)** : Tout sur Render (monolithique)

## Documentation

- [Configuration Prisma](PRISMA_SETUP.md)
- [Configuration Supabase](SUPABASE_SETUP.md)

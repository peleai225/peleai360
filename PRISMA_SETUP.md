# Configuration Prisma + Supabase

## 1. Installer les dépendances

```bash
npm install
```

Si Prisma 7 est installé par erreur, forcez la version 5 :
```bash
npm install prisma@5 @prisma/client@5 --save-exact
```

## 2. Récupérer l'URL de connexion Supabase

1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. **Settings** > **Database**
4. Section **Connection string** > **URI**
5. Copiez l'URL (mode **Transaction** recommandé, port 6543)

Format attendu :
```
postgresql://postgres.[ref]:[MOT_DE_PASSE]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

## 3. Ajouter DATABASE_URL dans .env

Ajoutez ou modifiez dans votre fichier `.env` :

```
DATABASE_URL=postgresql://postgres.oxvasxgxcdsmsxgdpict:[VOTRE_MOT_DE_PASSE]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Important :** Remplacez `[VOTRE_MOT_DE_PASSE]` par le mot de passe de la base de données (celui défini à la création du projet Supabase). La région (`eu-central-1`, `us-east-1`, etc.) peut varier — vérifiez dans le dashboard.

## 4. Exécuter le schéma (tables déjà créées)

Si vous avez déjà exécuté `supabase/schema.sql`, les tables existent. Prisma va les utiliser.

Sinon, pour créer les tables via Prisma :

```bash
npm run db:push
```

## 5. Générer le client Prisma

```bash
npm run db:generate
```

## 6. Lancer l'application

```bash
npm run dev
```

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Synchronise le schéma avec la base (sans migrations) |
| `npm run db:studio` | Ouvre l'interface Prisma Studio pour visualiser les données |

# Configuration Supabase pour PeleAI 360°

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com) et connectez-vous
2. Cliquez sur **New Project**
3. Choisissez un nom, un mot de passe pour la base de données, et une région

## 2. Exécuter le schéma SQL

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Cliquez sur **New query**
3. Copiez-collez le contenu du fichier `supabase/schema.sql`
4. Cliquez sur **Run**

## 3. Récupérer les clés API

1. Allez dans **Project Settings** (icône engrenage)
2. Section **API** :
   - **Project URL** → `SUPABASE_URL`
   - **service_role** (clé secrète) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ Ne partagez jamais la clé `service_role` !

## 4. Configurer le fichier .env

Créez un fichier `.env` à la racine du projet :

```
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 5. Lancer l'application

```bash
npm run dev
```

Identifiants par défaut : **admin** / **admin123**

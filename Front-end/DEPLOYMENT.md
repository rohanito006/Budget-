# Déploiement du Front-end sur Vercel

Ce document explique comment déployer cette application React (Vite) sur Vercel.

## Configuration Vercel

### Fichier `vercel.json`
Un fichier `vercel.json` a été ajouté à la racine du dossier `Front-end` pour gérer les routes de l'application Single Page (SPA). Cela permet à `react-router-dom` de fonctionner correctement après le déploiement.

### Variables d'Environnement
Lors du déploiement sur Vercel, vous **devez** configurer la variable d'environnement suivante dans le tableau de bord Vercel (Project Settings > Environment Variables) :

| Nom de la variable | Description | Exemple |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL de base de votre API Backend | `https://votre-api.up.railway.app/` |

> [!IMPORTANT]
> N'oubliez pas d'inclure le slash `/` final si votre code l'attend (comme dans `src/api.ts`).

## Étapes de déploiement

1. Connectez-vous à [Vercel](https://vercel.com).
2. Cliquez sur **Add New > Project**.
3. Importez votre dépôt GitHub.
4. Dans **Build and Output Settings**, assurez-vous que :
   - **Framework Preset** : Vite
   - **Root Directory** : `Front-end`
5. Dans **Environment Variables**, ajoutez `VITE_API_URL`.
6. Cliquez sur **Deploy**.

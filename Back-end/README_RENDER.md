# Déploiement du Backend sur Render

Ce document explique comment déployer ce backend Django sur Render.

## Configuration Render

### Script de Build
Le fichier `build.sh` à la racine du dossier `Back-end` automatise l'installation des dépendances, la collecte des fichiers statiques et les migrations de base de données.

### Commande de Démarrage (Start Command)
Pour lancer l'application en production, utilisez la commande suivante dans Render :
```bash
gunicorn backend.wsgi:application
```

### Variables d'Environnement
Vous **devez** configurer les variables suivantes dans le tableau de bord Render (Environment > Add Environment Variable) :

| Variable | Description | Valeur conseillée |
| :--- | :--- | :--- |
| `DEBUG` | Désactive le mode debug en production | `False` |
| `SECRET_KEY` | Clé secrète Django (générée aléatoirement) | `votre-clé-très-secrète` |
| `DATABASE_URL` | URL de votre base de données PostgreSQL Render | (Fournie par Render) |
| `ALLOWED_HOSTS` | Domaines autorisés (séparés par espace) | `votre-app.onrender.com .render.com` |
| `CORS_ALLOWED_ORIGINS` | URL de votre frontend (Vercel) | `https://votre-app.vercel.app` |

## Étapes de déploiement

1. Créez un nouveau **Web Service** sur Render.
2. Connectez votre dépôt GitHub.
3. Configurez les dossiers et commandes :
   - **Root Directory** : `Back-end`
   - **Runtime** : `Python 3`
   - **Build Command** : `./build.sh`
   - **Start Command** : `gunicorn backend.wsgi:application`
4. Ajoutez les **Environment Variables** listées ci-dessus.
5. Si vous utilisez une DB SQLite temporaire au lieu de PostgreSQL, assurez-vous de configurer un **Disk** persistant (non recommandé pour la production sur Render).

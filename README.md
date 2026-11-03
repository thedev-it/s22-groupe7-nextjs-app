# S22 – Groupe 7

Projet de groupe Akieni Academy, livrable S22 (02/11 au 06/11/2026) : application Next.js avec authentification Auth.js, déployée sur Vercel.

> Sujet de l'application : _à compléter_

## 🔗 Production

URL : _à compléter après le premier déploiement_

## 👥 Équipe

| Membre                     | Rôle                              | Compte Git     |
| -------------------------- | --------------------------------- | -------------- |
| BITEMO Gilles Brant        | Auth, Admin du dépôt              | @thedev-it     |
| NGASSAI NDONGO Dubien      | Feature                           | @dubien321     |
| INIENGO Alain Justin Ledit | Deploiment                        | @Ghostplayer89 |
| KONGOLO Salem              |    ?                              | @_pseudo_      |
| MOUNGABIO Christ-Henoc     | Rendu & ref                       | @chris-moungabio|

## Compte de test

| Champ | Valeur |
|---|---|
| Email | _à compléter_ |
| Mot de passe | _à compléter_ |

Route protégée : `/dashboard` (redirige vers `/login` si non connecté).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Auth.js, Vercel.

## Lancer le projet en local

```bash
git clone https://github.com/<proprietaire>/s22-groupe7-app.git
cd s22-groupe7-app
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev
```

Variables d'environnement (voir `.env.example`) : `AUTH_SECRET` (générer avec `npx auth secret`).

## Rendu

| Page | Stratégie | Justification |
|---|---|---|
| _à compléter_ | SSG | _pourquoi_ |
| _à compléter_ | ISR (revalidate : _x_ s) | _pourquoi_ |
| _à compléter_ | SSR | _pourquoi_ |

## Audit Lighthouse

Mobile : Performance _/100_, Accessibility _/100_ (objectif : 80 minimum).
Capture : `docs/lighthouse.png`

## Checklist de déploiement

- [ ] Dépôt importé dans Vercel
- [ ] Variables d'environnement configurées (`AUTH_SECRET`, …)
- [ ] Aucun secret dans le dépôt (`.env*` ignoré, `.env.example` sans valeurs)
- [ ] Build de production réussi
- [ ] Connexion / déconnexion testées en production
- [ ] URL de production stable reportée dans ce README

## Contribuer

- Architecture et règles de travail : voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Branches : `feature/...`, `fix/...`, `docs/...`, `chore/...`
- Commits : `feat:`, `fix:`, `docs:`, `chore:`
- Pas de push direct sur `main` : PR obligatoire avec 1 approbation
- Chaque PR référence son issue (`Closes #12`)
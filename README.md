

# Livrable-S22 | Groupe 7

Projet de groupe Akieni Academy, livrable S22 (02/11 au 06/11/2026) : application Next.js avec authentification Auth.js, déployée sur Vercel.

> Sujet de l'application : **EkoloEvent**

**EkoloEvent** est une plateforme web de publication et de billetterie d'événements au Congo Brazzaville. Elle met en relation des organisateurs, qui publient leurs événements, et des visiteurs, qui les découvrent et achètent leurs tickets en ligne.

### À qui elle s'adresse

- **Visiteurs** : ils parcourent les événements sans compte, avec des filtres par ville, catégorie et date, et une recherche par mot-clé.
- **Participants** : une fois connectés, ils choisissent un type de ticket (Standard, VIP...), une quantité, paient (paiement simulé) et retrouvent leurs tickets avec un QR code dans « Mes tickets ».
- **Organisateurs** : ils créent et gèrent leurs événements, définissent plusieurs types de tickets avec prix et quantité, suivent les ventes et les participants, et valident les tickets à l'entrée grâce au code.

### Fonctionnalités principales

1. Inscription et connexion, avec choix du rôle (visiteur ou organisateur).
2. Création, modification et suppression d'événements, avec plusieurs types de tickets.
3. Catalogue public : accueil, liste, fiche détaillée, catégories, filtres et recherche.
4. Achat de tickets avec contrôle du stock : on ne peut jamais vendre plus de places que prévu, même si deux personnes achètent en même temps.
5. Tickets avec QR code et contrôle à l'entrée : un ticket déjà utilisé est refusé.
6. Tableau de bord organisateur : ventes et liste des participants.

## 🔗 Production

URL : https://s22-groupe7-nextjs-app.vercel.app

## 👥 Équipe

| Membre                     | Rôle             | Compte Git       |
| -------------------------- | ---------------- | ---------------- |
| BITEMO Gilles Brant        | Auth, repo admin | https://github.com/thedev-it |
| NGASSAI NDONGO Dubien      | Feature          | https://github.com/dubien321 |
| INIENGO Alain Justin Ledit | Deploiment       | https://github.com/Ghostplayer89 |
| KONGOLO Salem              | absent           | absent           |
| MOUNGABIO Christ-Henoc     | Rendu & ref      | https://github.com/Christ-Moungabio |

## Comptes de test

### 1. Compte Organisateur (démonstration)
| Champ | Valeur |
|---|---|
| Rôle | `ORGANIZER` |
| Email | `organisateur@example.com` |
| Mot de passe | `Organizer123!` |

### 2. Compte Participant (démonstration)
| Champ | Valeur |
|---|---|
| Rôle | `ATTENDEE` |
| Email | `participant@example.com` |
| Mot de passe | `Participant123!` |

Route protégée : `/dashboard` (redirige automatiquement vers `/login` si non connecté).
Pages d'authentification : `/login` (connexion) et `/register` (inscription avec choix de rôle).

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

| Page | Stratégie | Pourquoi |
|---|---|---|
| `/` | SSG | Le contenu est le même pour tout le monde. Rien ne dépend de la requête, la page est générée au build. |
| `/evenements` et `/evenements/[id]` | ISR, revalidation toutes les 60 s | Les événements et les places restantes changent, mais pas à la seconde. On garde les données en cache 60 secondes au lieu d'interroger la base à chaque visite. |
| `/dashboard` | SSR | Le contenu dépend de l'utilisateur connecté, donc la page est calculée à chaque requête. |

Avec `cacheComponents` activé dans `next.config.ts`, `export const revalidate` n'existe plus. L'ISR se fait avec `'use cache'` et `cacheLife` sur les fonctions de lecture de `modules/events/queries.ts`. Les pages SSR lisent la session dans un `<Suspense>`.

Le résultat se vérifie avec `npm run build` : `/` sort en `○` (statique), `/evenements` et `/dashboard` en `◐` (coquille statique, contenu calculé ensuite).

## Audit Lighthouse

Mesuré sur mobile avec `npm run build` puis `npm start` (objectif : 80 minimum).

| Page | Performance | Accessibility |
|---|---|---|
| `/` | 85 | 100 |
| `/evenements` | 84 | 100 |
| `/evenements/[id]` | 99 | 100 |

Capture : `docs/lighthouse.png`

## Checklist de déploiement

- [✅] Dépôt importé dans Vercel
- [✅] Variables d'environnement configurées (`AUTH_SECRET`, …)
- [✅] Aucun secret dans le dépôt (`.env*` ignoré, `.env.example` sans valeurs)
- [✅] Build de production réussi
- [✅] Connexion / déconnexion testées en production
- [✅] URL de production stable reportée dans ce README

## Contribuer

- Architecture et règles de travail : voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Branches : `feature/...`, `fix/...`, `docs/...`, `chore/...`
- Commits : `feat:`, `fix:`, `docs:`, `chore:`
- Pas de push direct sur `main` : PR obligatoire avec 1 approbation
- Chaque PR référence son issue (`Closes #12`)
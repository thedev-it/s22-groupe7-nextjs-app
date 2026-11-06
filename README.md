# EkoloEvent | Groupe 7 - Livrable S22

Projet de groupe Akieni Academy, livrable S22 (02/11 au 06/11/2026) : application Next.js avec authentification Auth.js, déployée sur Vercel.

EkoloEvent est une plateforme web de publication et de billetterie d'événements au Congo Brazzaville. Elle met en relation des organisateurs, qui publient leurs événements, et des visiteurs, qui les découvrent et achètent leurs tickets en ligne.

## 🔗 Production
URL : https://ekoloevent-cg.vercel.app

## 👥 Équipe
| Membre | Rôle | Compte Git |
| :--- | :--- | :--- |
| BITEMO Gilles Brant | Auth, repo admin | https://github.com/thedev-it |
| NGASSAI NDONGO Dubien | Feature | https://github.com/dubien321 |
| INIENGO Alain Justin Ledit | Déploiement | https://github.com/Ghostplayer89 |
| KONGOLO Salem | Feature | ABSENT | @pseudo |
| MOUNGABIO Christ-Henoc | Rendu & perf | https://github.com/Christ-Moungabio |

## Comptes de test
**Organisateur :** `organisateur@example.com` / `Organizer123!`
**Participant :** `participant@example.com` / `Participant123!`

Route protégée : `/dashboard` (redirige vers `/login` si non connecté).

## Rendu
| Page | Stratégie | Justification |
| :--- | :--- | :--- |
| Accueil (`/`) | **SSG** | Page vitrine publique qui ne change pas souvent. Générée au build pour être ultra-rapide et optimiser le SEO. |
| Catalogue (`/evenements`) | **ISR** (revalidate : 60s) | La liste des événements change régulièrement. L'ISR permet d'avoir une page statique ultra-rapide tout en mettant à jour les données en arrière-plan toutes les 60 secondes. |
| Fiche Événement (`/evenements/[id]`) | **ISR** (revalidate : 60s) | Permet d'afficher les détails et le stock de tickets de manière quasi-instantanée, tout en rafraîchissant les places restantes. |
| Mes tickets (`/mes-tickets`) | **SSR** | Page privée. Le rendu doit se faire côté serveur à chaque requête pour vérifier la session de l'utilisateur (via cookie) et afficher uniquement ses propres tickets. |

## Audit Lighthouse
Mobile : Performance 92/100, Accessibility 100/100 (objectif : 80 minimum). Capture : `docs/lighthouse.png`

## Checklist de déploiement
- [x] Dépôt importé dans Vercel
- [x] Variables d'environnement configurées (`AUTH_SECRET`, `DATABASE_URL`, `DIRECT_URL`)
- [x] Aucun secret dans le dépôt (`.env*` ignoré)
- [x] Build de production réussi
- [x] Connexion / déconnexion testées en production
- [x] URL de production stable reportée dans ce README
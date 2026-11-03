# Architecture du projet

Ce document décrit comment le code est organisé. Chaque membre travaille dans son propre dossier pour limiter les conflits Git.

## Principe

- `app/` contient uniquement le **routage** (pages, layouts, routes API). La logique métier est dans `modules/`.
- `modules/` contient **un dossier par fonctionnalité**.
- `shared/` et `core/` contiennent ce qui est commun à plusieurs modules.

> `modules/`, `shared/` et `core/` sont des **choix d'équipe**, pas des conventions imposées par Next.js. Next.js ne réglemente que les noms de fichiers spéciaux (`page`, `layout`, `route`, `proxy`...) et les groupes de routes `(nom)`.

## Arborescence

```
app/
├── (public)/        accueil, événements, catégories, à propos
├── (auth)/          connexion et inscription
├── (account)/       mes tickets (visiteur connecté)
├── (organizer)/     dashboard organisateur
└── api/auth/        route Auth.js

modules/
├── auth/            authentification, session, rôles
├── events/          événements, catégories, filtres, recherche
├── ticket-types/    types de tickets (nom, prix, quantité)
├── orders/          achat, paiement simulé, commandes
├── tickets/         tickets, QR code, contrôle à l'entrée
└── organizer/       statistiques et participants

shared/              composants UI et utilitaires communs
core/                client base de données, variables d'environnement
prisma/              schéma et seed (ajouté par la PR base de données)
types/               déclarations de types globales
docs/                documentation, captures Lighthouse
```

Les fichiers `auth.ts`, `auth.config.ts` et `proxy.ts` seront à la racine du projet (ajoutés par la PR Auth).

## Responsables

| Dossier | Issues | Responsable |
|---|---|---|
| `core/`, `prisma/`, `modules/auth/`, `app/(auth)/`, `app/api/auth/` | 1 à 10 | BITEMO Gilles |
| `modules/events/`, `modules/ticket-types/`, `modules/organizer/`, `app/(organizer)/` | 11 à 17, 20 à 26, 29 à 31 | À nommer |
| `modules/orders/`, `modules/tickets/`, `app/(account)/`, `shared/` | 18, 19, 27, 28, 32 à 36 | À nommer |
| `docs/` et réglages de rendu | 37 à 40 | NGASSAI Dubien, INIENGO Alain |

## Règles

1. `app/` ne contient que des routes et des layouts. Les pages appellent les modules.
2. Chacun travaille dans le dossier de son module. Pour modifier le dossier d'un autre, le prévenir et faire une petite PR.
3. Dépendances : `events`, `ticket-types`, `orders`, `tickets` peuvent utiliser `auth`, `core` et `shared`. `organizer` peut aussi utiliser `events` et `orders`. `auth` ne dépend d'aucun autre module.
4. Les fichiers qui accèdent à la base de données ne sont jamais importés dans un composant client.
5. Toute Server Action vérifie la session et le rôle côté serveur, et valide ses entrées.
6. Prix, quantités et rôle ne sont jamais pris tels quels dans un formulaire : le serveur les recalcule.
7. `prisma/schema.prisma` et `package.json` : modifiés par de petites PR dédiées, fusionnées rapidement.
8. L'organisation interne d'un module est laissée à son responsable. Convention conseillée : `components/`, `actions.ts` (écritures), `queries.ts` (lectures).
9. Un fichier `actions.ts` marqué `"use server"` n'exporte que des fonctions asynchrones. Les types, constantes et schémas vont dans un autre fichier.

## Workflow Git

1. `git checkout main && git pull`
2. Créer une branche depuis `main` : `feature/...`, `fix/...`, `docs/...`
3. Commits : `feat:`, `fix:`, `docs:`, `chore:`
4. PR avec `Closes #N`, relue par un autre membre, puis fusion
5. Pas de push direct sur `main`
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Instructions du projet

Ne rien écrire entre les marqueurs BEGIN/END ci-dessus : ce bloc est régénéré par `next dev`.

## Projet

Plateforme web de publication et de billetterie d'événements pour Brazzaville et Pointe-Noire.
- Les **organisateurs** créent des événements avec plusieurs types de tickets (nom, prix, quantité).
- Les **visiteurs** consultent les événements sans compte. Connectés, ils achètent des tickets et les retrouvent dans « Mes tickets », avec un QR code.
- Contexte : livrable de formation Akieni Academy (S22, groupe 7), à rendre vendredi 06/11/2026.
- Paiement **simulé** : aucun paiement réel n'est intégré.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Auth.js (`next-auth@beta`, provider Credentials, session JWT), Prisma, Supabase (PostgreSQL), Vercel.
Auth.js, Prisma et Supabase sont décidés mais peuvent ne pas être encore installés : vérifier `package.json` avant de les utiliser.

## Langue

- Réponses et commentaires adressés à l'équipe : en français.
- Code (variables, fonctions, composants, fichiers) : en anglais.
- Textes affichés à l'utilisateur : en français.
- URL : en français (`/evenements`, `/mes-tickets`).

## Architecture

Lire `docs/ARCHITECTURE.md` avant de créer des fichiers.
- `app/` : routage uniquement (pages, layouts, routes API), avec les groupes `(public)`, `(auth)`, `(account)`, `(organizer)`.
- `modules/` : un dossier par fonctionnalité (`auth`, `events`, `ticket-types`, `orders`, `tickets`, `organizer`).
- `shared/` : composants UI et utilitaires communs. `core/` : base de données et variables d'environnement. `prisma/` : schéma et seed.
- Chaque membre travaille dans le dossier de son module. Ne pas modifier le dossier d'un autre module sans le dire à l'utilisateur.
- Dépendances : `events`, `ticket-types`, `orders`, `tickets` peuvent utiliser `auth`, `core` et `shared`. `auth` ne dépend d'aucun autre module.
- Convention conseillée dans un module : `components/`, `actions.ts` (écritures), `queries.ts` (lectures).
- `modules/`, `shared/` et `core/` sont des choix d'équipe, pas des conventions Next.js.

## Commandes

```bash
npm run dev      # serveur de développement
npm run lint     # lint
npm run build    # build de production
```
Lancer `npm run lint` et `npm run build` avant de proposer un commit.

## Règles de code

1. **Server Actions** : toute action vérifie la session et le rôle côté serveur, et valide ses entrées. Un fichier `"use server"` n'exporte que des fonctions asynchrones (types, constantes et schémas ailleurs).
2. **Le proxy ne suffit pas** : ne jamais se reposer uniquement sur le proxy pour protéger une donnée. Vérifier la session au plus près de l'accès aux données.
3. **Le serveur décide** : prix, quantités, rôle et propriétaire d'un événement ne sont jamais lus tels quels dans un formulaire. Les recalculer côté serveur.
4. **Accès base de données** : jamais depuis un composant client.
5. **Rôles** : `ATTENDEE`, `ORGANIZER`, `ADMIN`. Le formulaire d'inscription n'accepte que `ATTENDEE` ou `ORGANIZER`. Le rôle `ADMIN` ne doit jamais être attribuable depuis l'extérieur.
6. **Pas de nouvelle dépendance sans nécessité** : une dépendance ajoutée = petite PR dédiée.
7. **Accessibilité et performance** : objectif Lighthouse mobile d'au moins 80 en Performance et Accessibility. Utiliser `next/image`, des libellés de formulaire, des contrastes suffisants.

## Données

- Modèle : `User`, `Category`, `Event`, `TicketType`, `Order`, `Ticket`.
- Prix en **entiers FCFA** (0 = gratuit), pas de décimales.
- Le stock est porté par `TicketType` (`quantity`, `sold`). L'achat est une **transaction atomique** : mise à jour conditionnelle du stock, création de la commande et des tickets. Jamais de vente au-delà du stock.
- `Ticket.code` est un UUID, utilisé pour le QR code et le contrôle à l'entrée. Un ticket déjà utilisé est refusé.
- `Ticket.pricePaid` copie le prix au moment de l'achat.
- Un événement avec des tickets vendus ne peut pas être supprimé.
- Variables : `DATABASE_URL` (pooler en mode transaction, utilisation courante) et `DIRECT_URL` (pooler en mode session, migrations), plus `AUTH_SECRET`.

## Stratégies de rendu (à vérifier au moment de coder)

| Page | Stratégie visée |
|---|---|
| `/a-propos`, `/categories` | SSG |
| `/` et fiche `/evenements/[id]` | ISR |
| `/evenements` (avec filtres) | ISR ou SSR selon l'usage des paramètres d'URL |
| `/mes-tickets`, `/dashboard` | SSR (dépend de la session) |

Justifier chaque choix dans la section « Rendu » du README. Les places restantes changent à chaque achat : ne pas les figer dans une page statique.

## Sécurité

- Ne jamais écrire de secret, mot de passe ou chaîne de connexion dans le code, les commits, les issues ou le README.
- Ne jamais commiter de fichier `.env*` (sauf `.env.example`, sans valeurs).
- Ne jamais exposer une clé secrète dans une variable `NEXT_PUBLIC_*`.
- La sécurité au niveau des lignes (RLS) doit être activée sur les tables Supabase.

## Workflow Git

- `main` est protégée : pas de push direct, PR obligatoire avec 1 approbation.
- Partir de `main` à jour : `git checkout main && git pull`, puis une branche `feature/...`, `fix/...`, `docs/...` ou `chore/...`.
- Commits : `feat:`, `fix:`, `docs:`, `chore:`.
- Une PR par issue, avec `Closes #N`, en suivant le template de PR.
- Les issues utilisent le milestone `S22` et les labels de statut `à-faire`, `en-cours`, `en-review`.
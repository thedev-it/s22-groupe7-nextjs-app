@AGENTS.md

## Consignes pour Claude Code

### Avant de coder
- Lire l'issue concernée, puis `docs/ARCHITECTURE.md`, et consulter la documentation locale de Next.js dans `node_modules/next/dist/docs/` pour tout point de routage, de rendu ou de cache.
- Pour une tâche de plus de quelques lignes, **exposer le plan** (fichiers à créer ou modifier, ordre des étapes) et attendre l'accord du développeur avant d'agir.
- Demander confirmation avant de modifier un fichier partagé : `prisma/schema.prisma`, `package.json`, `proxy.ts`, `auth.ts`, `auth.config.ts`, `shared/`, `core/`.

### Pendant le travail
- Rester dans le module du développeur. Si un changement touche un autre module, le signaler au lieu de le faire.
- Ne pas inventer d'API Next.js, Auth.js ou Prisma : vérifier la version installée et la documentation locale en cas de doute.
- Ne pas installer de paquet sans le dire et sans que le développeur valide.
- Écrire des changements petits et relisibles : une issue, une PR.

### Avant de livrer
- Lancer `npm run lint` et `npm run build`, et indiquer le résultat réel, même en cas d'échec.
- Ne jamais pousser sur `main`, ne jamais forcer un push, ne jamais commiter sans demande explicite du développeur.
- Rappeler d'ouvrir la PR avec `Closes #N` et de demander une relecture à un autre membre.

### Ton et pédagogie
- Le projet est aussi un exercice de formation : expliquer brièvement le « pourquoi » des choix importants, sans noyer le développeur sous le code.
- En cas de doute ou de consigne ambiguë, poser une question plutôt que deviner.

### Préférences personnelles
Chaque développeur peut créer un fichier `CLAUDE.local.md` pour ses préférences perso. Il ne doit pas être commité.
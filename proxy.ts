import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  /*
   * Le proxy ne s'exécute que sur les routes qui nécessitent une vérification
   * de session. Les routes publiques (/evenements, /, /a-propos…) ne sont PAS
   * incluses : le proxy n'est pas invoqué et aucun JWT n'est décodé pour elles.
   *
   * Protégées :
   *  - /dashboard et sous-routes
   *  - /mes-tickets et sous-routes
   *  - /organizer et sous-routes
   *  - /evenements/nouveau
   *  - /evenements/[id]/modifier
   *  - /evenements/[id]/valider
   *
   * Pages d'auth (redirection si déjà connecté) :
   *  - /login, /register, /connexion, /inscription
   */
  matcher: [
    "/dashboard/:path*",
    "/mes-tickets/:path*",
    "/organizer/:path*",
    "/evenements/nouveau",
    "/evenements/:id/modifier",
    "/evenements/:id/valider",
    "/login",
    "/register",
    "/connexion",
    "/inscription",
  ],
};

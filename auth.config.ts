import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/app/generated/prisma/enums";

/** Préfixes des routes réservées aux utilisateurs connectés */
const PRIVATE_PREFIXES = [
  "/dashboard",
  "/mes-tickets",
  "/organizer",
];

/** Routes de gestion d'événements réservées aux organisateurs connectés */
const ORGANIZER_ONLY_PATTERNS = [
  /^\/evenements\/nouveau$/,
  /^\/evenements\/[^/]+\/modifier$/,
  /^\/evenements\/[^/]+\/valider$/,
];

/** Préfixes des pages d'authentification */
const AUTH_PREFIXES = ["/login", "/register", "/connexion", "/inscription"];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const isOnAuthRoute = AUTH_PREFIXES.some((p) => pathname.startsWith(p));
      const isOnPrivatePrefix = PRIVATE_PREFIXES.some((p) =>
        pathname.startsWith(p)
      );
      const isOnOrganizerOnlyRoute = ORGANIZER_ONLY_PATTERNS.some((re) =>
        re.test(pathname)
      );
      const isPrivate = isOnPrivatePrefix || isOnOrganizerOnlyRoute;

      // Redirige les utilisateurs déjà connectés hors des pages d'auth
      if (isOnAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Protection des routes privées : non connecté → /login
      if (isPrivate && !isLoggedIn) {
        return false; // Auth.js redirige automatiquement vers pages.signIn
      }

      // Rôle vérifié dans le JWT : un participant ne gère pas d'événement
      if (isOnOrganizerOnlyRoute && auth?.user?.role !== "ORGANIZER") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as Role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.id as string) ?? token.sub;
        session.user.role = (token.role as Role) ?? "ATTENDEE";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

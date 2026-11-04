import type { NextAuthConfig } from "next-auth";
import type { Role } from "@/app/generated/prisma/enums";

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
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnOrganizer = nextUrl.pathname.startsWith("/organizer");
      const isOnAccount = nextUrl.pathname.startsWith("/mes-tickets");
      const isOnAuthRoute =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register") ||
        nextUrl.pathname.startsWith("/connexion") ||
        nextUrl.pathname.startsWith("/inscription");

      // Redirige les utilisateurs connectés hors des pages d'authentification
      if (isOnAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Protection des routes privées
      if (isOnDashboard || isOnOrganizer || isOnAccount) {
        if (isLoggedIn) return true;
        return false; // Redirige automatiquement vers signIn ("/login")
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

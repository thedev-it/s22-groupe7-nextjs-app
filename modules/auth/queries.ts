import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Role } from "@/app/generated/prisma/enums";
import type { CurrentUser } from "./types";

/**
 * Récupère la session actuelle de l'utilisateur côté serveur.
 */
export async function getCurrentSession() {
  return await auth();
}

/**
 * Récupère l'utilisateur connecté ou null s'il n'est pas authentifié.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: (session.user.role as Role) ?? "ATTENDEE",
  };
}

/**
 * Exige une authentification active. Redirige vers la page de connexion si non connecté.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Exige un rôle particulier (ex: ORGANIZER). Redirige vers /dashboard ou /login si non autorisé.
 */
export async function requireRole(allowedRoles: Role[]): Promise<CurrentUser> {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }
  return user;
}

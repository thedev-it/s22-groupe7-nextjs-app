import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import type { Role } from "@/app/generated/prisma/enums";
import type { AuthzResult, CurrentUser } from "./types";

export const FORBIDDEN_ERROR =
  "Accès refusé : vous n'avez pas les droits nécessaires pour effectuer cette action.";

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
 * Exige un rôle particulier dans une page (Server Component).
 * Redirige vers /login si non connecté, puis vers /dashboard si le rôle ne correspond pas.
 */
export async function requirePageRole(
  allowedRoles: Role | Role[]
): Promise<CurrentUser> {
  const user = await requireUser();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!roles.includes(user.role)) {
    redirect("/dashboard");
  }
  return user;
}

/**
 * Vérifie le rôle de l'utilisateur pour une Server Action.
 * Ne redirige pas : renvoie un résultat 403 que l'action peut retourner au client.
 *
 * @example
 * const session = await getCurrentSession();
 * const authz = requireRole(session, "ORGANIZER");
 * if (!authz.ok) return { success: false, status: authz.status, error: authz.error };
 */
export function requireRole(
  session: Session | null | undefined,
  allowedRoles: Role | Role[]
): AuthzResult {
  if (!session?.user?.id) {
    return { ok: false, status: 403, error: FORBIDDEN_ERROR };
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const role = session.user.role as Role | undefined;

  if (!role || !roles.includes(role)) {
    return { ok: false, status: 403, error: FORBIDDEN_ERROR };
  }

  return {
    ok: true,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role,
    },
  };
}

/**
 * Vérifie que l'utilisateur a le rôle requis ET qu'il est propriétaire de la ressource.
 * À utiliser dans les actions de modification et de suppression.
 *
 * @example
 * const authz = requireOwnership(session, event.organizerId);
 * if (!authz.ok) return { success: false, status: authz.status, error: authz.error };
 */
export function requireOwnership(
  session: Session | null | undefined,
  ownerId: string,
  allowedRoles: Role | Role[] = "ORGANIZER"
): AuthzResult {
  const authz = requireRole(session, allowedRoles);
  if (!authz.ok) {
    return authz;
  }

  if (authz.user.id !== ownerId) {
    return {
      ok: false,
      status: 403,
      error:
        "Accès refusé : vous ne pouvez modifier ou supprimer que vos propres ressources.",
    };
  }

  return authz;
}

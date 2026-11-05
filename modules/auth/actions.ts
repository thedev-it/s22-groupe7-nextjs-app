"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/core/db/prisma";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import type { AuthActionResult } from "./types";
import { validateLoginInput, validateRegisterInput } from "./validation";

/**
 * Server Action pour l'inscription d'un nouvel utilisateur.
 * Valide les entrées, hash le mot de passe avec bcryptjs et force le rôle (ATTENDEE ou ORGANIZER).
 */
export async function registerUserAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    role: String(formData.get("role") ?? "") as "ATTENDEE" | "ORGANIZER",
  };

  const validation = validateRegisterInput(rawData);
  if (!validation.isValid || !validation.data) {
    return {
      success: false,
      error: "Veuillez corriger les erreurs dans le formulaire.",
      fieldErrors: validation.errors,
    };
  }

  const { name, email, password, role } = validation.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Un compte avec cette adresse email existe déjà.",
        fieldErrors: {
          email: "Cette adresse email est déjà utilisée.",
        },
      };
    }

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la création de votre compte.",
    };
  }

  // Connexion automatique après inscription réussie
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: role === "ORGANIZER" ? "/dashboard" : "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?registered=1");
    }
    // Permet à la redirection interne de Next.js de s'exécuter
    throw error;
  }

  return { success: true };
}

/**
 * Server Action pour la connexion d'un utilisateur existant.
 */
export async function loginUserAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "");

  const validation = validateLoginInput({ email, password });
  if (!validation.isValid || !validation.data) {
    return {
      success: false,
      error: "Veuillez renseigner un email valide et votre mot de passe.",
      fieldErrors: validation.errors,
    };
  }

  try {
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirectTo: callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Adresse email ou mot de passe incorrect.",
          };
        default:
          return {
            success: false,
            error: "Échec de connexion. Veuillez vérifier vos identifiants.",
          };
      }
    }
    // Re-throw redirect error pour que Next.js effectue la redirection
    throw error;
  }

  return { success: true };
}

/**
 * Server Action pour la déconnexion de l'utilisateur.
 */
export async function logoutUserAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}

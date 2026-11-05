import type { RegisterInput, LoginInput, AuthActionResult } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterInput(input: Partial<RegisterInput>): {
  isValid: boolean;
  errors: NonNullable<AuthActionResult["fieldErrors"]>;
  data?: RegisterInput;
} {
  const errors: NonNullable<AuthActionResult["fieldErrors"]> = {};

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim().toLowerCase() ?? "";
  const password = input.password ?? "";
  const confirmPassword = input.confirmPassword ?? "";
  const role = input.role;

  if (!name || name.length < 2) {
    errors.name = "Le nom doit comporter au moins 2 caractères.";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Veuillez renseigner une adresse email valide.";
  }

  if (!password || password.length < 6) {
    errors.password = "Le mot de passe doit comporter au moins 6 caractères.";
  }

  if (confirmPassword && confirmPassword !== password) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas.";
  }

  if (!role || (role !== "ATTENDEE" && role !== "ORGANIZER")) {
    errors.role = "Veuillez choisir un rôle valide (Participant ou Organisateur).";
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      name,
      email,
      password,
      confirmPassword,
      role: role as "ATTENDEE" | "ORGANIZER",
    },
  };
}

export function validateLoginInput(input: Partial<LoginInput>): {
  isValid: boolean;
  errors: { email?: string; password?: string };
  data?: LoginInput;
} {
  const errors: { email?: string; password?: string } = {};
  const email = input.email?.trim().toLowerCase() ?? "";
  const password = input.password ?? "";

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Veuillez renseigner une adresse email valide.";
  }

  if (!password) {
    errors.password = "Veuillez renseigner votre mot de passe.";
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: { email, password },
  };
}

import type { Role } from "@/app/generated/prisma/enums";

export type AllowedRegisterRole = "ATTENDEE" | "ORGANIZER";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: AllowedRegisterRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
  };
}

export interface CurrentUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: Role;
}

export interface AuthzSuccess {
  ok: true;
  user: CurrentUser;
}

export interface AuthzFailure {
  ok: false;
  status: 403;
  error: string;
}

export type AuthzResult = AuthzSuccess | AuthzFailure;

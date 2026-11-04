"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerUserAction } from "../actions";
import type { AuthActionResult, AllowedRegisterRole } from "../types";

export function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState<AllowedRegisterRole>("ATTENDEE");

  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    registerUserAction,
    null
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            Rejoignez la billetterie événementielle de Brazzaville et Pointe-Noire
          </p>
        </div>

        {state?.error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-3"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5" noValidate>
          {/* Sélection du rôle */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Je souhaite m&apos;inscrire en tant que <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                htmlFor="role-attendee"
                className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedRole === "ATTENDEE"
                    ? "border-primary bg-primary-light/30 shadow-xs"
                    : "border-border bg-surface hover:bg-surface-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-text-primary flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    Participant
                  </span>
                  <input
                    type="radio"
                    id="role-attendee"
                    name="role"
                    value="ATTENDEE"
                    checked={selectedRole === "ATTENDEE"}
                    onChange={() => setSelectedRole("ATTENDEE")}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Découvrez les événements, achetez vos billets et accédez à vos QR codes.
                </p>
              </label>

              <label
                htmlFor="role-organizer"
                className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedRole === "ORGANIZER"
                    ? "border-primary bg-primary-light/30 shadow-xs"
                    : "border-border bg-surface hover:bg-surface-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-text-primary flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Organisateur
                  </span>
                  <input
                    type="radio"
                    id="role-organizer"
                    name="role"
                    value="ORGANIZER"
                    checked={selectedRole === "ORGANIZER"}
                    onChange={() => setSelectedRole("ORGANIZER")}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Créez des événements, fixez vos prix, suivez vos ventes et validez les entrées.
                </p>
              </label>
            </div>
            {state?.fieldErrors?.role && (
              <p className="text-danger text-xs mt-1.5">{state.fieldErrors.role}</p>
            )}
          </div>

          {/* Nom complet */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              {selectedRole === "ORGANIZER" ? "Nom de l'organisateur ou organisation" : "Nom complet"}{" "}
              <span className="text-danger">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={
                selectedRole === "ORGANIZER"
                  ? "Ex: Congo Events Prod"
                  : "Ex: Jean-Luc Moukoko"
              }
              className={`w-full h-11 px-4 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                state?.fieldErrors?.name
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }`}
            />
            {state?.fieldErrors?.name && (
              <p className="text-danger text-xs mt-1.5">{state.fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Adresse email <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nom@example.com"
              className={`w-full h-11 px-4 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                state?.fieldErrors?.email
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }`}
            />
            {state?.fieldErrors?.email && (
              <p className="text-danger text-xs mt-1.5">{state.fieldErrors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Mot de passe <span className="text-danger">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Au moins 6 caractères"
              className={`w-full h-11 px-4 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                state?.fieldErrors?.password
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }`}
            />
            {state?.fieldErrors?.password && (
              <p className="text-danger text-xs mt-1.5">{state.fieldErrors.password}</p>
            )}
          </div>

          {/* Confirmation du mot de passe */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Confirmer le mot de passe <span className="text-danger">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Répétez votre mot de passe"
              className={`w-full h-11 px-4 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                state?.fieldErrors?.confirmPassword
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }`}
            />
            {state?.fieldErrors?.confirmPassword && (
              <p className="text-danger text-xs mt-1.5">
                {state.fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-4"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Création du compte...</span>
              </>
            ) : (
              "Créer mon compte"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            Déjà inscrit ?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-hover underline-offset-4 hover:underline transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

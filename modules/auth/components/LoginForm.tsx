"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginUserAction } from "../actions";
import type { AuthActionResult } from "../types";

export function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    loginUserAction,
    null
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Connexion
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            Accédez à vos billets ou gérez vos événements
          </p>
        </div>

        {registered && (
          <div
            role="status"
            className="mb-6 p-4 rounded-lg bg-success/10 border border-success/20 text-success text-sm flex items-start gap-3"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-semibold">Compte créé avec succès !</p>
              <p className="text-xs mt-0.5">
                Vous pouvez maintenant vous connecter avec vos identifiants.
              </p>
            </div>
          </div>
        )}

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
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

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
              <p className="text-danger text-xs mt-1.5">
                {state.fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary"
              >
                Mot de passe <span className="text-danger">*</span>
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={`w-full h-11 px-4 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                state?.fieldErrors?.password
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }`}
            />
            {state?.fieldErrors?.password && (
              <p className="text-danger text-xs mt-1.5">
                {state.fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-2"
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
                <span>Connexion en cours...</span>
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary-hover underline-offset-4 hover:underline transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

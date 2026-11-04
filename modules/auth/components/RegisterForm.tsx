"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerUserAction } from "../actions";
import type { AuthActionResult, AllowedRegisterRole } from "../types";

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<AllowedRegisterRole>("ATTENDEE");

  // Champs du formulaire pour conserver les valeurs entre les étapes
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    registerUserAction,
    null
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-7 transition-all">
        {/* Stepper indicateur de progression */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Étape {step} sur 2
            </span>
            <span className="text-xs text-text-secondary">
              {step === 1 ? "Choix du type de compte" : "Vos coordonnées"}
            </span>
          </div>

          <div className="w-full bg-surface-secondary h-1.5 rounded-full overflow-hidden flex">
            <div
              className={`h-full bg-primary transition-all duration-300 ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            />
          </div>
        </div>

        {/* Message d'erreur global */}
        {state?.error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2.5"
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
            <span className="leading-tight">{state.error}</span>
          </div>
        )}

        {/* ÉTAPE 1 : Choix du type de compte */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Qui est vous ?
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Choisissez votre profil pour une expérience adaptée
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {/* Option Participant */}
              <button
                type="button"
                onClick={() => setSelectedRole("ATTENDEE")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  selectedRole === "ATTENDEE"
                    ? "border-primary bg-primary-light/25 shadow-xs ring-1 ring-primary/20"
                    : "border-border bg-surface hover:bg-surface-secondary/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    selectedRole === "ATTENDEE"
                      ? "bg-primary text-white"
                      : "bg-surface-secondary text-text-secondary"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-text-primary">
                      Participant
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedRole === "ATTENDEE"
                          ? "border-primary bg-primary text-white"
                          : "border-border"
                      }`}
                    >
                      {selectedRole === "ATTENDEE" && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Découvrir les événements de Brazzaville et Pointe-Noire, acheter des tickets et retrouver vos QR codes dans « Mes tickets ».
                  </p>
                </div>
              </button>

              {/* Option Organisateur */}
              <button
                type="button"
                onClick={() => setSelectedRole("ORGANIZER")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  selectedRole === "ORGANIZER"
                    ? "border-primary bg-primary-light/25 shadow-xs ring-1 ring-primary/20"
                    : "border-border bg-surface hover:bg-surface-secondary/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    selectedRole === "ORGANIZER"
                      ? "bg-primary text-white"
                      : "bg-surface-secondary text-text-secondary"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
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
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-text-primary">
                      Organisateur
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedRole === "ORGANIZER"
                          ? "border-primary bg-primary text-white"
                          : "border-border"
                      }`}
                    >
                      {selectedRole === "ORGANIZER" && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Publier vos événements, configurer plusieurs types de billets, suivre vos ventes en temps réel et valider les accès.
                  </p>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full h-11 sm:h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Continuer avec ce profil</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : Formulaire des informations du compte */}
        {step === 2 && (
          <div>
            {/* Barre de contexte du rôle avec bouton retour */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Changer de profil</span>
              </button>

              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-primary-light text-primary">
                Profil : {selectedRole === "ORGANIZER" ? "Organisateur" : "Participant"}
              </span>
            </div>

            <div className="mb-5">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Vos informations
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Renseignez vos identifiants pour finaliser votre inscription
              </p>
            </div>

            <form action={formAction} className="space-y-4" noValidate>
              {/* Rôle sélectionné envoyé en champ masqué */}
              <input type="hidden" name="role" value={selectedRole} />

              {/* Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-text-primary mb-1"
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    selectedRole === "ORGANIZER"
                      ? "Ex: Congo Events Prod"
                      : "Ex: Jean-Luc Moukoko"
                  }
                  className={`w-full h-10 sm:h-11 px-3.5 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    state?.fieldErrors?.name
                      ? "border-danger focus:border-danger"
                      : "border-border focus:border-primary"
                  }`}
                />
                {state?.fieldErrors?.name && (
                  <p className="text-danger text-xs mt-1">{state.fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-text-primary mb-1"
                >
                  Adresse email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@example.com"
                  className={`w-full h-10 sm:h-11 px-3.5 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    state?.fieldErrors?.email
                      ? "border-danger focus:border-danger"
                      : "border-border focus:border-primary"
                  }`}
                />
                {state?.fieldErrors?.email && (
                  <p className="text-danger text-xs mt-1">{state.fieldErrors.email}</p>
                )}
              </div>

              {/* Mot de passe & Confirmation côte à côte sur écran suffisant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-medium text-text-primary mb-1"
                  >
                    Mot de passe <span className="text-danger">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 caractères"
                    className={`w-full h-10 sm:h-11 px-3.5 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      state?.fieldErrors?.password
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {state?.fieldErrors?.password && (
                    <p className="text-danger text-xs mt-1">
                      {state.fieldErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs sm:text-sm font-medium text-text-primary mb-1"
                  >
                    Confirmer <span className="text-danger">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Répétez le mot de passe"
                    className={`w-full h-10 sm:h-11 px-3.5 bg-surface border rounded-lg text-text-primary text-sm placeholder:text-text-disabled transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      state?.fieldErrors?.confirmPassword
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {state?.fieldErrors?.confirmPassword && (
                    <p className="text-danger text-xs mt-1">
                      {state.fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isPending}
                  className="h-11 px-4 border border-border hover:bg-surface-secondary text-text-secondary rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
                >
                  Retour
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-11 sm:h-12 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-xs cursor-pointer"
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
                      <span>Création en cours...</span>
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer avec lien vers la connexion */}
        <div className="mt-6 pt-5 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-text-secondary">
            Vous avez déjà un compte ?{" "}
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

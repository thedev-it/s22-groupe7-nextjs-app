import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Connexion | Event Congo",
  description: "Connectez-vous à votre compte Event Congo pour gérer vos billets ou vos événements.",
};

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="w-full max-w-md mx-auto p-8 bg-surface rounded-xl border border-border shadow-card animate-pulse text-center text-text-secondary text-sm">
            Chargement du formulaire de connexion...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}

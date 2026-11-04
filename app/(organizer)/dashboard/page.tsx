import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/modules/auth/queries";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";

export const metadata: Metadata = {
  title: "Tableau de bord | Event Congo",
  description: "Espace personnel et tableau de bord sécurisé.",
};

async function DashboardContent() {
  const user = await requireUser();
  const isOrganizer = user.role === "ORGANIZER";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* En-tête du tableau de bord */}
      <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Bonjour, {user.name ?? "Utilisateur"} !
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isOrganizer
                    ? "bg-primary-light text-primary"
                    : "bg-surface-secondary text-text-secondary"
                }`}
              >
                {isOrganizer ? "Organisateur" : "Participant"}
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-1">
              Connecté avec l&apos;adresse{" "}
              <span className="font-medium text-text-primary">{user.email}</span>
            </p>
          </div>

          <div>
            <LogoutButton className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-colors" />
          </div>
        </div>
      </div>

      {/* Cartes d'actions selon le rôle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isOrganizer ? (
          <>
            <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <h2 className="text-lg font-bold text-text-primary mb-2">
                Publier un événement
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                Créez un nouvel événement, définissez les types de tickets, fixez vos prix et gérez vos quotas.
              </p>
              <Link
                href="/evenements/nouveau"
                className="inline-flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                Créer un événement
              </Link>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <h2 className="text-lg font-bold text-text-primary mb-2">
                Suivi des ventes
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                Consultez le nombre de places vendues, les revenus générés et la liste des participants inscrits.
              </p>
              <span className="text-xs text-text-disabled">Module organisateur bientôt disponible</span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <h2 className="text-lg font-bold text-text-primary mb-2">
                Mes billets
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                Retrouvez vos réservations et vos QR codes pour accéder aux événements à Brazzaville et Pointe-Noire.
              </p>
              <Link
                href="/mes-tickets"
                className="inline-flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
              >
                Voir mes billets
              </Link>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <h2 className="text-lg font-bold text-text-primary mb-2">
                Découvrir des événements
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                Explorez les concerts, festivals, formations et conférences disponibles en ce moment.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center h-10 px-4 border border-border hover:bg-surface-secondary text-text-primary text-sm font-medium rounded-lg transition-colors"
              >
                Parcourir les événements
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
          <div className="h-32 bg-surface rounded-xl border border-border mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-44 bg-surface rounded-xl border border-border" />
            <div className="h-44 bg-surface rounded-xl border border-border" />
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

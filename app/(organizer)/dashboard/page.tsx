import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/modules/auth/queries";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";
import { prisma } from "@/core/db/prisma";

export const metadata: Metadata = {
  title: "Tableau de bord | Event Congo",
  description: "Espace personnel et tableau de bord sécurisé.",
};

async function DashboardContent() {
  const user = await requireUser();
  const isOrganizer = user.role === "ORGANIZER";

  const mesEvenements = isOrganizer 
    ? await prisma.event.findMany({
        where: { organizerId: user.id },
        include: { 
          ticketTypes: true,
          _count: { select: { orders: true } } 
        },
        orderBy: { startsAt: "desc" },
      })
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          <span className="mr-2">←</span> Retour à l'accueil
        </Link>
      </div>

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
              Connecté avec l'adresse{" "}
              <span className="font-medium text-text-primary">{user.email}</span>
            </p>
          </div>

          <div>
            <LogoutButton className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-colors" />
          </div>
        </div>
      </div>

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

            <div className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow md:col-span-2">
              <h2 className="text-lg font-bold text-text-primary mb-4">
                Mes événements
              </h2>
              
              {mesEvenements.length === 0 ? (
                <p className="text-sm text-text-secondary mb-4">
                  Vous n'avez pas encore créé d'événement.
                </p>
              ) : (
                <div className="space-y-4">
                  {mesEvenements.map((event) => {
                    const totalPlaces = event.ticketTypes.reduce((sum, t) => sum + t.quantity, 0);
                    const placesVendues = event.ticketTypes.reduce((sum, t) => sum + t.sold, 0);
                    
                    return (
                      <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg bg-surface-secondary">
                        <div>
                          <p className="font-semibold text-text-primary">{event.title}</p>
                          <p className="text-sm text-text-secondary">
                            {new Date(event.startsAt).toLocaleDateString("fr-FR")} — {event.venue}
                          </p>
                          <p className="text-xs text-text-disabled mt-1">
                            {placesVendues} / {totalPlaces} places vendues
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex gap-2">
                          <Link
                            href={`/evenements/${event.id}`}
                            className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-surface transition-colors"
                          >
                            Voir
                          </Link>
                          <Link
                            href={`/evenements/${event.id}/valider`}
                            className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                          >
                            Valider ticket
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
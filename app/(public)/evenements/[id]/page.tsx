import { Suspense } from "react";
import { prisma } from "@/core/db/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function EvenementDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Chargement de l'événement...</div>}>
      <EvenementContent params={params} />
    </Suspense>
  );
}

async function EvenementContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      organizer: true,
      ticketTypes: true,
    },
  });

  if (!event) {
    notFound();
  }

  const ticketType = event.ticketTypes[0]; 
  const placesRestantes = ticketType ? ticketType.quantity - ticketType.sold : 0;

  // Tout ton design est conservé ici
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
          ← Retour aux événements
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {event.category.name}
          </span>
          <span className="text-sm text-text-secondary">
            Organisé par {event.organizer.name}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          {event.title}
        </h1>
        <p className="text-lg text-text-secondary">
          {new Date(event.startsAt).toLocaleDateString("fr-FR", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })} — {event.venue}, {event.city}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-bold text-text-primary mb-4">À propos de l'événement</h2>
            <p className="text-text-secondary whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-card sticky top-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Billets</h2>
            
            {ticketType ? (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-text-primary">{ticketType.name}</p>
                  <p className="text-2xl font-bold text-primary">
                    {ticketType.price.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
                
                <p className="text-sm text-text-secondary">
                  {placesRestantes > 0 
                    ? `${placesRestantes} place(s) restante(s)`
                    : "Complet"}
                </p>

                <button 
                  disabled={placesRestantes === 0}
                  className="w-full h-12 bg-primary hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {placesRestantes > 0 ? "Acheter un ticket" : "Complet"}
                </button>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">Aucun billet disponible.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
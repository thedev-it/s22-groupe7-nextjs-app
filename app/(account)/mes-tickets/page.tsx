import { requireUser } from "@/modules/auth/queries";
import { prisma } from "@/core/db/prisma";
import Link from "next/link";
import QRCode from "react-qr-code"; // <-- L'import du QR Code

export default async function MesTicketsPage() {
  const user = await requireUser();

  const tickets = await prisma.ticket.findMany({
    where: { order: { userId: user.id } },
    include: {
      order: { include: { event: true } },
      ticketType: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          <span className="mr-2">←</span> Retour à l'accueil
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Mes billets</h1>
        <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-semibold">
          {tickets.length} billet(s)
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-border">
          <p className="text-text-secondary mb-4 text-lg">Vous n'avez pas encore de billets.</p>
          <Link href="/" className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors">
            Découvrir les événements
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-hover transition-shadow flex flex-col sm:flex-row gap-6">
              
              {/* Infos à gauche */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-text-primary mb-1 line-clamp-2">
                    {ticket.order.event.title}
                  </h2>
                  <p className="text-sm text-text-secondary mb-4">
                    {new Date(ticket.order.event.startsAt).toLocaleDateString("fr-FR", {
                      weekday: 'long', day: 'numeric', month: 'long'
                    })} — {ticket.order.event.venue}
                  </p>
                </div>
                
                <div>
                  <div className="bg-background border border-border rounded-lg p-3 text-center mb-3">
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">Code d'accès</p>
                    <p className="text-lg font-mono font-bold text-primary tracking-widest">
                      {ticket.code}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">{ticket.ticketType.name}</span>
                    <span className={`font-bold px-2 py-1 rounded-md text-xs ${
                      ticket.status === 'VALID' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.status === 'VALID' ? 'VALIDE' : 'UTILISÉ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code à droite */}
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-border shrink-0">
                <QRCode 
                  value={ticket.code} 
                  size={100}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
                <p className="text-[10px] text-gray-500 mt-2 text-center">Scannez à l'entrée</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
"use client";

import { acheterTicket } from "@/modules/orders/actions";

export function BoutonAchat({ 
  eventId, 
  ticketTypeId, 
  price 
}: { 
  eventId: string; 
  ticketTypeId: string; 
  price: number;
}) {
  return (
    <form action={() => acheterTicket(eventId, ticketTypeId)}>
      <button 
        type="submit" 
        className="w-full rounded-sm bg-primary px-4 py-3 font-bold text-white transition-colors hover:bg-primary-hover"
      >
        Acheter pour {price.toLocaleString("fr-FR")} FCFA
      </button>
    </form>
  );
}
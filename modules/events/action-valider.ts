"use server"

import { requireUser } from "@/modules/auth/queries"
import { prisma } from "@/core/db/prisma"
import { revalidatePath } from "next/cache"

export async function validerTicket(eventId: string, code: string) {
  const user = await requireUser()

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  })

  if (event?.organizerId !== user.id) {
    return { error: "Vous n'êtes pas l'organisateur de cet événement." }
  }

  const ticket = await prisma.ticket.findUnique({
    where: { code },
    include: { order: true }
  })

  if (!ticket) return { error: "Code de ticket invalide." }
  if (ticket.order.eventId !== eventId) return { error: "Ce ticket concerne un autre événement." }
  if (ticket.status === "USED") return { error: "Ce ticket a déjà été utilisé." }

  await prisma.ticket.update({
    where: { code },
    data: { status: "USED", usedAt: new Date() }
  })

  revalidatePath(`/evenements/${eventId}/valider`)
  return { success: `Entrée validée pour le ticket ${code} !` }
}
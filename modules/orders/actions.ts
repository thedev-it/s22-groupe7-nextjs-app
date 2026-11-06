"use server"

import { requireUser } from "@/modules/auth/queries"
import { prisma } from "@/core/db/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { randomBytes } from "crypto"

export async function acheterTicket(eventId: string, ticketTypeId: string) {
  const user = await requireUser()

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { organizerId: true }
    })

    if (event?.organizerId === user.id) {
      throw new Error("Vous ne pouvez pas acheter un ticket pour votre propre événement.")
    }

    await prisma.$transaction(async (tx) => {
      const ticketType = await tx.ticketType.findUnique({
        where: { id: ticketTypeId },
      })

      if (!ticketType) throw new Error("Type de ticket introuvable")
      if (ticketType.sold >= ticketType.quantity) {
        throw new Error("Cet événement est complet.")
      }

      await tx.ticketType.update({
        where: { id: ticketTypeId },
        data: { sold: { increment: 1 } },
      })

      const order = await tx.order.create({
        data: {
          userId: user.id,
          eventId,
          total: ticketType.price,
          status: "PAID",
        },
      })

      const code = `EVT-${randomBytes(3).toString("hex").toUpperCase()}`
      
      await tx.ticket.create({
        data: {
          code,
          orderId: order.id,
          ticketTypeId,
          pricePaid: ticketType.price,
          status: "VALID",
        },
      })
    })

    revalidatePath(`/evenements/${eventId}`)
    
  } catch (error) {
    console.error(error)
    throw error
  }

  redirect("/mes-tickets")
}
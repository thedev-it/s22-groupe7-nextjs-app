"use server"

import { auth } from "@/auth"
import { prisma } from "@/core/db/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function creerEvenement(formData: FormData) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })
  
  if (user?.role !== "ORGANIZER") {
    throw new Error("Seuls les organisateurs peuvent créer un événement")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const startsAt = new Date(formData.get("startsAt") as string)
  const venue = formData.get("venue") as string
  const city = formData.get("city") as "BRAZZAVILLE" | "POINTE_NOIRE"
  const categoryId = formData.get("categoryId") as string
  
  const ticketName = formData.get("ticketName") as string || "Standard"
  const ticketPrice = Number(formData.get("ticketPrice"))
  const ticketQuantity = Number(formData.get("ticketQuantity"))
  const event = await prisma.event.create({
    data: {
      title,
      description,
      startsAt,
      venue,
      city,
      categoryId,
      status: "PUBLISHED",
      organizerId: session.user.id,
      ticketTypes: {
        create: {
          name: ticketName,
          price: ticketPrice,
          quantity: ticketQuantity,
        },
      },
    },
  })

  revalidatePath("/evenements")
  revalidatePath("/dashboard")
  redirect(`/evenements/${event.id}`)
}
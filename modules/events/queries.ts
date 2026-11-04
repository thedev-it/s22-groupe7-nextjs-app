import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/core/db/prisma";
import type { City } from "@/app/generated/prisma/enums";
import type { EventCardData } from "./components/event-card";
import type { EventFiltersValues } from "./components/event-filters";
import { cityLabels } from "./format";

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  return prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });
}

export async function getEvents(filters: EventFiltersValues): Promise<EventCardData[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag("events");

  const city = filters.ville && filters.ville in cityLabels ? (filters.ville as City) : undefined;
  const fromDate = filters.date ? new Date(filters.date) : new Date();
  const from = Number.isNaN(fromDate.getTime()) ? new Date() : fromDate;

  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      startsAt: { gte: from },
      city,
      category: filters.categorie ? { slug: filters.categorie } : undefined,
      OR: filters.q
        ? [
            { title: { contains: filters.q, mode: "insensitive" } },
            { venue: { contains: filters.q, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      title: true,
      startsAt: true,
      venue: true,
      city: true,
      imageUrl: true,
      category: { select: { name: true, slug: true } },
      ticketTypes: { select: { price: true, quantity: true, sold: true } },
    },
  });

  return events.map(({ ticketTypes, ...event }) => ({
    ...event,
    minPrice: ticketTypes.length > 0 ? Math.min(...ticketTypes.map((type) => type.price)) : null,
    remaining: ticketTypes.reduce((total, type) => total + type.quantity - type.sold, 0),
  }));
}

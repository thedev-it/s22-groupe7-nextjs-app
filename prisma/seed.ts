import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const daysFromNow = (days: number, hour = 19) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
};

const categories = [
  { name: "Concert", slug: "concert" },
  { name: "Conférence", slug: "conference" },
  { name: "Sport", slug: "sport" },
  { name: "Festival", slug: "festival" },
  { name: "Théâtre", slug: "theatre" },
  { name: "Gastronomie", slug: "gastronomie" },
  { name: "Mode", slug: "mode" },
  { name: "Formation", slug: "formation" },
];

const events = [
  {
    title: "Nuit Rumba Live",
    description: "Une soirée rumba avec orchestre live, piste de danse et DJ en clôture.",
    category: "concert",
    city: "BRAZZAVILLE",
    venue: "Palais des Congrès",
    startsAt: daysFromNow(14, 20),
    tickets: [
      { name: "Standard", price: 5000, quantity: 300 },
      { name: "VIP", price: 15000, quantity: 80 },
    ],
  },
  {
    title: "Forum Tech & Innovation",
    description: "Conférences et ateliers sur le numérique, les startups et l'entrepreneuriat en Afrique centrale.",
    category: "conference",
    city: "BRAZZAVILLE",
    venue: "Hôtel Radisson Blu",
    startsAt: daysFromNow(21, 9),
    tickets: [
      { name: "Standard", price: 10000, quantity: 200 },
      { name: "Étudiant", price: 3000, quantity: 100 },
    ],
  },
  {
    title: "Tournoi de Football Inter-Quartiers",
    description: "Finale du tournoi annuel entre les équipes des quartiers de la ville.",
    category: "sport",
    city: "POINTE_NOIRE",
    venue: "Stade Municipal",
    startsAt: daysFromNow(10, 16),
    tickets: [
      { name: "Tribune", price: 2000, quantity: 500 },
      { name: "Tribune VIP", price: 8000, quantity: 60 },
    ],
  },
  {
    title: "Festival de la Plage",
    description: "Deux jours de musique, de street food et d'animations face à l'océan.",
    category: "festival",
    city: "POINTE_NOIRE",
    venue: "Plage de Côte Sauvage",
    startsAt: daysFromNow(30, 15),
    tickets: [
      { name: "Pass journée", price: 7000, quantity: 400 },
      { name: "Pass VIP", price: 20000, quantity: 50 },
    ],
  },
  {
    title: "Soirée Théâtre : Les Voix du Fleuve",
    description: "Une pièce originale mêlant contes traditionnels et mise en scène contemporaine.",
    category: "theatre",
    city: "BRAZZAVILLE",
    venue: "Institut Français du Congo",
    startsAt: daysFromNow(18, 19),
    tickets: [{ name: "Standard", price: 4000, quantity: 150 }],
  },
  {
    title: "Atelier Cuisine Congolaise",
    description: "Atelier gratuit animé par des cheffs locaux : préparation de plats traditionnels.",
    category: "gastronomie",
    city: "POINTE_NOIRE",
    venue: "Centre Culturel de Pointe-Noire",
    startsAt: daysFromNow(7, 14),
    tickets: [{ name: "Entrée libre", price: 0, quantity: 60 }],
  },
];

async function main() {
  // Catégories
  const categoryIds = new Map<string, string>();
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    categoryIds.set(c.slug, cat.id);
  }

  // Compte organisateur
  const password = process.env.SEED_ORGANIZER_PASSWORD ?? "Organizer123!";
  const organizer = await prisma.user.upsert({
    where: { email: "organisateur@example.com" },
    update: {},
    create: {
      name: "Organisateur Démo",
      email: "organisateur@example.com",
      passwordHash: await hash(password, 10),
      role: "ORGANIZER",
    },
  });

  // Événements publiés (pas de doublon si on relance)
  for (const e of events) {
    const exists = await prisma.event.findFirst({
      where: { title: e.title, organizerId: organizer.id },
    });
    if (exists) continue;

    await prisma.event.create({
      data: {
        title: e.title,
        description: e.description,
        startsAt: e.startsAt,
        venue: e.venue,
        city: e.city as "BRAZZAVILLE" | "POINTE_NOIRE",
        status: "PUBLISHED",
        categoryId: categoryIds.get(e.category)!,
        organizerId: organizer.id,
        ticketTypes: { create: e.tickets },
      },
    });
  }

  console.log("Seed terminé :", {
    categories: await prisma.category.count(),
    events: await prisma.event.count(),
    ticketTypes: await prisma.ticketType.count(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
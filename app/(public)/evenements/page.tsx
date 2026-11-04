import { EventCard, type EventCardData } from "@/modules/events/components/event-card";
import { EventFilters } from "@/modules/events/components/event-filters";

// Données d'exemple : remplacées par la base à l'étape suivante.
const categories = [
  { name: "Concerts", slug: "concerts" },
  { name: "Matchs", slug: "matchs" },
  { name: "Conférences", slug: "conferences" },
  { name: "Festivals", slug: "festivals" },
];

const events: EventCardData[] = [
  {
    id: "1",
    title: "Nuit de la Rumba",
    startsAt: new Date("2026-11-14T19:30:00Z"),
    venue: "Institut français",
    city: "BRAZZAVILLE",
    imageUrl: null,
    category: categories[0],
    minPrice: 5000,
    remaining: 12,
  },
  {
    id: "2",
    title: "Brazza Tech Days 2026",
    startsAt: new Date("2026-11-16T08:00:00Z"),
    venue: "Palais des congrès",
    city: "BRAZZAVILLE",
    imageUrl: null,
    category: categories[2],
    minPrice: 0,
    remaining: 140,
  },
  {
    id: "3",
    title: "Diables Rouges contre Gabon",
    startsAt: new Date("2026-11-21T15:00:00Z"),
    venue: "Stade Massamba-Débat",
    city: "BRAZZAVILLE",
    imageUrl: null,
    category: categories[1],
    minPrice: 2000,
    remaining: 0,
  },
  {
    id: "4",
    title: "Côte Sauvage Festival",
    startsAt: new Date("2026-11-22T16:00:00Z"),
    venue: "Plage de la Côte Sauvage",
    city: "POINTE_NOIRE",
    imageUrl: null,
    category: categories[3],
    minPrice: 10000,
    remaining: 380,
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-content px-4 pt-8 pb-12 md:px-8 lg:pt-14 lg:pb-24">
      <div className="mb-7 flex items-end justify-between gap-4">
        <h1 className="text-4xl leading-none font-extrabold tracking-[-0.035em] md:text-[56px]">
          Événements
        </h1>
        <p className="text-[15px] text-text-secondary">{events.length} événements à venir</p>
      </div>

      <EventFilters categories={categories} filters={{}} />

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}

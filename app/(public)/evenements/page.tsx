import Link from "next/link";
import { Suspense } from "react";
import { EventCard } from "@/modules/events/components/event-card";
import { EventFilters } from "@/modules/events/components/event-filters";
import { getCategories, getEvents } from "@/modules/events/queries";

type SearchParams = PageProps<"/evenements">["searchParams"];

function firstValue(value: string | string[] | undefined) {
  const text = Array.isArray(value) ? value[0] : value;
  return text?.trim() || undefined;
}

async function EventsResults({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filters = {
    q: firstValue(params.q),
    ville: firstValue(params.ville),
    categorie: firstValue(params.categorie),
    date: firstValue(params.date),
  };

  const [categories, events] = await Promise.all([getCategories(), getEvents(filters)]);

  return (
    <>
      <EventFilters categories={categories} filters={filters} />

      <p className="mt-8 mb-4 text-[15px] text-text-secondary" aria-live="polite">
        {events.length} {events.length > 1 ? "événements à venir" : "événement à venir"}
      </p>

      {events.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
          <p className="text-lg font-bold">Aucun événement ne correspond à ces filtres.</p>
          <Link href="/evenements" className="mt-3 inline-block font-semibold underline">
            Voir tous les événements
          </Link>
        </div>
      )}
    </>
  );
}

function EventsSkeleton() {
  return (
    <div aria-hidden className="animate-pulse motion-reduce:animate-none">
      <div className="h-[106px] rounded-lg bg-surface-secondary" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-[380px] rounded-lg bg-surface-secondary" />
        ))}
      </div>
    </div>
  );
}

export default function EventsPage({ searchParams }: PageProps<"/evenements">) {
  return (
    <div className="mx-auto max-w-content px-4 pt-8 pb-12 md:px-8 lg:pt-14 lg:pb-24">
      <h1 className="mb-7 text-4xl leading-none font-extrabold tracking-[-0.035em] md:text-[56px]">
        Événements
      </h1>

      <Suspense fallback={<EventsSkeleton />}>
        <EventsResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

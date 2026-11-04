import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink } from "@/shared/components/button-link";
import { TicketPanel } from "@/modules/events/components/ticket-panel";
import {
  categoryColors,
  cityLabels,
  defaultCategoryColor,
  formatFullDate,
  formatPrice,
} from "@/modules/events/format";
import { getEventById, getPublishedEventIds } from "@/modules/events/queries";

export async function generateStaticParams() {
  const ids = await getPublishedEventIds();
  return ids.map((id) => ({ id }));
}

async function EventDetails({ params }: { params: PageProps<"/evenements/[id]">["params"] }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const date = formatFullDate(event.startsAt);
  const minPrice = event.ticketTypes[0]?.price;
  const infos = [
    { label: "Date", value: date },
    { label: "Lieu", value: `${event.venue}, ${cityLabels[event.city]}` },
    { label: "Organisateur", value: event.organizer.name },
  ];

  return (
    <>
      <nav aria-label="Fil d’Ariane" className="text-sm">
        <ol className="flex flex-wrap gap-1.5 text-text-secondary">
          <li>
            <Link href="/evenements" className="hover:text-text-primary">
              Événements
            </Link>{" "}
            /
          </li>
          <li>
            <Link
              href={`/evenements?categorie=${event.category.slug}`}
              className="hover:text-text-primary"
            >
              {event.category.name}
            </Link>{" "}
            /
          </li>
          <li aria-current="page" className="font-bold text-text-primary">
            {event.title}
          </li>
        </ol>
      </nav>

      <div className="mt-5 flex flex-col gap-7 lg:mt-7 lg:flex-row lg:items-start lg:gap-14">
        <article className="min-w-0 flex-1">
          <div
            className={`relative flex aspect-video items-end overflow-hidden rounded-lg p-5.5 lg:p-10 ${categoryColors[event.category.slug] ?? defaultCategoryColor}`}
          >
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={`Affiche de ${event.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 680px, 100vw"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="text-[52px] leading-none font-extrabold tracking-[-0.05em] md:text-8xl"
              >
                {event.category.name}
                <span className="text-primary-hover">.</span>
              </span>
            )}
          </div>

          <span className="mt-6 inline-block rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold lg:mt-9">
            {event.category.name}
          </span>
          <h1 className="mt-3.5 mb-6 text-[34px] leading-none font-extrabold tracking-[-0.035em] md:text-[52px]">
            {event.title}
          </h1>

          <dl className="grid gap-3.5 border-y border-border py-5 md:grid-cols-3 md:gap-0">
            {infos.map((info) => (
              <div key={info.label} className="md:not-first:border-l md:not-first:border-border md:not-first:pl-6">
                <dt className="text-[11px] font-bold tracking-widest text-text-secondary uppercase">
                  {info.label}
                </dt>
                <dd className="mt-1.5 text-[15px] font-bold">{info.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 mb-3 text-[22px] font-extrabold">À propos</h2>
          <p className="max-w-[680px] leading-relaxed whitespace-pre-line text-text-secondary">
            {event.description}
          </p>

          <h2 className="mt-8 mb-3 text-[22px] font-extrabold">Infos pratiques</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-text-secondary">
            <li>Votre ticket est disponible dans « Mes tickets » avec son QR code.</li>
            <li>Le QR code est scanné à l’entrée.</li>
            <li>Un ticket déjà utilisé est refusé.</li>
          </ul>
        </article>

        <TicketPanel date={date} ticketTypes={event.ticketTypes} />
      </div>

      {minPrice !== undefined && (
        <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-border bg-surface px-4 py-3.5 shadow-[0_-8px_24px_rgba(37,37,34,0.08)] lg:hidden">
          <p className="text-[15px] font-extrabold">
            {formatPrice(minPrice)}
            <span className="block text-xs font-medium text-text-secondary">
              {minPrice === 0 ? "Entrée libre" : "À partir de"}
            </span>
          </p>
          <ButtonLink href="#billetterie">Choisir mes tickets</ButtonLink>
        </div>
      )}
    </>
  );
}

function EventSkeleton() {
  return (
    <div aria-hidden className="animate-pulse motion-reduce:animate-none">
      <div className="h-5 w-64 rounded-sm bg-surface-secondary" />
      <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:gap-14">
        <div className="flex-1">
          <div className="aspect-video rounded-lg bg-surface-secondary" />
          <div className="mt-9 h-12 w-2/3 rounded-sm bg-surface-secondary" />
        </div>
        <div className="h-[360px] rounded-lg bg-surface-secondary lg:w-[400px]" />
      </div>
    </div>
  );
}

export default function EventPage({ params }: PageProps<"/evenements/[id]">) {
  return (
    <div className="mx-auto max-w-content px-4 pt-5 pb-28 md:px-8 lg:pt-8 lg:pb-24">
      <Suspense fallback={<EventSkeleton />}>
        <EventDetails params={params} />
      </Suspense>
    </div>
  );
}

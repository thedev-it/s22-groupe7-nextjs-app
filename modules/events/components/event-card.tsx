import Image from "next/image";
import Link from "next/link";
import type { City } from "@/app/generated/prisma/enums";
import { cityLabels, formatDayMonth, formatPrice } from "../format";

export type EventCardData = {
  id: string;
  title: string;
  startsAt: Date;
  venue: string;
  city: City;
  imageUrl: string | null;
  category: { name: string; slug: string };
  minPrice: number | null;
  remaining: number;
};

const posterColors: Record<string, string> = {
  concert: "bg-text-primary text-background",
  sport: "bg-primary-light",
  festival: "bg-primary",
};

function Availability({ remaining }: { remaining: number }) {
  if (remaining === 0) {
    return <span className="rounded-full bg-danger/15 px-2.5 py-1 text-xs font-bold">Complet</span>;
  }
  if (remaining <= 20) {
    return (
      <span className="rounded-full bg-warning/20 px-2.5 py-1 text-xs font-bold">
        Plus que {remaining} places
      </span>
    );
  }
  return (
    <span className="text-sm font-bold">
      Voir <span aria-hidden>→</span>
    </span>
  );
}

export function EventCard({ event }: { event: EventCardData }) {
  const { day, month } = formatDayMonth(event.startsAt);

  return (
    <Link
      href={`/evenements/${event.id}`}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        className={`relative flex aspect-video items-end p-4.5 ${posterColors[event.category.slug] ?? "bg-surface-secondary"}`}
      >
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span aria-hidden className="text-[44px] leading-none font-extrabold tracking-[-0.04em]">
            {event.category.name}
          </span>
        )}
        <span className="absolute top-3.5 left-3.5 w-14.5 rounded-[10px] bg-surface py-1.5 text-center leading-none text-text-primary">
          <span className="block text-[22px] font-extrabold">{day}</span>
          <span className="text-[11px] font-bold tracking-widest text-text-secondary">{month}</span>
        </span>
      </div>

      <div className="flex-1 px-5.5 pt-5 pb-4.5">
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold">
          {event.category.name}
        </span>
        <h2 className="mt-3 mb-1.5 text-[19px] leading-snug font-bold tracking-tight">
          {event.title}
        </h2>
        <p className="text-sm text-text-secondary">
          {event.venue} · {cityLabels[event.city]}
        </p>
      </div>

      <div className="relative flex items-center justify-between border-t-2 border-dashed border-border px-5.5 pt-4 pb-4.5 before:absolute before:-top-[11px] before:-left-[11px] before:size-5 before:rounded-full before:border before:border-border before:bg-background after:absolute after:-top-[11px] after:-right-[11px] after:size-5 after:rounded-full after:border after:border-border after:bg-background">
        {event.minPrice === null ? (
          <p className="text-sm text-text-secondary">Billetterie bientôt ouverte</p>
        ) : (
          <p className="text-[15px] font-extrabold">
            {formatPrice(event.minPrice)}
            <span className="block text-xs font-medium text-text-secondary">
              {event.minPrice === 0 ? "Entrée libre" : "À partir de"}
            </span>
          </p>
        )}
        {event.minPrice !== null && <Availability remaining={event.remaining} />}
      </div>
    </Link>
  );
}

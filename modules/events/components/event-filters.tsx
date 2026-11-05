import Link from "next/link";
import type { City } from "@/app/generated/prisma/enums";
import { cityLabels } from "../format";

export type EventFiltersValues = {
  q?: string;
  ville?: string;
  categorie?: string;
  date?: string;
};

type Category = { name: string; slug: string };

const fieldClass =
  "h-12 w-full rounded-sm border border-border bg-surface px-3.5 text-[15px] focus:border-primary focus:outline-2 focus:outline-primary/30";

function hrefWithout(filters: EventFiltersValues, removed: keyof EventFiltersValues) {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(filters)) {
    if (value && name !== removed) params.set(name, value);
  }
  const query = params.toString();
  return query ? `/evenements?${query}` : "/evenements";
}

export function EventFilters({
  categories,
  filters,
}: {
  categories: Category[];
  filters: EventFiltersValues;
}) {
  const active: [keyof EventFiltersValues, string | undefined][] = [
    ["q", filters.q && `« ${filters.q} »`],
    ["ville", filters.ville && cityLabels[filters.ville as City]],
    ["categorie", categories.find((category) => category.slug === filters.categorie)?.name],
    [
      "date",
      filters.date &&
        `Dès le ${new Date(filters.date).toLocaleDateString("fr-FR", { timeZone: "UTC" })}`,
    ],
  ];
  const chips = active.filter(([, label]) => label);

  return (
    <div>
      <form
        action="/evenements"
        className="grid gap-4 rounded-lg border border-border bg-surface p-4 md:grid-cols-2 md:p-5 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-end"
      >
        <div className="md:col-span-2 lg:col-span-1">
          <label htmlFor="q" className="mb-1.5 block text-[13px] font-semibold">
            Recherche
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={filters.q}
            placeholder="Un artiste, un lieu…"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="ville" className="mb-1.5 block text-[13px] font-semibold">
            Ville
          </label>
          <select id="ville" name="ville" defaultValue={filters.ville ?? ""} className={fieldClass}>
            <option value="">Toutes les villes</option>
            {Object.entries(cityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="categorie" className="mb-1.5 block text-[13px] font-semibold">
            Catégorie
          </label>
          <select
            id="categorie"
            name="categorie"
            defaultValue={filters.categorie ?? ""}
            className={fieldClass}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="mb-1.5 block text-[13px] font-semibold">
            À partir du
          </label>
          <input id="date" name="date" type="date" defaultValue={filters.date} className={fieldClass} />
        </div>
        <button
          type="submit"
          className="h-12 rounded-sm bg-primary px-5 font-bold transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary md:col-span-2 lg:col-span-1"
        >
          Rechercher
        </button>
      </form>

      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {chips.map(([key, label]) => (
            <Link
              key={key}
              href={hrefWithout(filters, key)}
              aria-label={`Retirer le filtre ${label}`}
              className="inline-flex h-8.5 items-center gap-2 rounded-full bg-text-primary px-3 text-[13px] font-semibold text-background"
            >
              {label} <span aria-hidden>✕</span>
            </Link>
          ))}
          <Link href="/evenements" className="ml-1.5 text-sm font-semibold underline">
            Tout effacer
          </Link>
        </div>
      )}
    </div>
  );
}

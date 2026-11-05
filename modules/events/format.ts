import type { City } from "@/app/generated/prisma/enums";

export const cityLabels: Record<City, string> = {
  BRAZZAVILLE: "Brazzaville",
  POINTE_NOIRE: "Pointe-Noire",
};

export const categoryColors: Record<string, string> = {
  concert: "bg-text-primary text-background",
  sport: "bg-primary-light",
  festival: "bg-primary",
};

export const defaultCategoryColor = "bg-surface-secondary";

const timeZone = "Africa/Brazzaville";

export function formatPrice(price: number) {
  return price === 0 ? "Gratuit" : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export function formatFullDate(date: Date) {
  const day = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
  const time = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone })
    .format(date)
    .replace(":", "h");
  return `${day.charAt(0).toUpperCase()}${day.slice(1)}, ${time}`;
}

export function formatDayMonth(date: Date) {
  const day = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", timeZone }).format(date);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return { day, month };
}

import type { City } from "@/app/generated/prisma/enums";

export const cityLabels: Record<City, string> = {
  BRAZZAVILLE: "Brazzaville",
  POINTE_NOIRE: "Pointe-Noire",
};

const timeZone = "Africa/Brazzaville";

export function formatPrice(price: number) {
  return price === 0 ? "Gratuit" : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export function formatDayMonth(date: Date) {
  const day = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", timeZone }).format(date);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return { day, month };
}

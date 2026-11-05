import { City } from "@/app/generated/prisma/enums";
import type { EventFieldErrors } from "./types";

export interface EventInput {
  title: string;
  description: string;
  startsAt: Date;
  venue: string;
  city: City;
  categoryId: string;
  imageUrl: string | null;
}

interface RawEventInput {
  title: string;
  description: string;
  startsAt: string;
  venue: string;
  city: string;
  categoryId: string;
  imageUrl: string;
}

export function validateEventInput(input: RawEventInput): {
  isValid: boolean;
  errors: EventFieldErrors;
  data?: EventInput;
} {
  const errors: EventFieldErrors = {};

  const title = input.title.trim();
  const description = input.description.trim();
  const venue = input.venue.trim();
  const categoryId = input.categoryId.trim();
  const imageUrl = input.imageUrl.trim();
  const startsAt = new Date(input.startsAt);
  const city = input.city as City;

  if (title.length < 3) {
    errors.title = "Le titre doit comporter au moins 3 caractères.";
  }

  if (description.length < 10) {
    errors.description = "La description doit comporter au moins 10 caractères.";
  }

  if (!input.startsAt || Number.isNaN(startsAt.getTime())) {
    errors.startsAt = "Veuillez renseigner une date et une heure valides.";
  }

  if (!venue) {
    errors.venue = "Veuillez renseigner un lieu.";
  }

  if (city !== City.BRAZZAVILLE && city !== City.POINTE_NOIRE) {
    errors.city = "Veuillez choisir une ville valide.";
  }

  if (!categoryId) {
    errors.categoryId = "Veuillez choisir une catégorie.";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      title,
      description,
      startsAt,
      venue,
      city,
      categoryId,
      imageUrl: imageUrl || null,
    },
  };
}

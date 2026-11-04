"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/core/db/prisma";
import {
  getCurrentSession,
  requireOwnership,
  requireRole,
} from "@/modules/auth/queries";
import type { AuthzFailure } from "@/modules/auth/types";
import type { EventActionResult, EventFieldErrors } from "./types";
import { validateEventInput } from "./validation";

function forbidden(authz: AuthzFailure): EventActionResult {
  return { success: false, status: authz.status, error: authz.error };
}

function readEventFormData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    startsAt: String(formData.get("startsAt") ?? ""),
    venue: String(formData.get("venue") ?? ""),
    city: String(formData.get("city") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
  };
}

function invalid(errors: EventFieldErrors): EventActionResult {
  return {
    success: false,
    status: 400,
    error: "Veuillez corriger les erreurs dans le formulaire.",
    fieldErrors: errors,
  };
}

async function categoryExists(categoryId: string): Promise<boolean> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });
  return Boolean(category);
}

function revalidateEvent(eventId: string) {
  revalidatePath("/");
  revalidatePath("/evenements");
  revalidatePath(`/evenements/${eventId}`);
  revalidatePath("/dashboard");
}

/**
 * Crée un événement pour l'organisateur connecté.
 * Le rôle est vérifié ici : appeler l'action directement avec une session
 * ATTENDEE renvoie une erreur 403. organizerId vient toujours de la session.
 */
export async function createEventAction(
  formData: FormData
): Promise<EventActionResult> {
  const session = await getCurrentSession();
  const authz = requireRole(session, "ORGANIZER");
  if (!authz.ok) {
    return forbidden(authz);
  }

  const validation = validateEventInput(readEventFormData(formData));
  if (!validation.isValid || !validation.data) {
    return invalid(validation.errors);
  }

  try {
    if (!(await categoryExists(validation.data.categoryId))) {
      return invalid({ categoryId: "Cette catégorie n'existe pas." });
    }

    const event = await prisma.event.create({
      data: {
        ...validation.data,
        organizerId: authz.user.id,
      },
      select: { id: true },
    });

    revalidateEvent(event.id);
    return { success: true, eventId: event.id };
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
    return {
      success: false,
      status: 500,
      error: "Une erreur est survenue lors de la création de l'événement.",
    };
  }
}

/**
 * Modifie un événement appartenant à l'organisateur connecté.
 * Un organisateur ne peut pas modifier l'événement d'un autre (403).
 */
export async function updateEventAction(
  formData: FormData
): Promise<EventActionResult> {
  const eventId = String(formData.get("eventId") ?? "");
  if (!eventId) {
    return {
      success: false,
      status: 400,
      error: "Identifiant de l'événement manquant.",
    };
  }

  const session = await getCurrentSession();
  const authz = requireRole(session, "ORGANIZER");
  if (!authz.ok) {
    return forbidden(authz);
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { organizerId: true },
    });

    if (!event) {
      return {
        success: false,
        status: 404,
        error: "Événement introuvable.",
      };
    }

    const ownership = requireOwnership(session, event.organizerId);
    if (!ownership.ok) {
      return forbidden(ownership);
    }

    const validation = validateEventInput(readEventFormData(formData));
    if (!validation.isValid || !validation.data) {
      return invalid(validation.errors);
    }

    if (!(await categoryExists(validation.data.categoryId))) {
      return invalid({ categoryId: "Cette catégorie n'existe pas." });
    }

    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: validation.data.title,
        description: validation.data.description,
        startsAt: validation.data.startsAt,
        venue: validation.data.venue,
        city: validation.data.city,
        categoryId: validation.data.categoryId,
        imageUrl: validation.data.imageUrl,
      },
    });

    revalidateEvent(eventId);
    return { success: true, eventId };
  } catch (error) {
    console.error("Erreur lors de la modification de l'événement :", error);
    return {
      success: false,
      status: 500,
      error: "Une erreur est survenue lors de la modification de l'événement.",
    };
  }
}

/**
 * Supprime un événement appartenant à l'organisateur connecté.
 * Refusé si l'événement ne lui appartient pas (403) ou si des tickets ont été vendus (409).
 */
export async function deleteEventAction(
  eventId: string
): Promise<EventActionResult> {
  if (!eventId) {
    return {
      success: false,
      status: 400,
      error: "Identifiant de l'événement manquant.",
    };
  }

  const session = await getCurrentSession();
  const authz = requireRole(session, "ORGANIZER");
  if (!authz.ok) {
    return forbidden(authz);
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        organizerId: true,
        ticketTypes: { select: { sold: true } },
      },
    });

    if (!event) {
      return {
        success: false,
        status: 404,
        error: "Événement introuvable.",
      };
    }

    const ownership = requireOwnership(session, event.organizerId);
    if (!ownership.ok) {
      return forbidden(ownership);
    }

    const soldTickets = event.ticketTypes.reduce(
      (total, ticketType) => total + ticketType.sold,
      0
    );

    if (soldTickets > 0) {
      return {
        success: false,
        status: 409,
        error:
          "Impossible de supprimer un événement dont des tickets ont déjà été vendus.",
      };
    }

    await prisma.event.delete({ where: { id: eventId } });

    revalidateEvent(eventId);
    return { success: true, eventId };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement :", error);
    return {
      success: false,
      status: 500,
      error: "Une erreur est survenue lors de la suppression de l'événement.",
    };
  }
}

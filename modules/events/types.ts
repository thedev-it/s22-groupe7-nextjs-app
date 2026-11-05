export interface EventFieldErrors {
  title?: string;
  description?: string;
  startsAt?: string;
  venue?: string;
  city?: string;
  categoryId?: string;
}

export type EventActionResult =
  | { success: true; eventId: string }
  | {
      success: false;
      status: number;
      error: string;
      fieldErrors?: EventFieldErrors;
    };

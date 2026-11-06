"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full rounded bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
    >
      {pending ? "Publication en cours..." : "Publier l'événement"}
    </button>
  );
}
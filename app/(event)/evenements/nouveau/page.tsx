import { Suspense } from "react";
import { prisma } from "@/core/db/prisma";
import { creerEvenement } from "@/modules/events/create";
import Link from "next/link";
import { SubmitButton } from "./submit-button";

async function FormulaireCreation() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Créer un événement</h1>
        <Link href="/dashboard" className="text-sm text-orange-600 hover:underline">
          Retour
        </Link>
      </div>

      <form action={creerEvenement} className="space-y-4 rounded-lg border p-6 bg-white shadow-sm">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Titre de l'événement</label>
          <input id="title" name="title" required className="w-full rounded border p-2" placeholder="Ex: Concert Afrobeat" />
        </div>


        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <textarea id="description" name="description" required className="w-full rounded border p-2" rows={4} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startsAt" className="block text-sm font-medium mb-1">Date et heure</label>
            <input id="startsAt" name="startsAt" type="datetime-local" required className="w-full rounded border p-2" />
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium mb-1">Lieu</label>
            <input id="venue" name="venue" required className="w-full rounded border p-2" placeholder="Ex: Palais des Congrès" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">Ville</label>
            <select id="city" name="city" required className="w-full rounded border p-2">
              <option value="BRAZZAVILLE">Brazzaville</option>
              <option value="POINTE_NOIRE">Pointe-Noire</option>
            </select>
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium mb-1">Catégorie</label>
            <select id="categoryId" name="categoryId" required className="w-full rounded border p-2">
              <option value="">— Choisir —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="rounded border p-4 mt-6">
          <legend className="px-2 text-sm font-medium text-orange-600">Billets (Type unique)</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="ticketName" className="block text-sm font-medium mb-1">Nom du ticket</label>
              <input id="ticketName" name="ticketName" defaultValue="Standard" required className="w-full rounded border p-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticketPrice" className="block text-sm font-medium mb-1">Prix (FCFA)</label>
                <input id="ticketPrice" name="ticketPrice" type="number" min="0" required className="w-full rounded border p-2" />
              </div>
              <div>
                <label htmlFor="ticketQuantity" className="block text-sm font-medium mb-1">Places disponibles</label>
                <input id="ticketQuantity" name="ticketQuantity" type="number" min="1" required className="w-full rounded border p-2" />
              </div>
            </div>
          </div>
        </fieldset>

        <SubmitButton />
      </form>
    </main>
  );
}

export default function NouvelEvenementPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Chargement du formulaire...</div>}>
      <FormulaireCreation />
    </Suspense>
  );
}
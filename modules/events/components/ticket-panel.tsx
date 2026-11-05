import { formatPrice } from "../format";

type TicketType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sold: number;
};

function Stock({ remaining }: { remaining: number }) {
  if (remaining === 0) {
    return <span className="rounded-full bg-danger/15 px-2.5 py-1 text-xs font-bold">Épuisé</span>;
  }
  if (remaining <= 20) {
    return (
      <span className="rounded-full bg-warning/20 px-2.5 py-1 text-xs font-bold">
        Plus que {remaining}
      </span>
    );
  }
  return <span className="text-sm text-text-secondary">{remaining} restantes</span>;
}

export function TicketPanel({
  date,
  ticketTypes,
  children,
}: {
  date: string;
  ticketTypes: TicketType[];
  children?: React.ReactNode;
}) {
  return (
    <aside
      id="billetterie"
      aria-labelledby="billetterie-titre"
      className="scroll-mt-6 rounded-lg bg-surface shadow-hover lg:sticky lg:top-6 lg:w-[400px] lg:shrink-0"
    >
      <div className="px-6.5 pt-6.5 pb-5">
        <h2 id="billetterie-titre" className="text-xl font-extrabold">
          Billetterie
        </h2>
        <p className="mt-1 text-sm text-text-secondary">{date}</p>
      </div>

      {ticketTypes.length > 0 ? (
        <ul>
          {ticketTypes.map((type) => {
            const remaining = type.quantity - type.sold;
            return (
              <li
                key={type.id}
                className={`flex items-center justify-between gap-4 border-t border-border px-6.5 py-4 ${remaining === 0 ? "opacity-60" : ""}`}
              >
                <div>
                  <p className="font-bold">{type.name}</p>
                  <p className="mt-1 font-extrabold">{formatPrice(type.price)}</p>
                </div>
                <Stock remaining={remaining} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="border-t border-border px-6.5 py-4 text-sm text-text-secondary">
          Les tickets ne sont pas encore en vente.
        </p>
      )}

      <div className="relative border-t-2 border-dashed border-border before:absolute before:-top-3 before:-left-3 before:size-[22px] before:rounded-full before:bg-background after:absolute after:-top-3 after:-right-3 after:size-[22px] after:rounded-full after:bg-background" />

      <div className="px-6.5 pt-5.5 pb-6.5">
        {children ?? (
          <p className="rounded-sm bg-background px-4 py-3 text-center text-sm font-semibold">
            L’achat en ligne ouvre bientôt.
          </p>
        )}
        <p className="mt-3 text-center text-xs text-text-secondary">
          Paiement simulé : aucun débit réel.
        </p>
      </div>
    </aside>
  );
}

import Link from "next/link";
import { ButtonLink } from "./button-link";
import { Logo } from "./logo";

const links = [
  { href: "/evenements", label: "Événements" },
  { href: "/mes-tickets", label: "Mes tickets" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-4 md:px-8">
        <Link href="/" aria-label="Event Congo, accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-8 text-[15px] font-medium text-text-secondary">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="px-4 text-sm font-bold">
            Connexion
          </Link>
          <ButtonLink href="/evenements/nouveau" size="sm">
            Créer un événement
          </ButtonLink>
        </div>

        <details className="relative md:hidden">
          <summary
            aria-label="Ouvrir le menu"
            className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-sm border border-border bg-surface [&::-webkit-details-marker]:hidden"
          >
            <span className="h-0.5 w-[18px] bg-text-primary" />
            <span className="h-0.5 w-[18px] bg-text-primary" />
            <span className="h-0.5 w-[18px] bg-text-primary" />
          </summary>
          <nav
            aria-label="Menu mobile"
            className="absolute top-14 right-0 z-10 w-60 rounded-md border border-border bg-surface p-2 shadow-hover"
          >
            <ul className="flex flex-col text-[15px] font-semibold">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block rounded-sm px-3 py-3 hover:bg-background">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="block rounded-sm px-3 py-3 hover:bg-background">
                  Connexion
                </Link>
              </li>
            </ul>
            <ButtonLink href="/evenements/nouveau" size="sm" className="mt-2 w-full">
              Créer un événement
            </ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

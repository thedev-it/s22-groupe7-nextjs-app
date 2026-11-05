import Link from "next/link";
import { Logo } from "./logo";

const links = [
  { href: "/evenements", label: "Événements" },
  { href: "/mes-tickets", label: "Mes tickets" },
  { href: "/login", label: "Connexion" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" aria-label="EkoloEvent, accueil">
          <Logo />
        </Link>
        <nav aria-label="Pied de page">
          <ul className="flex flex-col gap-3 text-[15px] font-medium text-text-secondary md:flex-row md:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[13px] text-text-secondary">
          Paiement simulé · Projet Akieni Academy S22
        </p>
      </div>
    </footer>
  );
}

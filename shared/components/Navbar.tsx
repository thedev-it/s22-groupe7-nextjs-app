import Link from "next/link";
import { getCurrentUser } from "@/modules/auth/queries";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl text-text-primary tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
            EC
          </span>
          <span>Event Congo</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 bg-surface-secondary rounded-lg animate-pulse" />
          <div className="h-9 w-24 bg-primary/20 rounded-lg animate-pulse" />
        </div>
      </div>
    </header>
  );
}

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo de la plateforme */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl text-text-primary hover:text-primary transition-colors tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
            EC
          </span>
          <span>Event Congo</span>
        </Link>

        {/* Liens et état d'authentification */}
        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
              >
                Tableau de bord
              </Link>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">
                  {user.role === "ORGANIZER" ? "Organisateur" : "Participant"}
                </span>
                <span className="text-sm text-text-secondary truncate max-w-[150px]">
                  {user.name}
                </span>
              </div>
              <LogoutButton className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-danger/5 hover:text-danger hover:border-danger/30 transition-colors" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-text-primary hover:text-primary px-3 py-2 transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                S&apos;inscrire
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar, NavbarSkeleton } from "@/shared/components/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Congo",
  description:
    "Découvrez les événements de Brazzaville et Pointe-Noire et réservez vos tickets en ligne.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-text-primary">
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}

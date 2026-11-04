import Image from "next/image";
import { ButtonLink } from "@/shared/components/button-link";

function HeroTicket() {
  return (
    <div
      role="img"
      aria-label="Exemple de ticket : Nuit de la Rumba, VIP, 15 000 FCFA"
      className="relative mx-auto w-full max-w-[500px] py-8 lg:mx-0 lg:w-[480px] lg:shrink-0"
    >
      <div className="absolute inset-x-6 top-2 bottom-14 rotate-[5deg] rounded-lg bg-text-primary" />

      <div className="relative flex -rotate-3 rounded-lg bg-surface shadow-hover">
        <div className="flex-1 p-5 sm:p-7">
          <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-bold">
            Concert
          </span>
          <p className="mt-4 mb-2 text-2xl leading-none font-extrabold tracking-tight sm:text-[34px]">
            Nuit de la Rumba
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">
            Sam. 14 nov. · 20h30
            <br />
            Institut français, Brazzaville
          </p>
          <dl className="mt-5 flex gap-7">
            <div>
              <dt className="text-[11px] font-bold tracking-widest text-text-secondary">TYPE</dt>
              <dd className="font-extrabold">VIP</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold tracking-widest text-text-secondary">PRIX</dt>
              <dd className="font-extrabold">15 000 FCFA</dd>
            </div>
          </dl>
        </div>

        <div className="relative my-4 border-l-2 border-dashed border-border before:absolute before:-top-[27px] before:-left-3 before:size-[22px] before:rounded-full before:bg-background after:absolute after:-bottom-[27px] after:-left-3 after:size-[22px] after:rounded-full after:bg-background" />

        <div className="flex flex-col items-center justify-between gap-3 p-5 sm:p-6">
          <Image src="/qr-exemple.svg" alt="" width={104} height={104} className="size-20 sm:size-26" />
          <span className="text-[11px] font-bold tracking-widest text-text-secondary">
            N° 0042-BZV
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="mx-auto flex max-w-content flex-col gap-8 px-4 pt-10 pb-14 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pt-24 lg:pb-26">
      <div className="lg:max-w-[600px]">
        <h1 className="text-[40px] leading-none font-extrabold tracking-[-0.035em] sm:text-6xl xl:text-7xl">
          Découvrez les événements qui font{" "}
          <span className="text-primary-hover">vibrer</span> le Congo.
        </h1>
        <p className="mt-6 max-w-[500px] text-base leading-relaxed text-text-secondary sm:text-lg">
          Concerts, festivals, conférences et matchs. Trouvez votre prochaine
          sortie et réservez vos tickets en quelques clics.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/evenements">Explorer les événements</ButtonLink>
          <ButtonLink href="/evenements/nouveau" variant="secondary">
            Organiser un événement
          </ButtonLink>
        </div>
      </div>

      <HeroTicket />
    </section>
  );
}

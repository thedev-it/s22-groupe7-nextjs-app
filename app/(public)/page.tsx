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

function Hero() {
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

const steps = [
  {
    title: "Trouvez votre sortie",
    text: "Filtrez par ville, catégorie et date. Brazzaville ou Pointe-Noire.",
  },
  {
    title: "Réservez vos places",
    text: "Standard ou VIP, la quantité, et c’est payé. Jamais plus de places que prévu.",
  },
  {
    title: "Présentez votre QR code",
    text: "Votre ticket vous attend dans « Mes tickets ». Un scan à l’entrée, c’est tout.",
  },
];

function Steps() {
  return (
    <section className="mx-auto max-w-content px-4 pb-14 md:px-8 lg:pb-26">
      <div className="mb-7 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-[560px] text-3xl leading-tight font-extrabold tracking-[-0.03em] md:text-[44px] md:leading-none">
          De l’affiche à l’entrée, en trois étapes.
        </h2>
        <p className="max-w-[340px] text-[15px] leading-relaxed text-text-secondary">
          Pas de file au guichet, pas de billet papier perdu.
        </p>
      </div>

      <ol className="flex flex-col rounded-lg bg-surface shadow-hover md:flex-row">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex-1 border-dashed border-border p-6 not-first:border-t-2 md:px-9 md:py-10 md:not-first:border-t-0 md:not-first:border-l-2 md:not-first:before:absolute md:not-first:before:-top-[11px] md:not-first:before:-left-3 md:not-first:before:size-[22px] md:not-first:before:rounded-full md:not-first:before:bg-background md:not-first:after:absolute md:not-first:after:-bottom-[11px] md:not-first:after:-left-3 md:not-first:after:size-[22px] md:not-first:after:rounded-full md:not-first:after:bg-background"
          >
            <span className="text-[28px] leading-none font-extrabold text-primary-hover">
              0{index + 1}
            </span>
            <h3 className="mt-4 mb-2 text-xl font-extrabold">{step.title}</h3>
            <p className="text-[15px] leading-relaxed text-text-secondary">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
    </>
  );
}

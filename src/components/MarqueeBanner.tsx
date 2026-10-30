import { clubPlans, site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

const lowestClubPrice = Math.min(...clubPlans.map((plan) => plan.priceMonthly));

const facts = [
  "Free vacuums & air",
  `${site.hours.days} 8am–8pm`,
  "100% biodegradable soaps & waxes",
  "Reclaimed-water wash system",
  `Unlimited washes from ${formatPrice(lowestClubPrice)}/mo`,
  `${site.address.street.replace(".", "")}, ${site.address.city}`,
];

/** Thin lime strip of brand facts that scrolls continuously (static and wrapping for reduced motion). */
export function MarqueeBanner() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
      {facts.map((fact) => (
        <li key={fact} className="flex items-center whitespace-nowrap px-5 font-heading text-sm font-semibold uppercase tracking-[0.16em] sm:text-base">
          {fact}
          <span aria-hidden className="ml-10 size-2 rounded-full bg-secondary" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Highlights" className="mt-6 overflow-hidden bg-accent py-3.5 text-accent-foreground sm:mt-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        {row(false)}
        <div className="motion-reduce:hidden">{row(true)}</div>
      </div>
    </section>
  );
}

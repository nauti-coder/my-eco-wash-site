import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PlanCard, type PlanCardTone } from "@/components/PlanCard";
import { PricingClubLink, PricingToggle } from "@/components/PricingToggle";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  allServices,
  clubPlans,
  membership,
  planIncludes,
  routes,
  singleWashes,
  site,
  type ClubPlan,
  type PlanId,
} from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

/** Each tier gets its own fill; the color climbs with the price. */
const toneByPlan: Record<PlanId, PlanCardTone> = {
  "wheel-and-clean": "soft",
  "the-ultimate": "lime",
  "manager-special": "navy",
};

/**
 * Desktop cascade, cheapest → priciest. Cards share a bottom edge (grid stretch), so every step up
 * makes the next card taller and Manager Special the tallest, with the Join buttons lined up.
 */
const cascade = ["lg:mt-48", "lg:mt-24", "lg:mt-0"];

const plansByPrice = [...clubPlans].sort((a, b) => a.priceMonthly - b.priceMonthly);

/** In-page anchor of a package card; the single-wash upsells jump to it. */
const packageCardId = (planId: PlanId) => `package-${planId}`;

export function Pricing() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="scroll-mt-16 bg-background py-16 sm:py-24">
      <div className="container-px">
        <PricingToggle
          header={
            <Reveal>
              <SectionHeader
                eyebrow={membership.clubName}
                title={
                  <span id="packages-title">
                    Pick your <span className="text-primary">wash package</span>
                  </span>
                }
                intro="Wash once a day for one low monthly fee."
              />
            </Reveal>
          }
          club={<ClubPackages />}
          single={<SingleWashes />}
        />

        <Reveal className="mt-10 sm:mt-14">
          <Link
            href={routes.plans}
            className="group inline-flex min-h-11 items-center gap-2 font-heading text-lg font-semibold text-primary underline-offset-4 hover:underline"
          >
            Compare every service
            <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ClubPackages() {
  return (
    // Data is cheapest-first: flex-col-reverse puts Manager Special on top on mobile; the lg grid keeps cheapest → priciest.
    <ul role="list" className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
      {plansByPrice.map((plan, index) => (
        <Reveal as="li" key={plan.id} delay={index * 120} className={cn("flex flex-col", cascade[index])}>
          <PlanCard
            plan={plan}
            tone={toneByPlan[plan.id]}
            // Only true for a plan that really includes every service we list.
            label={allServices.every((service) => planIncludes(plan, service)) ? "Everything we offer" : undefined}
            id={packageCardId(plan.id)}
            className="flex-1 scroll-mt-28"
          />
        </Reveal>
      ))}
    </ul>
  );
}

function SingleWashes() {
  return (
    <div>
      <ul role="list" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {singleWashes.map((wash, index) => (
          <Reveal as="li" key={wash.id} delay={index * 80} className="flex">
            <SingleWashTicket
              name={wash.name}
              plan={clubPlans.find((plan) => plan.id === wash.clubPlanId)}
              // Same tier, same color as its club card.
              featured={wash.clubPlanId !== null && toneByPlan[wash.clubPlanId] === "navy"}
            />
          </Reveal>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-muted-foreground">Buy single washes at our automated pay kiosk on site.</p>
        <a
          href={site.maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-1.5 font-heading font-semibold text-primary underline-offset-4 hover:underline"
        >
          Get Directions
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

/** A single wash drawn as a one-off ticket (the club is the pass). No prices: none are published. */
function SingleWashTicket({ name, plan, featured }: { name: string; plan?: ClubPlan; featured: boolean }) {
  const edge = featured ? "border-navy" : "border-border";

  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-md border",
        featured ? "bg-navy text-white" : "bg-card text-secondary",
        edge,
      )}
    >
      <div className="p-4 sm:p-6">
        <h3
          className={cn(
            "text-lg font-bold uppercase leading-[1.05] sm:text-2xl",
            featured ? "text-white" : "text-secondary",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-2 font-heading text-xs font-semibold uppercase tracking-[0.18em]",
            featured ? "text-lime" : "text-primary",
          )}
        >
          Express wash
        </p>
      </div>

      {/* Perforation with punched notches on both edges. */}
      <div aria-hidden className="relative mt-auto">
        <span
          className={cn(
            "absolute -left-px top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-r-full border border-l-0 bg-background",
            edge,
          )}
        />
        <span
          className={cn("mx-4 block border-t-2 border-dashed sm:mx-5", featured ? "border-white/25" : "border-border")}
        />
        <span
          className={cn(
            "absolute -right-px top-1/2 h-5 w-2.5 -translate-y-1/2 rounded-l-full border border-r-0 bg-background",
            edge,
          )}
        />
      </div>

      {plan ? (
        <PricingClubLink
          href={`${routes.plans}#${plan.id}`}
          cardId={packageCardId(plan.id)}
          className={cn(
            "group block rounded-b-md p-4 focus-visible:ring-inset focus-visible:ring-offset-0 sm:p-6",
            featured && "focus-visible:ring-lime",
          )}
        >
          <span className={cn("block text-sm", featured ? "text-white/75" : "text-muted-foreground")}>
            Wash every day:
          </span>
          <span
            className={cn(
              "mt-0.5 block font-heading text-[0.95rem] font-semibold leading-snug underline-offset-4 group-hover:underline",
              featured ? "text-lime" : "text-primary",
            )}
          >
            {plan.name} club for {formatPrice(plan.priceMonthly)}
            <span aria-hidden>/mo</span>
            <span className="sr-only"> a month</span>
            <ArrowRight
              aria-hidden
              className="ml-1 inline size-4 align-[-0.15em] transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </PricingClubLink>
      ) : (
        <p className="p-4 text-sm text-muted-foreground sm:p-6">Our entry-level express wash</p>
      )}
    </div>
  );
}

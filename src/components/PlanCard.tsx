import Link from "next/link";
import { CheckBadge } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { routes, type ClubPlan } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export type PlanCardTone = "soft" | "lime" | "navy";

type ToneStyles = {
  card: string;
  /** Headings need their own color: globals.css sets text-foreground on h1–h6. */
  title: string;
  muted: string;
  divider: string;
  check: string;
  label: string;
  cta: "default" | "secondary";
  details: string;
};

/** One full fill per tier, so the hierarchy reads from color alone (soft → lime → navy). */
const toneStyles: Record<PlanCardTone, ToneStyles> = {
  soft: {
    card: "border-primary/15 bg-indigo-soft text-secondary",
    title: "text-secondary",
    muted: "text-secondary/75",
    divider: "border-primary/15",
    check: "text-primary",
    label: "bg-primary text-primary-foreground",
    cta: "default",
    details: "text-primary decoration-primary/30 hover:decoration-primary",
  },
  lime: {
    card: "border-transparent bg-lime text-secondary",
    title: "text-secondary",
    muted: "text-secondary",
    divider: "border-secondary/20",
    check: "text-secondary",
    label: "bg-secondary text-secondary-foreground",
    // Indigo instead of lime, so the CTA doesn't disappear into the card.
    cta: "secondary",
    details: "text-secondary decoration-secondary/40 hover:decoration-secondary",
  },
  navy: {
    card: "border-transparent bg-navy text-white",
    title: "text-white",
    muted: "text-white/75",
    divider: "border-white/15",
    // Lime badge with a navy tick (the icon's default white tick washes out on lime).
    check: "text-lime [&_path]:stroke-secondary",
    label: "bg-lime text-accent-foreground",
    cta: "default",
    details: "text-white decoration-white/40 hover:decoration-white",
  },
};

export type PlanCardProps = {
  plan: ClubPlan;
  /** Card fill. Give each tier its own tone. */
  tone?: PlanCardTone;
  /** Flat label above the name, e.g. "Everything we offer". Only use claims the data backs up (no "Most popular"). */
  label?: string;
  /** Anchor id for in-page links; also used as the focus target. */
  id?: string;
  headingLevel?: "h2" | "h3";
  /** "Plan details" link to /unlimited-wash-plans#<plan id>. Turn off on the plans page itself. */
  showDetailsLink?: boolean;
  className?: string;
};

/**
 * Unlimited Eco Wash Club package card: name, monthly price, every included service, Join CTA.
 * Sizes to its container: the service list flows into extra columns only when the card is wide.
 */
export function PlanCard({
  plan,
  tone = "soft",
  label,
  id,
  headingLevel: Heading = "h3",
  showDetailsLink = true,
  className,
}: PlanCardProps) {
  const styles = toneStyles[tone];
  const titleId = `${id ?? `plan-${plan.id}`}-title`;

  return (
    <article
      id={id}
      aria-labelledby={titleId}
      className={cn(
        "flex flex-col rounded-[1.5rem] border p-6 shadow-[0_2px_6px_-2px_hsl(var(--secondary)/0.12)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_28px_48px_-30px_hsl(var(--secondary)/0.55)] motion-safe:hover:-translate-y-1 sm:p-8",
        styles.card,
        className,
      )}
    >
      {label ? (
        <p
          className={cn(
            "mb-5 w-fit rounded-[0.375rem] px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.16em]",
            styles.label,
          )}
        >
          {label}
        </p>
      ) : null}

      <Heading id={titleId} className={cn("text-2xl font-bold uppercase leading-[1.05]", styles.title)}>
        {plan.name}
      </Heading>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 font-heading">
        <span className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl">
          {formatPrice(plan.priceMonthly)}
        </span>
        <span className={cn("text-base font-medium", styles.muted)}>
          <span aria-hidden>/month</span>
          <span className="sr-only"> per month</span>
        </span>
      </p>
      <p className={cn("mt-3 font-heading text-sm font-medium", styles.muted)}>Unlimited washes · once a day</p>

      <ul role="list" className={cn("mt-6 columns-[14rem] gap-x-8 border-t pt-4", styles.divider)}>
        {plan.services.map((service) => (
          <li key={service} className="flex break-inside-avoid items-start gap-3 py-1.5 text-[0.95rem] leading-6">
            <CheckBadge className={cn("mt-0.5 size-5 shrink-0", styles.check)} />
            {service}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex w-full max-w-sm flex-col pt-8">
        <Link
          href={`${routes.join}?plan=${plan.id}`}
          className={cn(
            buttonVariants({ variant: styles.cta, size: "lg" }),
            "h-auto min-h-14 w-full whitespace-normal px-5 py-3 text-center leading-tight",
          )}
        >
          Join {plan.name}
        </Link>
        {showDetailsLink ? (
          <Link
            href={`${routes.plans}#${plan.id}`}
            className={cn(
              "mt-1 inline-flex min-h-11 items-center self-center font-heading text-sm font-semibold underline underline-offset-4 transition-colors",
              styles.details,
            )}
          >
            Plan details<span className="sr-only"> for {plan.name}</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

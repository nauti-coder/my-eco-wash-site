import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CheckBadge } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/lib/media";
import { clubPlans, membership, routes, site } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Join the Unlimited Eco Wash Club",
  description: "Join the My Eco Wash Unlimited Eco Wash Club: online, at the pay kiosk, or with our team. Plans from $24.99 a month.",
};

/**
 * Mirrors the original site's sign-up page. The original embedded an external checkout whose URL wasn't captured,
 * so online sign-up only appears once `membership.onlineSignupUrl` is set (or swap in the Nautilus checkout drawer).
 */
export default async function JoinPage({ searchParams }: { searchParams: Promise<{ plan?: string | string[] }> }) {
  const params = await searchParams;
  const requested = Array.isArray(params.plan) ? params.plan[0] : params.plan;
  const selected = clubPlans.find((plan) => plan.id === requested) ?? clubPlans[clubPlans.length - 1];
  const ways = membership.waysToJoin.filter((way) => way.title !== "Online" || membership.onlineSignupUrl);

  return (
    <>
      <PageHeader
        tone="navy"
        eyebrow="Sign up, save & wash every day"
        title={
          <>
            Join the <span className="text-accent">Unlimited Eco Wash Club</span>
          </>
        }
        aside={
          <Image
            src={media.vacuums.src}
            alt={media.vacuums.alt}
            width={media.vacuums.width}
            height={media.vacuums.height}
            sizes="(min-width: 1024px) 34vw, 100vw"
            priority
            className="aspect-[4/3] w-full rotate-[2deg] rounded-xl border-[5px] border-white object-cover object-[30%_40%] lg:aspect-[4/5]"
          />
        }
        intro="Wash your vehicle once a day for one flat monthly fee. Pick a package, then join the way that suits you."
      />

      <section aria-labelledby="choose-title" className="container-px grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 id="choose-title" className="font-heading text-3xl font-bold uppercase leading-none sm:text-4xl">
            1. Choose your package
          </h2>
          <ul className="mt-6 grid gap-3">
            {[...clubPlans].reverse().map((plan) => {
              const active = plan.id === selected.id;
              return (
                <li key={plan.id}>
                  <Link
                    href={`${routes.join}?plan=${plan.id}`}
                    scroll={false}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex min-h-16 items-center justify-between gap-4 rounded-lg border-2 px-5 py-4 transition-colors",
                      active ? "border-primary bg-indigo-soft" : "border-border bg-card hover:border-primary/60",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={cn("grid size-6 place-items-center rounded-full border-2", active ? "border-primary" : "border-border")}
                      >
                        {active ? <span className="size-3 rounded-full bg-primary" /> : null}
                      </span>
                      <span className="font-heading text-lg font-bold uppercase">{plan.name}</span>
                    </span>
                    <span className="font-heading font-semibold text-muted-foreground">{formatPrice(plan.priceMonthly)}/mo</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal className="rounded-lg bg-navy p-6 text-white sm:p-10">
          <p className="eyebrow text-accent">Your package</p>
          <h3 className="mt-3 font-heading text-4xl font-extrabold uppercase leading-none text-white">{selected.name}</h3>
          <p className="mt-3 font-heading text-2xl font-semibold text-white">
            {formatPrice(selected.priceMonthly)}
            <span className="text-base font-medium text-white/70"> / month · unlimited washes, once a day</span>
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {selected.services.map((service) => (
              <li key={service} className="flex items-center gap-3 text-white/90">
                <CheckBadge className="size-5 shrink-0 text-accent" /> {service}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="how-join-title" className="container-px pb-16 sm:pb-24">
        <h2 id="how-join-title" className="font-heading text-3xl font-bold uppercase leading-none sm:text-4xl">
          2. Join your way
        </h2>
        <ul className={cn("mt-6 grid gap-4", ways.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
          {ways.map((way, index) => (
            <Reveal as="li" key={way.title} delay={index * 100} className="flex flex-col rounded-lg border border-border bg-card p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-bold">{way.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{way.body}</p>
              <div className="mt-6">
                {way.title === "Online" && membership.onlineSignupUrl ? (
                  <a href={membership.onlineSignupUrl} className={buttonVariants({ className: "w-full" })}>
                    Sign up for {selected.name} <ArrowRight aria-hidden />
                  </a>
                ) : null}
                {way.title === "At the pay kiosk" ? (
                  <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "w-full" })}>
                    <MapPin aria-hidden /> Get Directions
                  </a>
                ) : null}
                {way.title === "With our team" ? (
                  <a href={site.phone.href} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    <Phone aria-hidden /> Call {site.phone.display}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 rounded-lg bg-lime-soft p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold uppercase">3. What happens next?</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-accent-foreground/85">
            After your first payment, visit us at My Eco Wash and we&rsquo;ll place your RFID sticker on the inside of your front windshield. From
            then on, the pay kiosk scans it automatically and you roll straight into the wash.{" "}
            <Link href={routes.clubTerms} className="font-semibold text-secondary underline underline-offset-4">
              Club terms
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}

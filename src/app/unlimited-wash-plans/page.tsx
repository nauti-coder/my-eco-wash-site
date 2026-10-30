import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Minus, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PlanCard, type PlanCardTone } from "@/components/PlanCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/lib/media";
import { allServices, clubFacts, clubPlans, clubTerms, planIncludes, routes, singleWashes, site } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unlimited Wash Plans",
  description:
    "Unlimited Eco Wash Club memberships at My Eco Wash in Pembroke Pines: Wheel & Clean $24.99, The Ultimate $32.99 and Manager Special $39.99 a month. Wash once a day.",
};

const tones: Record<string, PlanCardTone> = { "wheel-and-clean": "soft", "the-ultimate": "lime", "manager-special": "navy" };

export default function PlansPage() {
  return (
    <>
      <PageHeader
        tone="navy"
        eyebrow="Unlimited Eco Wash Club"
        title={
          <>
            Wash once a day for <span className="text-accent">one low monthly fee</span>
          </>
        }
        aside={
          <Image
            src={media.tunnel.src}
            alt={media.tunnel.alt}
            width={media.tunnel.width}
            height={media.tunnel.height}
            sizes="(min-width: 1024px) 34vw, 100vw"
            priority
            className="aspect-[4/3] w-full rotate-[2deg] rounded-xl border-[5px] border-white object-cover object-center lg:aspect-[4/5]"
          />
        }
        intro="If you like a clean car and want to wash it once a day, once a week, or as often as you can, all for one low price, then the Unlimited Eco Wash Club is for you! Simply select the desired wash package, and your credit card will be charged a flat monthly fee."
      >
        <Link href={routes.join} className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
          Join the Club
        </Link>
        <Link href="#compare" className={buttonVariants({ variant: "outline-light", size: "lg", className: "w-full sm:w-auto" })}>
          Compare services
        </Link>
      </PageHeader>

      {/* Plans */}
      <section aria-labelledby="plans-title" className="container-px py-16 sm:py-24">
        <h2 id="plans-title" className="sr-only">
          Club packages
        </h2>
        <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
          {clubPlans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 120} className="scroll-mt-28" id={plan.id}>
              <PlanCard
                plan={plan}
                tone={tones[plan.id]}
                headingLevel="h3"
                showDetailsLink={false}
                label={plan.id === "manager-special" ? "Everything we offer" : undefined}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section id="compare" aria-labelledby="compare-title" className="scroll-mt-24 pb-16 sm:pb-24">
        <div className="container-px">
          <SectionHeader eyebrow="Side by side" title={<span id="compare-title">Compare every service</span>} />
          <Reveal className="relative mt-10 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Services included in each Unlimited Eco Wash Club package</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="sticky left-0 z-10 bg-card p-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:p-6">
                    Service
                  </th>
                  {clubPlans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={cn("p-4 text-center font-heading sm:p-6", plan.id === "manager-special" && "bg-navy text-white")}
                    >
                      <span className="block text-base font-bold uppercase leading-tight sm:text-lg">{plan.name}</span>
                      <span className={cn("mt-1 block text-sm font-medium", plan.id === "manager-special" ? "text-white/75" : "text-muted-foreground")}>
                        {formatPrice(plan.priceMonthly)}/mo
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allServices.map((service) => (
                  <tr key={service} className="border-b border-border last:border-0">
                    <th scope="row" className="sticky left-0 z-10 bg-card p-4 text-base font-normal sm:px-6">
                      {service}
                    </th>
                    {clubPlans.map((plan) => (
                      <td key={plan.id} className={cn("p-4 text-center sm:px-6", plan.id === "manager-special" && "bg-navy/[0.06]")}>
                        {planIncludes(plan, service) ? (
                          <Check aria-label="Included" className="mx-auto size-6 rounded-full bg-accent p-1 text-accent-foreground" strokeWidth={3} />
                        ) : (
                          <Minus aria-label="Not included" className="mx-auto size-5 text-border" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="sticky left-0 bg-card p-4 sm:p-6" />
                  {clubPlans.map((plan) => (
                    <td key={plan.id} className={cn("p-4 text-center sm:p-6", plan.id === "manager-special" && "bg-navy/[0.06]")}>
                      <Link
                        href={`${routes.join}?plan=${plan.id}`}
                        className={buttonVariants({ size: "sm", variant: plan.id === "manager-special" ? "default" : "outline" })}
                      >
                        Join<span className="sr-only"> {plan.name}</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="pb-16 sm:pb-24">
        <div className="container-px grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <SectionHeader eyebrow="How it works" title={<span id="how-title">Drive up, scan, roll through</span>} />
            <Reveal className="mt-8 rounded-lg bg-lime-soft p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold uppercase">What happens next?</h3>
              <p className="mt-3 text-pretty leading-relaxed text-accent-foreground/85">
                After your first payment is made, please visit us at My Eco Wash to place your RFID sticker onto your vehicle&rsquo;s windscreen. For
                more information, please call or visit us, and our staff will be very happy to assist you.
              </p>
              <a href={site.phone.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-heading font-semibold text-secondary underline-offset-4 hover:underline">
                <Phone aria-hidden className="size-4" /> {site.phone.display}
              </a>
            </Reveal>
          </div>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {clubFacts.map((fact, index) => (
              <Reveal as="li" key={fact.title} delay={index * 100} className={cn(index % 2 === 1 && "sm:mt-14")}>
                <span aria-hidden className="font-heading text-7xl font-extrabold leading-none text-primary/20">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold">{fact.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{fact.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Single washes + terms */}
      <section aria-labelledby="single-title" className="pb-16 sm:pb-24">
        <div className="container-px grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <Reveal className="rounded-lg border border-border bg-card p-6 sm:p-10">
            <p className="eyebrow">Pay as you go</p>
            <h2 id="single-title" className="mt-3 font-heading text-3xl font-bold uppercase leading-none sm:text-4xl">
              Single washes
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Not ready for the club? Buy a single express wash at our automated pay kiosk on site.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {singleWashes.map((wash) => (
                <li key={wash.id} className="rounded-full bg-indigo-soft px-4 py-2 font-heading text-sm font-semibold text-secondary">
                  {wash.name}
                </li>
              ))}
            </ul>
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", className: "mt-8 w-full sm:w-auto" })}
            >
              <MapPin aria-hidden /> Get Directions
            </a>
          </Reveal>

          <Reveal id="terms" delay={120} className="scroll-mt-28 rounded-lg bg-indigo-soft p-6 sm:p-10">
            <p className="eyebrow">Terms &amp; conditions</p>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-none sm:text-4xl">Club terms at a glance</h2>
            <ul className="mt-6 grid gap-3">
              {clubTerms.map((term) => (
                <li key={term} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
            {/* TODO: link the full Unlimited Eco Wash Club Terms & Conditions document once the owner provides it. */}
            <p className="mt-6 text-sm text-muted-foreground">
              Questions about your membership?{" "}
              <Link href={routes.contact} className="font-semibold text-primary underline underline-offset-4">
                Contact us
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

import { Clock, MapPin, Navigation, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** One row of the visit card: an icon chip (labelled for screen readers) beside the detail. */
function Detail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <dt className="shrink-0">
        <span className="flex size-10 items-center justify-center rounded-full bg-indigo-soft text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="min-w-0 self-center leading-snug">{children}</dd>
    </div>
  );
}

/** Single-location "visit us" block: address, hours and phone on a white card beside the Google map. */
export function VisitUs() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="scroll-mt-20 bg-background py-20 sm:py-24">
      <div className="container-px grid gap-6 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:gap-8">
        <Reveal>
          <Card className="flex h-full flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">Visit us</p>
              <p className="rounded-full bg-accent px-3 py-1 font-heading text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground">
                Free vacuums &amp; air
              </p>
            </div>
            <h2
              id="visit-heading"
              className="mt-4 text-balance text-3xl font-bold uppercase leading-[0.95] text-navy sm:text-4xl"
            >
              Located in {site.address.city}, Florida
            </h2>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
              <Detail icon={MapPin} label="Address">
                <address className="not-italic">
                  <span className="block font-heading text-lg font-semibold text-foreground">{site.address.street}</span>
                  <span className="block text-muted-foreground">
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </address>
              </Detail>
              <Detail icon={Clock} label="Hours">
                <p className="font-heading text-lg font-semibold text-foreground">
                  {site.hours.days}
                  <span className="block">{site.hours.time}</span>
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{site.hours.closures}</p>
              </Detail>
              <Detail icon={Phone} label="Phone">
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center font-heading text-lg font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {site.phone.display}
                </a>
              </Detail>
            </dl>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
              <a
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "w-full sm:w-auto")}
              >
                <Navigation aria-hidden />
                Get Directions
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={site.phone.href} className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
                <Phone aria-hidden />
                Call us
              </a>
            </div>
          </Card>
        </Reveal>

        <Reveal
          delay={150}
          className="relative isolate h-[300px] overflow-hidden rounded-md bg-muted sm:h-[360px] lg:h-auto lg:min-h-[420px]"
        >
          <iframe
            src={site.maps.embed}
            title="Map of My Eco Wash at 18440 Pines Blvd"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, email or visit My Eco Wash at 18440 Pines Blvd, Pembroke Pines, FL. Open every day 8am–8pm.",
};

const methods = [
  { icon: Phone, label: "Call", value: site.phone.display, href: site.phone.href, external: false },
  { icon: Mail, label: "Email", value: site.email.display, href: site.email.href, external: false },
  { icon: MapPin, label: "Visit", value: site.address.full, href: site.maps.directions, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title={
          <>
            We&rsquo;re on <span className="text-primary">Pines Blvd</span>, every day
          </>
        }
        intro={`${site.hours.days}, ${site.hours.time}. ${site.hours.closures}`}
      />

      <section aria-label="Ways to reach us" className="container-px grid gap-6 pb-16 pt-8 sm:pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid content-start gap-4">
          {methods.map((method, index) => (
            <Reveal key={method.label} delay={index * 100}>
              <a
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group flex min-h-20 items-center gap-5 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary sm:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-indigo-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <method.icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="eyebrow block">{method.label}</span>
                  <span className="mt-1 block font-heading text-lg font-semibold sm:text-xl">{method.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={300} className="flex items-center gap-5 rounded-lg bg-lime-soft p-5 sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Clock aria-hidden className="size-5" />
            </span>
            <span>
              <span className="block font-heading text-lg font-semibold">{site.hours.days}</span>
              <span className="block text-accent-foreground/80">{site.hours.time}</span>
            </span>
          </Reveal>
        </div>
        <Reveal delay={150} className="overflow-hidden rounded-lg bg-muted">
          <iframe
            src={site.maps.embed}
            title="Map of My Eco Wash at 18440 Pines Blvd"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-full sm:min-h-[460px]"
          />
        </Reveal>
      </section>

      <section id="membership" aria-labelledby="membership-title" className="scroll-mt-24 bg-navy text-white">
        <div className="container-px grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow text-accent">Members</p>
            <h2 id="membership-title" className="mt-4 font-heading text-4xl font-bold uppercase leading-none text-white sm:text-5xl">
              Manage my membership
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
              Changing your vehicle, your package or cancelling? Our team takes care of it — give us a call or stop by the wash.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phone.href} className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
                <Phone aria-hidden /> {site.phone.display}
              </a>
              <a href={site.email.href} className={buttonVariants({ variant: "outline-light", size: "lg", className: "w-full sm:w-auto" })}>
                <Mail aria-hidden /> Email us
              </a>
            </div>
          </div>
          <ul className="grid gap-4">
            {[
              {
                title: "New vehicle?",
                body: "Memberships are tied to one vehicle. Contact us to update your vehicle profile and have a new RFID decal installed.",
              },
              {
                title: "Cancelling",
                body: "Cancel any time up to 14 days before your monthly recharge date. Ask for a cancellation form at the store or give us a call, and keep washing through the end of your last paid month.",
              },
              {
                title: "Billing",
                body: "Your card is charged month-to-month on the date your membership started. No long-term commitments or hidden cancellation charges.",
              },
            ].map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 100} className="rounded-lg bg-white/[0.07] p-6">
                <h3 className="font-heading text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{item.body}</p>
              </Reveal>
            ))}
            <li className="text-white/75">
              Not a member yet?{" "}
              <Link href={routes.join} className="font-semibold text-accent underline underline-offset-4">
                Join the Unlimited Eco Wash Club
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

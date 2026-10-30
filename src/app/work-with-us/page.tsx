import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/lib/media";
import { careers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description: "My Eco Wash is hiring in Pembroke Pines, FL: Sales Agent and Express Crew Member roles.",
};

// Restates the original page's own intro as three short points.
const values = [
  { title: "We invest in you", body: "Recruiting, developing and training people who are passionate about their work." },
  { title: "Detail matters", body: "Detail-oriented team players who take pride in a spotless result." },
  { title: "Safe, fast, friendly", body: "Serving customers in a safe, fast and friendly environment every day." },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHeader tone="lime" eyebrow={careers.eyebrow} title={careers.title} intro={careers.intro} />

      <section aria-labelledby="roles-title" className="container-px py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <Image
              src={media.conveyor.src}
              alt={media.conveyor.alt}
              width={media.conveyor.width}
              height={media.conveyor.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-md object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <p className="absolute -bottom-4 right-4 rotate-[-4deg] rounded-md bg-navy px-4 py-2 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[4px_4px_0_0_hsl(var(--accent))]">
              {site.address.city}, {site.address.state}
            </p>
          </Reveal>

          <div>
            <h2 id="roles-title" className="font-heading text-4xl font-bold uppercase leading-none sm:text-5xl">
              Open roles
            </h2>
            <ul className="mt-8 grid gap-4">
              {careers.roles.map((role, index) => (
                <Reveal as="li" key={role.title} delay={index * 120}>
                  <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div>
                      <h3 className="font-heading text-2xl font-bold">{role.title}</h3>
                      <p className="mt-1 text-muted-foreground">
                        {site.address.street} · {site.address.city}
                      </p>
                    </div>
                    <a href={role.applyHref} className={buttonVariants({ className: "w-full sm:w-auto" })}>
                      <Mail aria-hidden /> Apply<span className="sr-only"> for {role.title}</span>
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              Questions about working here? Call{" "}
              <a href={site.phone.href} className="font-semibold text-primary underline underline-offset-4">
                {site.phone.display}
              </a>{" "}
              or email{" "}
              <a href={site.email.href} className="font-semibold text-primary underline underline-offset-4">
                {site.email.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-navy text-white">
        <div className="container-px grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_2fr]">
          <h2 id="values-title" className="font-heading text-4xl font-bold uppercase leading-none text-white">
            What we look for
          </h2>
          <ul className="grid gap-8 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 100}>
                <span aria-hidden className="block h-1 w-12 rounded-full bg-accent" />
                <h3 className="mt-4 font-heading text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-px flex flex-col gap-4 py-14 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-heading text-xl font-semibold">Want to see the wash first? Stop by any day, 8am–8pm.</p>
        <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}>
          Get Directions <ArrowUpRight aria-hidden />
        </a>
      </section>
    </>
  );
}

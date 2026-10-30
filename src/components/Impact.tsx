import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { routes, story } from "@/lib/site";
import { cn } from "@/lib/utils";

/** On desktop each pillar starts a step lower than the one before it, like the original's 1 / 2 / 3. */
const pillarSteps = ["lg:mt-0", "lg:mt-20", "lg:mt-40"];

/**
 * The reclaimed-water figure is read out of pillar 1's copy so the number only lives in site.ts.
 * Group 1 is the copy's "over" qualifier (kept so the stat says exactly what the site says), group 2 the figure.
 */
const reclaimedWater = /\b(over\s+)?([\d,]+)\s+liters\b/i.exec(story.pillars[0].body);

/** Lime focus ring with a navy offset, so keyboard focus stays visible on the dark block. */
const focusOnNavy = "focus-visible:ring-accent focus-visible:ring-offset-navy";

/** Dark block #1: the original's "Our Mission" and "Our Impact" content on full-bleed navy. */
export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-heading" className="scroll-mt-20 bg-navy py-20 text-white sm:py-24 lg:py-32">
      <div className="container-px">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-accent">Our mission</p>
            <h2
              id="impact-heading"
              className="mt-5 text-balance text-[2.6rem] font-bold uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl"
            >
              Making people feel good about their car
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 lg:self-end">
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{story.mission}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 sm:mt-24 lg:mt-32 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-6">
            <h3 className="text-4xl font-bold uppercase text-white sm:text-5xl">{story.impactTitle}</h3>
            {reclaimedWater ? (
              <p className="mt-10 sm:mt-12">
                {reclaimedWater[1] ? (
                  <>
                    <span className="block font-heading text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                      Over
                    </span>{" "}
                  </>
                ) : null}
                <span className="mt-2 block font-heading text-7xl font-bold leading-[0.85] tracking-tight text-accent sm:text-8xl xl:text-[7rem]">
                  {reclaimedWater[2]}
                </span>{" "}
                <span className="mt-5 block max-w-sm text-balance text-white/75">
                  <span className="font-heading font-semibold uppercase tracking-[0.14em] text-white">Liters</span> of
                  reclaimed water we can store at any one time.
                </span>
              </p>
            ) : null}
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{story.impact}</p>
            <Link
              href={routes.faq}
              className={cn(buttonVariants({ variant: "outline-light" }), focusOnNavy, "mt-8 w-full sm:w-auto")}
            >
              Learn how we wash
              <ArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ol role="list" className="mt-16 grid gap-14 sm:mt-20 lg:mt-24 lg:grid-cols-3 lg:gap-x-12">
          {story.pillars.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.number}
              delay={index * 150}
              className={cn("grid gap-x-8 gap-y-5 sm:grid-cols-[6rem_1fr] lg:block", pillarSteps[index])}
            >
              <span aria-hidden className="block font-heading text-7xl font-bold leading-[0.8] text-white/15 sm:text-8xl lg:text-9xl">
                {pillar.number}
                <span className="ml-[0.05em] inline-block size-[0.13em] rounded-full bg-accent" />
              </span>
              <div className="lg:mt-8">
                <h4 className="text-balance font-heading text-sm font-semibold uppercase leading-snug tracking-[0.18em] text-accent">
                  {pillar.title}
                </h4>
                <p className="mt-3 text-pretty leading-relaxed text-white/75">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

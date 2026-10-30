import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WashFeaturesCarousel, type WashFeatureSlide } from "@/components/WashFeaturesCarousel";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * A short take on story.mission and story.impact. Impact, the next section, prints both in full,
 * so this restates them in fewer words instead of repeating them verbatim. No new facts.
 */
const intro =
  "A spotless, professional car wash every single time, and an eco-friendly one. When you wash with us, you help conserve water through our water-saving technology.";

/** Each description restates a fact from site.ts; the source is noted per slide. */
const slides: WashFeatureSlide[] = [
  {
    // FAQ "How long can I use the vacuums?"; free vacuums & air: site.description and the building sign.
    image: media.vacuums,
    title: "Free vacuums & air",
    description: "Vacuums are free with any wash or membership; on busy days please keep it to 10 minutes.",
    tone: "navy",
    focus: "50% 60%",
  },
  {
    // Services that all three clubPlans include.
    image: media.tunnel,
    title: "Soft-cloth automatic wash",
    description: "Every club plan includes a pre-soak, our soft-cloth wash, a spot-free rinse and Jet Dry.",
    tone: "lime",
    focus: "35% 50%",
  },
  {
    // FAQ "How does the Unlimited Eco Wash Club work?"
    image: media.conveyor,
    title: "Drive up and roll through",
    description: "Members' RFID decals are scanned at the pay kiosk, so you go straight into the tunnel.",
    tone: "navy",
  },
];

/** Compact "why wash with us" split: copy and CTA on the left, photo carousel on the right. */
export function WashFeatures() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-20 bg-background py-20 sm:py-24">
      <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Why wash with us?</p>
          <h2 id="features-heading" className="mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            <span className="block text-balance">Spotless car.</span>
            <span className="block text-balance text-primary">Lighter footprint.</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <Link href="#packages" className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full sm:w-auto")}>
            See Wash Packages
          </Link>
        </Reveal>

        <Reveal delay={150}>
          <WashFeaturesCarousel slides={slides} />
        </Reveal>
      </div>
    </section>
  );
}

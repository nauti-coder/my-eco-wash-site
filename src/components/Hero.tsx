import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/lib/media";
import { clubPlans, site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

const lowestClubPrice = Math.min(...clubPlans.map((plan) => plan.priceMonthly));

/** Asymmetric inset hero: navy card, text bottom-left, real storefront photo bleeding off the right edge. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-[clamp(1.5rem,5vw,5rem)]">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy text-white lg:grid lg:min-h-[640px] lg:grid-cols-[1.12fr_1fr] lg:rounded-[2.25rem]">
        {/* Text column */}
        <div className="relative z-10 flex flex-col justify-end px-6 pb-10 pt-12 sm:px-10 sm:pb-12 lg:px-14 lg:pb-16 lg:pt-20">
          <p className="eyebrow animate-fade-up text-accent">
            {site.address.city} · {site.hours.days} {site.hours.time.replace(/:00 /g, "").replace(" – ", "–")}
          </p>
          <h1
            id="hero-title"
            className="mt-5 animate-fade-up-delay-1 font-heading text-[clamp(4.25rem,17vw,9.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-white"
          >
            Join <span className="text-accent">&amp;</span>
            <br />
            <span className="text-accent">Save</span>
          </h1>
          <p className="mt-6 max-w-md animate-fade-up-delay-2 text-pretty text-lg leading-relaxed text-white/85 sm:text-xl">
            Unlimited Eco Wash Club memberships from{" "}
            <strong className="font-heading font-semibold text-white">{formatPrice(lowestClubPrice)}/month</strong>. Wash once a day, every day, at
            our eco-friendly express wash on Pines Blvd.
          </p>
          <div className="mt-8 flex animate-fade-up-delay-3 flex-col gap-3 sm:flex-row">
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
            >
              <MapPin aria-hidden /> Get Directions
            </a>
            <Link href="#packages" className={buttonVariants({ variant: "outline-light", size: "lg", className: "w-full sm:w-auto" })}>
              See Wash Packages <ArrowDown aria-hidden />
            </Link>
          </div>
        </div>

        {/* Photo column: storefront bleeds to the card edges, vacuums photo layered on top */}
        <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-0">
          <div className="absolute inset-0 animate-scale-in overflow-hidden">
            <Image
              src={media.storefront.src}
              alt={media.storefront.alt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div className="absolute bottom-5 left-5 w-[38%] max-w-[210px] -rotate-[5deg] animate-fade-up-delay-2 rounded-xl border-[5px] border-white bg-white shadow-[0_18px_40px_-18px_hsl(var(--navy-deep)/0.8)] sm:bottom-8 sm:left-8 lg:-left-16 lg:bottom-14 lg:w-[44%] lg:max-w-[230px]">
            <Image
              src={media.vacuums.src}
              alt={media.vacuums.alt}
              width={media.vacuums.width}
              height={media.vacuums.height}
              sizes="230px"
              className="aspect-[4/5] w-full rounded-lg object-cover object-[30%_40%]"
            />
          </div>
          <p className="absolute right-4 top-5 rotate-[6deg] animate-fade-up-delay-3 rounded-md bg-accent px-4 py-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-accent-foreground shadow-[4px_4px_0_0_hsl(var(--navy-deep))] sm:right-8 sm:top-8 sm:text-base">
            Free vacuums &amp; air
          </p>
        </div>
      </div>
    </section>
  );
}

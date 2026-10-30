import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { clubPlans, membership, routes, site, joinCtaHref } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

/** The price range comes from the plan list, so it can never drift from the real prices. */
const monthlyPrices = clubPlans.map((plan) => plan.priceMonthly);
const lowestPrice = Math.min(...monthlyPrices);
const highestPrice = Math.max(...monthlyPrices);

const socialLinks = [
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

const contactLinks = [
  { action: "Call", href: site.phone.href, display: site.phone.display, Icon: Phone },
  { action: "Email", href: site.email.href, display: site.email.display, Icon: Mail },
];

/** Lime focus ring with a navy offset, so keyboard focus stays visible on the dark block. */
const focusOnNavy = "focus-visible:ring-accent focus-visible:ring-offset-navy";

/** Dark block #2, the homepage finale: join the club, or stay connected (replaces the original's newsletter form). */
export function CTABanner() {
  return (
    <section
      id="join-club"
      aria-labelledby="join-club-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy py-20 text-white sm:py-24 lg:py-32"
    >
      {/* One oversized water drop in a deeper blue, cropped by the block: plain geometry for the brand's water idea, not the logo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="container-px relative h-full">
          <div className="absolute -right-28 top-16 size-64 rotate-45 rounded-[0_50%_50%_50%] bg-royal/50 sm:-right-24 sm:size-80 lg:top-28 lg:size-[26rem]" />
        </div>
      </div>

      <div className="container-px relative">
        <Reveal>
          <p className="eyebrow text-accent">{membership.clubName}</p>
          {/* Sizes keep each sentence on one line from sm up ("Pay once a month." is ~9.9em wide in Outfit). */}
          <h2
            id="join-club-heading"
            className="mt-5 text-balance text-[2.75rem] font-bold uppercase leading-[0.9] text-white sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5.5rem] xl:text-[6.5rem]"
          >
            <span className="block">Wash every day.</span> <span className="block">Pay once a month.</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-14 sm:mt-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal delay={150} className="lg:col-span-7">
            {monthlyPrices.length > 0 ? (
              <p className="font-heading text-xl text-white/75 sm:text-2xl">
                Plans from <span className="font-semibold text-white">{formatPrice(lowestPrice)}</span>
                {highestPrice > lowestPrice ? (
                  <>
                    {" "}
                    to <span className="font-semibold text-white">{formatPrice(highestPrice)}</span>
                  </>
                ) : null}{" "}
                a month
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href={joinCtaHref} className={cn(buttonVariants({ size: "lg" }), focusOnNavy, "w-full sm:w-auto")}>
                Join the Club
                <ArrowRight aria-hidden />
              </Link>
              <Link
                href={routes.manageMembership}
                className={cn(buttonVariants({ variant: "outline-light", size: "lg" }), focusOnNavy, "w-full sm:w-auto")}
              >
                Manage My Membership
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={300}
            className="border-t border-white/15 pt-10 lg:col-span-5 lg:col-start-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <h3 className="text-2xl font-bold uppercase text-white">Stay connected</h3>
            <p className="mt-2 text-white/75">Follow along for news and special promotions.</p>
            <ul className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`My Eco Wash on ${social.name} (opens in a new tab)`}
                    className={cn(
                      "grid size-12 place-items-center rounded-full border-2 border-white/30 text-white transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground",
                      focusOnNavy,
                    )}
                  >
                    <social.Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-1">
              {contactLinks.map((contact) => (
                <li key={contact.action}>
                  <a
                    href={contact.href}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-3 font-heading text-lg font-semibold text-white transition-colors hover:text-accent",
                      focusOnNavy,
                    )}
                  >
                    <contact.Icon aria-hidden className="size-5 shrink-0 text-accent" />
                    <span className="sr-only">{contact.action} </span>
                    {contact.display}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

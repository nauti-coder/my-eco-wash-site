import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { media } from "@/lib/media";
import { footerNav, routes, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The global focus ring is indigo on a pale offset; on navy-deep a lime ring reads better. */
const focusRing =
  "focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep";

/**
 * A standalone link as a 44px tap row that hugs its text.
 * -mx-2/px-2 keeps the text aligned with the column while giving the focus ring room.
 */
const rowLink = cn(
  "group -mx-2 flex min-h-11 w-fit min-w-11 items-center rounded-md px-2 py-2.5 text-white/70 transition-colors hover:text-white",
  focusRing,
);

/** Directions and membership read as small calls to action: full white, in the heading face. */
const actionLink = cn(rowLink, "font-heading font-semibold text-white");

const socialLinks = [
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
] as const;

const legalLinks = [
  { label: "Privacy Policy & Terms", href: routes.privacy },
  { label: "FAQ", href: routes.faq },
] as const;

/** Link text with a lime underline that fades in on hover. */
function LinkText({ children }: { children: ReactNode }) {
  return (
    <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-lime">
      {children}
    </span>
  );
}

/** Action label whose trailing arrow stays attached to the last word when a narrow column wraps it. */
function ActionLabel({ label, icon: Icon, nudge }: { label: string; icon: LucideIcon; nudge: string }) {
  const words = label.split(" ");
  const last = words.pop() ?? "";
  return (
    <span>
      {words.length > 0 ? <LinkText>{`${words.join(" ")} `}</LinkText> : null}
      <span className="whitespace-nowrap">
        <LinkText>{last}</LinkText>
        <Icon
          aria-hidden
          className={cn("ml-1.5 inline-block size-4 align-[-0.125em] text-lime transition-transform", nudge)}
        />
      </span>
    </span>
  );
}

function ColumnHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="eyebrow mb-2 text-lime">
      {children}
    </h3>
  );
}

function LinkColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-labelledby={id}>
      <ColumnHeading id={id}>{title}</ColumnHeading>
      <ul role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={rowLink}>
              <LinkText>{link.label}</LinkText>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-labelledby="site-footer-title" className="bg-navy-deep text-[0.9375rem] leading-6 text-white/70">
      <h2 id="site-footer-title" className="sr-only">
        {site.name} footer
      </h2>

      <div className="container-px pt-16 sm:pt-20 lg:pt-24">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-[1.1fr_1.2fr_1.25fr_1.05fr_0.9fr] lg:gap-x-6 xl:gap-x-10">
          {/* Brand: the real logo on a white badge (its blue letters vanish on navy). */}
          <div className="flex flex-col items-start gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:gap-8 lg:col-span-1 lg:flex-col lg:items-start lg:gap-6">
            <Link
              href={routes.home}
              aria-label={`${site.name} home`}
              className={cn("shrink-0 rounded-md bg-white p-3", focusRing)}
            >
              <Image
                src={media.logo.src}
                alt={media.logo.alt}
                width={media.logo.width}
                height={media.logo.height}
                className="h-auto w-24"
              />
            </Link>
            <div>
              <p className="max-w-md text-pretty lg:max-w-xs">
                Eco-friendly express washes in {site.address.city} that leave you feeling good about your car —{" "}
                {site.hours.days.toLowerCase()}.
              </p>
              <ul role="list" className="mt-5 flex gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${name} (opens in a new tab)`}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-lime hover:bg-lime hover:text-navy-deep",
                        focusRing,
                      )}
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ColumnHeading>Visit</ColumnHeading>
            <address className="py-2.5 not-italic">
              {site.address.street}
              <br />
              {site.address.city},{" "}
              <span className="whitespace-nowrap">
                {site.address.state} {site.address.zip}
              </span>
            </address>
            <p className="py-2.5">
              <span className="block font-heading font-medium text-white">{site.hours.days}</span>
              {site.hours.time}
            </p>
            <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={actionLink}>
              <ActionLabel
                label="Get Directions"
                icon={ArrowUpRight}
                nudge="group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">{" (opens in a new tab)"}</span>
            </a>
          </div>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul role="list">
              <li>
                <a href={site.phone.href} className={rowLink}>
                  <span className="sr-only">{"Call "}</span>
                  <LinkText>{site.phone.display}</LinkText>
                </a>
              </li>
              <li>
                <a href={site.email.href} className={rowLink}>
                  <span className="sr-only">{"Email "}</span>
                  <LinkText>{site.email.display}</LinkText>
                </a>
              </li>
              <li>
                <Link href={routes.manageMembership} className={actionLink}>
                  <ActionLabel label="Manage My Membership" icon={ArrowRight} nudge="group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          <LinkColumn id="site-footer-company" title="Company" links={footerNav.company} />
          <LinkColumn id="site-footer-policies" title="Policies" links={footerNav.policies} />
        </div>

        <div className="mt-14 flex flex-col gap-1 border-t border-white/10 pb-8 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-6 lg:mt-20">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul role="list" className="flex flex-wrap gap-x-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group -mx-2 flex min-h-11 min-w-11 items-center rounded-md px-2 transition-colors hover:text-white",
                    focusRing,
                  )}
                >
                  <LinkText>{link.label}</LinkText>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

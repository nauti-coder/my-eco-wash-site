"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { media } from "@/lib/media";
import { mainNav, routes, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function HeaderBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-card transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_hsl(var(--secondary)/0.35)]" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "container-px flex items-center gap-6 transition-[height] duration-300",
          scrolled ? "h-[4.25rem] lg:h-[4.75rem]" : "h-[4.75rem] lg:h-[5.75rem]",
        )}
      >
        <Link href={routes.home} aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src={media.logo.src}
            width={media.logo.width}
            height={media.logo.height}
            alt={media.logo.alt}
            priority
            className={cn("w-auto transition-[height] duration-300", scrolled ? "h-11 lg:h-12" : "h-[3.25rem] lg:h-[3.75rem]")}
          />
        </Link>

        <div className="hidden items-center gap-1 text-muted-foreground xl:flex">
          <SocialLinks className="size-9" />
        </div>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center px-3 font-heading text-[0.98rem] font-medium text-foreground transition-colors hover:text-primary",
                    "after:absolute after:inset-x-3 after:bottom-1.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform hover:after:scale-x-100",
                    isActive(pathname, item.href) && "text-primary after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={routes.manageMembership} className={buttonVariants({ variant: "outline", size: "sm" })}>
            Manage My Membership
          </Link>
          <Link href={routes.join} className={buttonVariants({ size: "sm" })}>
            Join the Club
          </Link>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="ml-auto grid size-11 place-items-center rounded-full bg-muted text-secondary transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu aria-hidden className="size-6" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[60] bg-navy-deep/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:hidden" />
            <Dialog.Content className="fixed inset-x-0 top-0 z-[70] flex max-h-[100dvh] flex-col overflow-y-auto rounded-b-[1.75rem] bg-card pb-6 shadow-xl data-[state=open]:animate-in data-[state=open]:slide-in-from-top-6 data-[state=open]:fade-in-0 lg:hidden">
              <div className="container-px flex h-[4.75rem] items-center justify-between">
                <Image src={media.logo.src} width={media.logo.width} height={media.logo.height} alt={media.logo.alt} className="h-[3.25rem] w-auto" />
                <Dialog.Close
                  className="grid size-11 place-items-center rounded-full bg-muted text-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Close menu"
                >
                  <X aria-hidden className="size-6" />
                </Dialog.Close>
              </div>
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Dialog.Description className="sr-only">Site navigation, membership links and contact details</Dialog.Description>
              <nav aria-label="Mobile" className="container-px">
                <ul className="divide-y divide-border border-y border-border">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-14 items-center justify-between font-heading text-xl font-semibold text-foreground",
                          isActive(pathname, item.href) && "text-primary",
                        )}
                      >
                        {item.label}
                        {isActive(pathname, item.href) ? <span aria-hidden className="size-2.5 rounded-full bg-accent" /> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="container-px mt-6 grid gap-3">
                <Link href={routes.manageMembership} onClick={() => setOpen(false)} className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full" })}>
                  Manage My Membership
                </Link>
                <Link href={routes.join} onClick={() => setOpen(false)} className={buttonVariants({ size: "lg", className: "w-full" })}>
                  Join the Club
                </Link>
              </div>
              <div className="container-px mt-6 grid gap-2 font-heading text-[0.95rem] text-muted-foreground">
                <a href={site.phone.href} className="flex min-h-11 items-center gap-3 text-foreground">
                  <Phone aria-hidden className="size-5 text-primary" /> {site.phone.display}
                </a>
                <p className="flex min-h-11 items-center gap-3">
                  <Clock aria-hidden className="size-5 text-primary" /> {site.hours.days}, {site.hours.time}
                </p>
                <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3">
                  <MapPin aria-hidden className="size-5 text-primary" /> {site.address.full}
                </a>
                <div className="mt-2 flex gap-2 text-secondary">
                  <SocialLinks className="size-11 bg-muted" />
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}

function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: site.social.instagram, label: "My Eco Wash on Instagram (opens in a new tab)", Icon: InstagramIcon },
    { href: site.social.facebook, label: "My Eco Wash on Facebook (opens in a new tab)", Icon: FacebookIcon },
  ];
  return links.map((link) => (
    <a
      key={link.href}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn("grid place-items-center rounded-full transition-colors hover:bg-primary hover:text-primary-foreground", className)}
    >
      <link.Icon className="size-[1.15rem]" />
    </a>
  ));
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { HeaderBar } from "@/components/HeaderBar";

/** Indigo announcement bar (scrolls away) + sticky white header bar. */
export function Header() {
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container-px flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center font-heading text-sm font-medium sm:text-[0.95rem]">
          <span>{site.announcement.text}</span>
          <Link
            href={site.announcement.href}
            className="inline-flex min-h-8 items-center gap-1 font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {site.announcement.cta}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
      <HeaderBar />
    </>
  );
}

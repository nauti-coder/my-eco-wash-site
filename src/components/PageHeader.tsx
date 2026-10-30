import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Short page banner for subpages (the homepage hero is the only full hero).
 * - "navy": inset rounded navy card, echoes the homepage hero at a smaller scale
 * - "lime": full-width lime band
 * - "plain": big type on the canvas
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  tone = "plain",
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "navy" | "lime" | "plain";
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const body = (
    <div className={cn("relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end", !aside && "lg:grid-cols-1")}>
      <div className="max-w-3xl">
        <p className={cn("eyebrow animate-fade-up", tone === "navy" && "text-accent", tone === "lime" && "text-secondary")}>{eyebrow}</p>
        <h1
          className={cn(
            "mt-4 animate-fade-up-delay-1 text-balance font-heading text-[clamp(2.6rem,8vw,5.25rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]",
            tone === "navy" && "text-white",
            tone === "lime" && "text-accent-foreground",
          )}
        >
          {title}
        </h1>
        {intro ? (
          <div
            className={cn(
              "mt-6 max-w-2xl animate-fade-up-delay-2 text-pretty text-lg leading-relaxed sm:text-xl",
              tone === "navy" ? "text-white/85" : tone === "lime" ? "text-accent-foreground/85" : "text-muted-foreground",
            )}
          >
            {intro}
          </div>
        ) : null}
        {children ? <div className="mt-8 flex animate-fade-up-delay-3 flex-col gap-3 sm:flex-row">{children}</div> : null}
      </div>
      {aside ? <div className="animate-fade-up-delay-2">{aside}</div> : null}
    </div>
  );

  if (tone === "navy") {
    return (
      <section className="px-3 pt-3 sm:px-6 sm:pt-6 lg:px-[clamp(1.5rem,5vw,5rem)]">
        <div className="overflow-hidden rounded-[1.75rem] bg-navy px-6 py-12 sm:px-10 sm:py-16 lg:rounded-[2.25rem] lg:px-14 lg:py-20">{body}</div>
      </section>
    );
  }
  if (tone === "lime") {
    return (
      <section className="bg-accent">
        <div className="container-px py-14 sm:py-20">{body}</div>
      </section>
    );
  }
  return (
    <section>
      <div className="container-px pb-6 pt-14 sm:pt-20">{body}</div>
    </section>
  );
}

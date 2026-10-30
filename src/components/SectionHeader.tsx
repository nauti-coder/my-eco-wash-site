import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow + heading + optional intro, left-aligned by default (the site avoids centered stacks). */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", tone === "dark" && "text-accent")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "text-balance text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <div className={cn("mt-5 text-pretty text-lg leading-relaxed text-muted-foreground", tone === "dark" && "text-white/80")}>
          {intro}
        </div>
      ) : null}
    </div>
  );
}

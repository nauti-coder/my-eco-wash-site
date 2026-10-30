"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and slides children up when they scroll into view.
 * Content stays visible without JS (the hidden state only applies under <html class="js">).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visible = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

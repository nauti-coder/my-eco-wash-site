"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const views = [
  { id: "club", label: "Unlimited Club" },
  { id: "single", label: "Single Wash" },
] as const;

type ViewId = (typeof views)[number]["id"];

/** Lets links inside the panels switch to the club view and land on a package card. */
const ShowPackageContext = createContext<((cardId: string) => void) | null>(null);

/**
 * Segmented "Unlimited Club | Single Wash" control (WAI-ARIA tabs: arrow keys, Home/End, roving tabindex).
 * The panel contents are server-rendered and passed in, so this stays small.
 */
export function PricingToggle({ header, club, single }: { header: ReactNode; club: ReactNode; single: ReactNode }) {
  const baseId = useId();
  const [active, setActive] = useState<ViewId>("club");
  const tabRefs = useRef<Partial<Record<ViewId, HTMLButtonElement | null>>>({});
  const panels: Record<ViewId, ReactNode> = { club, single };

  const showPackage = useCallback((cardId: string) => {
    // Render the club panel first so the card exists on screen before scrolling to it.
    flushSync(() => setActive("club"));
    const card = document.getElementById(cardId);
    if (!card) return;
    card.setAttribute("tabindex", "-1");
    card.scrollIntoView({ block: "start" });
    card.focus({ preventScroll: true });
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Partial<Record<string, number>> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: views.length - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = views[(target + views.length) % views.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <ShowPackageContext.Provider value={showPackage}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        {header}
        <Reveal delay={150} className="lg:shrink-0">
          <div
            role="tablist"
            aria-label="Wash package type"
            className="relative grid w-full grid-cols-2 rounded-full border border-border bg-card p-1.5 sm:w-fit"
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-primary transition-transform duration-300 ease-out",
                active === "single" && "translate-x-full",
              )}
            />
            {views.map((view, index) => {
              const selected = view.id === active;
              return (
                <button
                  key={view.id}
                  ref={(node) => {
                    tabRefs.current[view.id] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${view.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${view.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(view.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-5 font-heading text-[0.95rem] font-semibold transition-colors duration-200 sm:h-12 sm:px-7 sm:text-base",
                    selected ? "text-primary-foreground" : "text-secondary hover:text-primary",
                  )}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        {views.map((view) => (
          <div
            key={view.id}
            role="tabpanel"
            id={`${baseId}-panel-${view.id}`}
            aria-labelledby={`${baseId}-tab-${view.id}`}
            tabIndex={0}
            hidden={view.id !== active}
            className="rounded-[1.5rem] duration-300 animate-in fade-in focus-visible:ring-offset-4"
          >
            {panels[view.id]}
          </div>
        ))}
      </div>
    </ShowPackageContext.Provider>
  );
}

/**
 * Inside PricingToggle: switches to the club view and moves to the package card.
 * Elsewhere, or on a modified click (new tab etc.), it is a normal link to `href`.
 */
export function PricingClubLink({
  href,
  cardId,
  className,
  children,
}: {
  href: string;
  cardId: string;
  className?: string;
  children: ReactNode;
}) {
  const showPackage = useContext(ShowPackageContext);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!showPackage || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showPackage(cardId);
  };

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

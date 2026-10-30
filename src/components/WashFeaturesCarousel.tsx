"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

export type WashFeatureSlide = {
  title: string;
  description: string;
  image: MediaAsset;
  /** Colour of the caption band along the bottom of the photo. */
  tone: "navy" | "lime";
  /** CSS object-position for the photo crop, e.g. "50% 60%". Centred when omitted. */
  focus?: string;
};

const bandTones = {
  navy: "bg-secondary/90 text-secondary-foreground",
  lime: "bg-accent text-accent-foreground",
} as const;

/** The arrows use aria-disabled (not disabled) at the ends so keyboard focus is never dropped. */
const arrowDisabled =
  "aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-transparent aria-disabled:hover:text-primary";

/**
 * Scroll position at which each slide rests. Slides too close to the end to reach the start edge
 * clamp to the end of the track, which is exactly where scroll snapping leaves them.
 */
function restingOffsets(track: HTMLElement) {
  const max = track.scrollWidth - track.clientWidth;
  return Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"), (slide) => Math.min(slide.offsetLeft, max));
}

/** The slide whose resting position is nearest the current scroll position (the last one once scrolled to the end). */
function currentSlide(track: HTMLElement) {
  const offsets = restingOffsets(track);
  const max = track.scrollWidth - track.clientWidth;
  if (max > 0 && track.scrollLeft >= max - 2) return offsets.length - 1;
  const distance = (index: number) => Math.abs(offsets[index] - track.scrollLeft);
  return offsets.reduce((nearest, _offset, index) => (distance(index) < distance(nearest) ? index : nearest), 0);
}

function keyTarget(key: string, current: number, last: number) {
  if (key === "ArrowLeft") return current - 1;
  if (key === "ArrowRight") return current + 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}

/**
 * Scroll-snap photo carousel: swipe or scroll the track, use the arrows or dots, or focus the
 * track and use the arrow keys. No autoplay.
 */
export function WashFeaturesCarousel({ slides }: { slides: readonly WashFeatureSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => setCurrent(currentSlide(track));
    // Fires once on observe, then whenever the track is resized.
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(track);
    track.addEventListener("scroll", sync, { passive: true });
    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", sync);
    };
  }, []);

  if (slides.length === 0) return null;
  const last = slides.length - 1;

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: restingOffsets(track)[Math.min(Math.max(index, 0), last)],
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Leave browser shortcuts such as Alt+ArrowLeft (back) alone.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = keyTarget(event.key, current, last);
    if (target === null) return;
    event.preventDefault();
    goTo(target);
  }

  return (
    <div>
      <div
        ref={trackRef}
        id={trackId}
        role="region"
        aria-roledescription="carousel"
        aria-label="Wash features"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="scrollbar-none relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg"
      >
        <ul role="list" className="flex gap-4">
          {slides.map((slide) => (
            <li
              key={slide.title}
              data-slide
              className="group relative isolate h-[24rem] shrink-0 basis-[86%] snap-start overflow-hidden rounded-lg bg-secondary sm:h-[27rem] sm:basis-[64%] md:basis-[56%] lg:h-[30rem] lg:basis-[76%]"
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 56vw, (min-width: 640px) 64vw, 90vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                style={slide.focus ? { objectPosition: slide.focus } : undefined}
              />
              <div className={cn("absolute inset-x-0 bottom-0 p-5 sm:p-6", bandTones[slide.tone])}>
                <h3 className="text-balance text-xl font-bold uppercase text-inherit sm:text-2xl">{slide.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-snug sm:text-base">{slide.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show slide ${index + 1} of ${slides.length}: ${slide.title}`}
              aria-controls={trackId}
              aria-current={index === current}
              onClick={() => goTo(index)}
              className="group/dot flex size-11 items-center justify-center rounded-full"
            >
              <span
                aria-hidden
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === current ? "w-8 bg-primary" : "w-2.5 bg-primary/25 group-hover/dot:bg-primary/50",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous slide"
            aria-controls={trackId}
            aria-disabled={current === 0}
            onClick={() => goTo(current - 1)}
            className={arrowDisabled}
          >
            <ChevronLeft aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next slide"
            aria-controls={trackId}
            aria-disabled={current === last}
            onClick={() => goTo(current + 1)}
            className={arrowDisabled}
          >
            <ChevronRight aria-hidden />
          </Button>
        </div>
      </div>

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${current + 1} of ${slides.length}: ${slides[current].title}`}
      </p>
    </div>
  );
}

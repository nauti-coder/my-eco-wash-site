import type { SVGProps } from "react";

/** Brand icons that lucide-react no longer ships. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.17H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  );
}

/** Filled check used in package feature lists. */
export function CheckBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...props}>
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="m5.8 10.3 2.7 2.7 5.7-5.9" fill="none" stroke="hsl(var(--card))" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

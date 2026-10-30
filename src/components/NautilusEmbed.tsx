"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    NautilusEmbed?: { init?: () => void };
  }
}

/** Renders a Nautilus embed (storefront checkout or form). The loader script in app/layout.tsx turns the node into an iframe. */
export function NautilusEmbed({ type, src, height = "640px" }: { type: "storefront" | "checkout" | "form"; src: string; height?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // The loader turns this node into the iframe. React never renders it, so hydration can't remove the iframe.
    const target = document.createElement("div");
    target.setAttribute("data-nautilus-embed", type);
    target.setAttribute("data-src", src);
    target.setAttribute("data-height", height);
    host.appendChild(target);
    // The loader scans the page only right after it loads; this covers embeds that mount later.
    window.NautilusEmbed?.init?.();
    return () => target.remove();
  }, [type, src, height]);
  return <div ref={hostRef} style={{ width: "100%", minHeight: height }} />;
}

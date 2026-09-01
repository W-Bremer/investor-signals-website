"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export function pauseLenis(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

/**
 * Site-wide inertial scrolling. Skipped entirely when the visitor prefers
 * reduced motion. Anchor jumps are routed through Lenis so in-page links
 * glide instead of snapping.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1, touchMultiplier: 1.4 });

    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.("a[href^='#'], a[href^='/#']") as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href")?.replace(/^\//, "");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis?.scrollTo(el as HTMLElement, { offset: -84, duration: 1.4 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: start at the top without inertia carrying over.
  useEffect(() => {
    if (!location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

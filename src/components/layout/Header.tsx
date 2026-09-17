"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/LogoMark";

const NAV = [
  { href: "/for-startups", label: "For Startups" },
  { href: "/for-fund-managers", label: "For Fund Managers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "https://investor-signals-directory.vercel.app", label: "Directory", external: true },
] as { href: string; label: string; external?: boolean }[];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (y <= 560) setHidden(false);
      else if (delta > 2) setHidden(true);
      else if (delta < -2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-out ${
        // While the menu is open the header must carry no transform or blur:
        // either would become the containing block for the fixed overlay below.
        open ? "" : hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled && !open
          ? "border-b border-navy/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-edge flex h-[4.5rem] items-center justify-between md:h-20">
        <Link href="/" aria-label="Investor Signals, home" className="relative z-50">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet font-sans text-[0.9375rem] font-medium text-navy/65 transition-colors duration-300 hover:text-navy"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`link-quiet font-sans text-[0.9375rem] font-medium transition-colors duration-300 ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-navy"
                    : "text-navy/65 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/request-an-introduction"
            className="rounded-[2px] border border-navy/30 px-5 py-2.5 font-sans text-[0.875rem] font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-paper"
          >
            Request an Introduction
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-6 bg-navy transition-all duration-300 ease-out ${
                open ? "top-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-6 bg-navy transition-all duration-300 ease-out ${
                open ? "bottom-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-paper transition-opacity duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-edge flex flex-1 flex-col justify-center gap-2 pb-16 pt-24">
          {NAV.map((item, i) => {
            const style = {
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(18px)",
              transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
            };
            const className =
              "border-b border-navy/10 py-5 font-serif text-[2rem] leading-tight text-navy transition-all duration-500 ease-out";
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className={className}
                style={style}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} className={className} style={style}>
                {item.label}
              </Link>
            );
          })}
          <div
            className="pt-8 transition-all duration-500 ease-out"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(18px)",
              transitionDelay: open ? `${120 + NAV.length * 60}ms` : "0ms",
            }}
          >
            <Link
              href="/request-an-introduction"
              tabIndex={open ? 0 : -1}
              className="inline-block w-full rounded-[2px] bg-navy px-7 py-4 text-center font-sans text-[0.9375rem] font-semibold text-paper"
            >
              Request an Introduction
            </Link>
            <p className="pt-6 font-sans text-sm text-navy/55">
              Investor Signals LLC. Miami, Florida.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

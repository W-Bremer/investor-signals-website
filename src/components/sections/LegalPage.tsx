import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({
  label,
  title,
  updated,
  children,
}: {
  label: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero label={label} title={title} />
      <section>
        <div className="container-edge py-16 md:py-20">
          <p className="font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-navy/45">
            Last updated {updated}
          </p>
          <div className="legal-body mt-10 max-w-[44rem] space-y-8">{children}</div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-[1.35rem] font-semibold text-navy">{heading}</h2>
      <div className="mt-3 space-y-4 font-sans text-[1rem] leading-[1.8] text-navy/75">{children}</div>
    </section>
  );
}

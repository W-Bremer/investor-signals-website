"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";
import { Plus } from "@/components/ui/icons";

export function FaqList({ items, defaultOpen = -1 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);

  return (
    <div className="border-b border-navy/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-navy/10">
            <button
              type="button"
              aria-expanded={isOpen}
              data-open-btn={isOpen ? "" : undefined}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-[1.15rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-navy-600 md:text-[1.28rem]">
                {item.q}
              </span>
              <Plus
                className={`faq-icon h-4 w-4 shrink-0 ${isOpen ? "text-gold-600" : "text-navy/45"}`}
              />
            </button>
            <div className="faq-answer" data-open={isOpen ? "" : undefined}>
              <div>
                <p className="max-w-[44rem] pb-7 font-sans text-[1rem] leading-[1.75] text-navy/70">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

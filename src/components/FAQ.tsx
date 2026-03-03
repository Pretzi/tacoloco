"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const faqCount = 10;

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/80">{t("subtitle")}</p>
        </div>
        <ul className="mt-12 space-y-3" role="list">
          {Array.from({ length: faqCount }, (_, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={i}
                className="rounded-xl border border-primary/10 bg-primary/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{t(`q${i}`)}</span>
                  <span
                    className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-primary/10 px-5 py-4 text-primary/85">
                      {t(`a${i}`)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

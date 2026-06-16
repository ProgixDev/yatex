"use client";

import { useLang } from "@/lib/i18n/LangContext";

const KEYS = [
  "marq.it",
  "marq.ca",
  "marq.de",
  "marq.nl",
  "marq.seasons",
  "marq.segments",
  "marq.shoes",
  "marq.export",
];

export function Marquee() {
  const { t } = useLang();
  // Duplicate the list once so the CSS `translateX(-50%)` loop is seamless.
  const items = [...KEYS, ...KEYS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((k, i) => (
          <span key={`${k}-${i}`}>{t(k)}</span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";

export function Why() {
  const { t } = useLang();

  return (
    <section className="section why" data-screen-label="05 Pourquoi">
      <div className="wrap">
        <div className="s-head">
          <div className="left">
            <Reveal as="div" className="eyebrow">
              {t("why.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80}>
              <span dangerouslySetInnerHTML={html(t("why.title"))} />
            </Reveal>
          </div>
          <div className="right">
            <Reveal as="p" className="lead" delay={160}>
              {t("why.lead")}
            </Reveal>
          </div>
        </div>

        <div className="why-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n, idx) => (
            <Reveal key={n} className="why-card" delay={(idx % 4) * 60}>
              <span className="num">{String(n).padStart(2, "0")}</span>
              <h4>{t(`why.${n}.h`)}</h4>
              <p>{t(`why.${n}.p`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

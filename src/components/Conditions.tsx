"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";

export function Conditions() {
  const { t } = useLang();

  return (
    <section className="section conditions" data-screen-label="07 Conditions">
      <div className="wrap">
        <div className="s-head">
          <div className="left">
            <Reveal as="div" className="eyebrow">
              {t("cond.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80}>
              <span dangerouslySetInnerHTML={html(t("cond.title"))} />
            </Reveal>
          </div>
          <div className="right">
            <Reveal as="p" className="lead" delay={160}>
              {t("cond.lead")}
            </Reveal>
          </div>
        </div>

        <div className="cond-block">
          <Reveal className="cond-card">
            <span className="step-num">{t("cond.c1.step")}</span>
            <div className="pct">
              <Counter target={50} suffix="%" />
            </div>
            <div>
              <div className="label">{t("cond.c1.label")}</div>
              <h4>{t("cond.c1.h")}</h4>
            </div>
          </Reveal>
          <Reveal className="cond-card" delay={120}>
            <span className="step-num">{t("cond.c2.step")}</span>
            <div className="pct">
              <Counter target={50} suffix="%" />
            </div>
            <div>
              <div className="label">{t("cond.c2.label")}</div>
              <h4>{t("cond.c2.h")}</h4>
            </div>
          </Reveal>
        </div>

        <Reveal
          as="div"
          className="cond-note"
          delay={240}
          // cond.note contains brand-styled <strong> markup
        >
          <span dangerouslySetInnerHTML={html(t("cond.note"))} />
        </Reveal>
      </div>
    </section>
  );
}

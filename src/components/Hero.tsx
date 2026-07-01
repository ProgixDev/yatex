"use client";

import Image from "next/image";
import { useLang, html } from "@/lib/i18n/LangContext";
import { IMG } from "@/lib/images";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";
import { IconArrow } from "./Icons";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="accueil" data-screen-label="01 Hero">
      <Image
        id="heroBg"
        className="hero-bg"
        src={IMG.warehouseBales}
        alt=""
        aria-hidden="true"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-noise" />

      <div className="hero-top">
        <div className="eyebrow">{t("hero.eyebrow")}</div>
      </div>

      <div className="hero-content">
        <h1>
          <WordReveal delay={0}>{t("hero.word.1")}</WordReveal>{" "}
          <WordReveal delay={80}>{t("hero.word.2")}</WordReveal>
          <br />
          <WordReveal delay={160}>
            <span className="italic">{t("hero.word.3")}</span>
          </WordReveal>
        </h1>

        <Reveal as="p" className="hero-tagline" delay={500}>
          {t("hero.tagline")}
        </Reveal>

        <Reveal as="div" className="hero-ctas" delay={700}>
          <a href="#contact" className="btn">
            <span>{t("hero.cta.primary")}</span>
            <IconArrow className="arrow" />
          </a>
          <a href="#apropos" className="btn btn-ghost">
            {t("hero.cta.secondary")}
          </a>
        </Reveal>
      </div>

      <div className="hero-foot" aria-hidden="true">
        <div className="l" dangerouslySetInnerHTML={html(t("hero.foot.l"))} />
        <div className="r" dangerouslySetInnerHTML={html(t("hero.foot.r"))} />
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t("hero.scroll")}</span>
        <span className="line" />
      </div>
    </section>
  );
}

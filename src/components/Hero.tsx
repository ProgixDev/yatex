"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";
import { IconArrow } from "./Icons";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="accueil" data-screen-label="01 Hero">
      <video
        className="hero-bg"
        id="heroBg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&w=2400&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-warehouse-port-for-cargo-ships-39462-hd-ready.mp4"
          type="video/mp4"
        />
        <source src="https://assets.mixkit.co/videos/39462/39462-720.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/39462/39462-360.mp4" type="video/mp4" />
      </video>
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

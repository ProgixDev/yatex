"use client";

import Image from "next/image";
import { useLang, html } from "@/lib/i18n/LangContext";
import { IMG } from "@/lib/images";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useLang();

  return (
    <section className="section" id="apropos" data-screen-label="02 À propos">
      <div className="wrap">
        <div className="s-head">
          <div className="left">
            <Reveal as="div" className="eyebrow">
              {t("about.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80}>
              <span dangerouslySetInnerHTML={html(t("about.title"))} />
            </Reveal>
          </div>
          <div className="right">
            <Reveal as="p" className="lead" delay={160}>
              {t("about.lead")}
            </Reveal>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <Reveal as="p">{t("about.p1")}</Reveal>
            <Reveal as="p" delay={80}>
              {t("about.p2")}
            </Reveal>

            <Reveal as="div" className="origins" delay={160}>
              <h5>{t("about.origins.head")}</h5>
              <ul className="origin-list">
                <li>
                  <span className="flag it">
                    <span /> <span /> <span />
                  </span>
                  <span>{t("marq.it")}</span>
                </li>
                <li>
                  <span className="flag ca">
                    <span /> <span /> <span />
                  </span>
                  <span>{t("marq.ca")}</span>
                </li>
                <li>
                  <span className="flag de">
                    <span /> <span /> <span />
                  </span>
                  <span>{t("marq.de")}</span>
                </li>
                <li>
                  <span className="flag nl">
                    <span /> <span /> <span />
                  </span>
                  <span>{t("marq.nl")}</span>
                </li>
              </ul>
            </Reveal>

            <Reveal as="div" className="containers" delay={200}>
              <div className="container-card">
                <div className="num">
                  40
                  <span style={{ fontSize: "0.55em", color: "var(--y-olive)" }}> HC</span>
                </div>
                <div className="lbl">{t("about.containers.maritime")}</div>
              </div>
              <div className="container-card">
                <div className="num">
                  53
                  <span style={{ fontSize: "0.55em", color: "var(--y-olive)" }}> ft</span>
                </div>
                <div className="lbl">{t("about.containers.road")}</div>
              </div>
            </Reveal>
          </div>

          <Reveal as="figure" variant="img" className="about-figure">
            <Image
              src={IMG.sortingHall}
              alt={t("about.figure.alt")}
              fill
              placeholder="blur"
              sizes="(max-width: 960px) 100vw, 45vw"
            />
            <figcaption className="about-meta">
              <span className="l">{t("about.figure.l")}</span>
              <span className="r">{t("about.figure.r")}</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

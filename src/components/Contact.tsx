"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";
import { Configurator } from "./Configurator";
import { IconMail, IconPin, IconClock, IconGlobe } from "./Icons";

export function Contact() {
  const { t } = useLang();

  return (
    <section className="section" id="contact" data-screen-label="08 Contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal as="div" className="eyebrow">
              {t("cx.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80} style={{ marginTop: 24 }}>
              <span dangerouslySetInnerHTML={html(t("cx.title"))} />
            </Reveal>
            <Reveal as="p" className="lead" delay={160}>
              {t("cx.lead")}
            </Reveal>

            <Reveal as="div" className="contact-info" delay={240}>
              <div className="row">
                <IconMail className="icon" />
                <span className="lbl">{t("cx.info.email")}</span>
                <a href="mailto:yousfirecyclage@gmail.com">
                  yousfirecyclage@gmail.com
                </a>
              </div>
              <div className="row">
                <IconPin className="icon" />
                <span className="lbl">{t("cx.info.addr")}</span>
                <span>{t("cx.info.addr.v")}</span>
              </div>
              <div className="row">
                <IconClock className="icon" />
                <span className="lbl">{t("cx.info.resp")}</span>
                <span>{t("cx.info.resp.v")}</span>
              </div>
              <div className="row">
                <IconGlobe className="icon" />
                <span className="lbl">{t("cx.info.export")}</span>
                <span>{t("cx.info.export.v")}</span>
              </div>
            </Reveal>
          </div>

          <Reveal as="div" variant="fade" delay={200} className="">
            <div id="yatex-cfg">
              <Configurator />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

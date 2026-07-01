"use client";

import Image from "next/image";
import { useLang, html } from "@/lib/i18n/LangContext";
import { IMG } from "@/lib/images";
import { Reveal } from "./Reveal";
import { IconTruck, IconSort, IconBox, IconWarehouse } from "./Icons";

const STEPS = [
  { i: 1, Icon: IconTruck, img: IMG.bulkArrival },
  { i: 2, Icon: IconSort, img: IMG.sortingTeam },
  { i: 3, Icon: IconBox, img: IMG.baledStock },
  { i: 4, Icon: IconWarehouse, img: IMG.linenCart },
] as const;

export function Process() {
  const { t } = useLang();

  return (
    <section className="section process" id="processus" data-screen-label="03 Processus">
      <div className="wrap">
        <div className="s-head">
          <div className="left">
            <Reveal as="div" className="eyebrow">
              {t("process.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80}>
              <span dangerouslySetInnerHTML={html(t("process.title"))} />
            </Reveal>
          </div>
          <div className="right">
            <Reveal as="p" className="lead" delay={160}>
              {t("process.lead")}
            </Reveal>
          </div>
        </div>

        <div className="process-grid">
          {STEPS.map(({ i, Icon, img }, idx) => (
            <Reveal key={i} className="process-step" delay={idx * 90}>
              <span className="pulse" />
              <div className="shot">
                <Image
                  src={img}
                  alt={t(`process.s${i}.title`)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 25vw"
                />
              </div>
              <div className="num">{t(`process.s${i}.label`)}</div>
              <div>
                <h3>{t(`process.s${i}.title`)}</h3>
                <p style={{ marginTop: 14 }}>{t(`process.s${i}.desc`)}</p>
              </div>
              <Icon className="icon" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

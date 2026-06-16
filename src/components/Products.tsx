"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";
import {
  IconSun,
  IconSnow,
  IconMan,
  IconWoman,
  IconKid,
  IconShoe,
  IconBag,
  IconGrid,
  IconArrowUR,
} from "./Icons";

const CATS = [
  { Icon: IconSun, sub: "products.cat.season", name: "products.cat.summer" },
  { Icon: IconSnow, sub: "products.cat.season", name: "products.cat.winter" },
  { Icon: IconMan, sub: "products.cat.segment", name: "products.cat.men" },
  { Icon: IconWoman, sub: "products.cat.segment", name: "products.cat.women" },
  { Icon: IconKid, sub: "products.cat.segment", name: "products.cat.kids" },
  { Icon: IconShoe, sub: "products.cat.product", name: "products.cat.shoes" },
  { Icon: IconBag, sub: "products.cat.product", name: "products.cat.acc" },
  { Icon: IconGrid, sub: "products.cat.category", name: "products.cat.mixed" },
] as const;

export function Products() {
  const { t } = useLang();
  const subhead: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--y-olive)",
    margin: "0 0 20px",
    fontWeight: 600,
  };

  return (
    <section className="section products" id="produits" data-screen-label="04 Produits">
      <div className="wrap">
        <div className="s-head">
          <div className="left">
            <Reveal as="div" className="eyebrow">
              {t("products.eyebrow")}
            </Reveal>
            <Reveal as="h2" delay={80}>
              <span dangerouslySetInnerHTML={html(t("products.title"))} />
            </Reveal>
          </div>
          <div className="right">
            <Reveal as="p" className="lead" delay={160}>
              {t("products.lead")}
            </Reveal>
          </div>
        </div>

        <Reveal as="h5" style={subhead}>
          {t("products.formats.head")}
        </Reveal>
        <div className="formats">
          <Reveal className="format-card">
            <div>
              <div className="lbl">{t("products.f1.label")}</div>
              <h3 style={{ color: "var(--y-canvas)", marginTop: 6 }}>{t("products.f1.title")}</h3>
              <div className="desc">{t("products.f1.desc")}</div>
            </div>
            <div className="weight">
              45<span style={{ fontSize: "0.5em" }}> kg</span>
            </div>
          </Reveal>
          <Reveal className="format-card" delay={100}>
            <div>
              <div className="lbl">{t("products.f2.label")}</div>
              <h3 style={{ color: "var(--y-canvas)", marginTop: 6 }}>{t("products.f2.title")}</h3>
              <div className="desc">{t("products.f2.desc")}</div>
            </div>
            <div className="weight">
              55<span style={{ fontSize: "0.5em" }}> kg</span>
            </div>
          </Reveal>
        </div>

        <Reveal as="h5" style={{ ...subhead, margin: "56px 0 20px" }}>
          {t("products.cats.head")}
        </Reveal>
        <div className="cat-grid">
          {CATS.map(({ Icon, sub, name }, idx) => (
            <Reveal key={name} className="cat-cell" delay={(idx % 4) * 60}>
              <Icon className="icon" />
              <span className="cat-arrow">
                <IconArrowUR />
              </span>
              <div className="sub">{t(sub)}</div>
              <div className="name">{t(name)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

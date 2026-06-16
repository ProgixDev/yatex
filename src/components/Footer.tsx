"use client";

import { useLang } from "@/lib/i18n/LangContext";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#accueil" className="brand">
              <span className="brand-mark">
                <BrandMark />
              </span>
              <span className="brand-name">YATEX</span>
            </a>
            <p className="footer-tag">{t("foot.tag")}</p>
          </div>
          <div>
            <h5>{t("foot.nav")}</h5>
            <ul>
              <li>
                <a href="#accueil">{t("nav.home")}</a>
              </li>
              <li>
                <a href="#apropos">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#processus">{t("nav.process")}</a>
              </li>
              <li>
                <a href="#produits">{t("nav.products")}</a>
              </li>
              <li>
                <a href="#galerie">{t("nav.gallery")}</a>
              </li>
              <li>
                <a href="#contact">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>{t("foot.prods")}</h5>
            <ul>
              <li>
                <a href="#produits">Ballots 45 kg</a>
              </li>
              <li>
                <a href="#produits">Ballots 55 kg</a>
              </li>
              <li>
                <a href="#produits">{t("marq.seasons")}</a>
              </li>
              <li>
                <a href="#produits">{t("marq.segments")}</a>
              </li>
              <li>
                <a href="#produits">{t("marq.shoes")}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>{t("foot.contact")}</h5>
            <ul>
              <li>
                <a href="mailto:yousfirecyclage@gmail.com">
                  yousfirecyclage@gmail.com
                </a>
              </li>
              <li>{t("cx.info.addr.v")}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>{t("foot.copy").replace("{year}", String(year))}</span>
          <span>{t("foot.tagline")}</span>
        </div>
      </div>
    </footer>
  );
}

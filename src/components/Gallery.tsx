"use client";

import { useLang, html } from "@/lib/i18n/LangContext";
import { Reveal } from "./Reveal";

const TILES = [
  {
    n: 1,
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=80",
    alt: "Entrepôt industriel",
  },
  {
    n: 2,
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1400&q=80",
    alt: "Conteneur maritime",
  },
  {
    n: 3,
    src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    alt: "Vêtements suspendus",
  },
  {
    n: 4,
    src: "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=1200&q=80",
    alt: "Ballots de textile",
  },
  {
    n: 5,
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    alt: "Vêtements colorés",
  },
  {
    n: 6,
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80",
    alt: "Vêtements pliés",
  },
  {
    n: 7,
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    alt: "Entrepôt logistique",
  },
];

export function Gallery() {
  const { t } = useLang();
  return (
    <section className="section" id="galerie" data-screen-label="06 Galerie">
      <div className="wrap-wide">
        <div className="wrap" style={{ padding: 0 }}>
          <div className="s-head">
            <div className="left">
              <Reveal as="div" className="eyebrow">
                {t("gal.eyebrow")}
              </Reveal>
              <Reveal as="h2" delay={80}>
                <span dangerouslySetInnerHTML={html(t("gal.title"))} />
              </Reveal>
            </div>
            <div className="right">
              <Reveal as="p" className="lead" delay={160}>
                {t("gal.lead")}
              </Reveal>
            </div>
          </div>
        </div>

        <div className="gallery-grid">
          {TILES.map((tile) => (
            <Reveal
              key={tile.n}
              as="a"
              variant="img"
              className={`gallery-item g-${tile.n}`}
            >
              <img loading="lazy" src={tile.src} alt={tile.alt} />
              <span className="cap">{t(`gal.cap.${tile.n}`)}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

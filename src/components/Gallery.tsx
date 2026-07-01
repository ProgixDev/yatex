"use client";

import Image from "next/image";
import { useLang, html } from "@/lib/i18n/LangContext";
import { GALLERY } from "@/lib/images";
import { Reveal } from "./Reveal";
import { VideoReel } from "./VideoReel";

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

        <Reveal as="div" variant="fade" className="gallery-films">
          <div className="films-intro">
            <div className="eyebrow">{t("gal.films.eyebrow")}</div>
            <h3 className="films-title">
              <span dangerouslySetInnerHTML={html(t("gal.films.title"))} />
            </h3>
            <p>{t("gal.films.lead")}</p>
          </div>
          <div className="films-reels">
            <VideoReel src="/platform-film-1.mp4" caption={t("gal.film.1")} />
            <VideoReel src="/platform-film-2.mp4" caption={t("gal.film.2")} />
          </div>
        </Reveal>

        <div className="gallery-masonry">
          {GALLERY.map((shot) => (
            <Reveal
              key={shot.capKey}
              as="figure"
              variant="img"
              className={`gallery-item${shot.crop ? ` gm-${shot.crop}` : ""}`}
            >
              <Image
                src={shot.src}
                alt={t(shot.capKey)}
                placeholder="blur"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <span className="cap">{t(shot.capKey)}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

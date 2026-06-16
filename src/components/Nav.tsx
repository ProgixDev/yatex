"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/LangContext";
import { BrandMark } from "./BrandMark";
import { IconArrow, IconBurger } from "./Icons";
import { MobileMenu } from "./MobileMenu";

const SECTION_IDS = [
  "accueil",
  "apropos",
  "processus",
  "produits",
  "galerie",
  "contact",
] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      let cur: string = SECTION_IDS[0];
      const fromTop = y + 120;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= fromTop) cur = id;
      }
      setActive(cur);

      const heroBg = document.getElementById("heroBg") as HTMLVideoElement | null;
      if (heroBg && y < window.innerHeight) {
        const p = y * 0.35;
        heroBg.style.transform = `translateY(${p}px) scale(${1.08 + y * 0.0002})`;
      }
      const heroContent = document.querySelector(".hero-content") as HTMLElement | null;
      if (heroContent && y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * -0.12}px)`;
        heroContent.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
      }

      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".s-head h2").forEach((h) => {
        const r = h.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const center = r.top + r.height / 2;
        const dist = (center - vh / 2) / vh;
        h.style.transform = `translateY(${(-dist * 18).toFixed(1)}px)`;
      });

      document.querySelectorAll<HTMLElement>(".about-figure").forEach((f) => {
        const r = f.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const center = r.top + r.height / 2;
        const dist = (center - vh / 2) / vh;
        const img = f.querySelector("img");
        if (img) img.style.transform = `translateY(${(-dist * 30).toFixed(1)}px) scale(1.08)`;
      });
    };
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll for hash links — match the prototype's 60px offset.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href") ?? "";
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const links: { href: string; key: string }[] = [
    { href: "#accueil", key: "nav.home" },
    { href: "#apropos", key: "nav.about" },
    { href: "#processus", key: "nav.process" },
    { href: "#produits", key: "nav.products" },
    { href: "#galerie", key: "nav.gallery" },
    { href: "#contact", key: "nav.contact" },
  ];

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
        <div className="nav-inner">
          <a href="#accueil" className="brand" aria-label="YATEX — accueil">
            <span className="brand-mark">
              <BrandMark />
            </span>
            <span className="brand-name">YATEX</span>
          </a>

          <nav>
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`#${active}` === l.href ? "active" : undefined}
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lang-toggle" role="group" aria-label="Langue / Language">
            <button
              type="button"
              className={"opt" + (lang === "fr" ? " on" : "")}
              data-lang="fr"
              aria-pressed={lang === "fr"}
              onClick={() => setLang("fr")}
            >
              FR
            </button>
            <button
              type="button"
              className={"opt" + (lang === "en" ? " on" : "")}
              data-lang="en"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          <a href="#contact" className="btn nav-cta">
            <span>{t("nav.cta")}</span>
            <IconArrow className="arrow" />
          </a>

          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <IconBurger />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/LangContext";

const SECTIONS = [
  { id: "accueil", fr: "Accueil", en: "Home", dark: true },
  { id: "apropos", fr: "À propos", en: "About", dark: false },
  { id: "processus", fr: "Processus", en: "Process", dark: true },
  { id: "produits", fr: "Produits", en: "Products", dark: false },
  { id: "galerie", fr: "Galerie", en: "Gallery", dark: false },
  { id: "contact", fr: "Contact", en: "Contact", dark: false },
] as const;

export function ChapterRail() {
  const { lang } = useLang();
  const railRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let id: string = SECTIONS[0].id;
      let dark: boolean = SECTIONS[0].dark;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) {
          id = s.id;
          dark = s.dark;
        }
      }
      setActiveId(id);
      rail.classList.toggle("on-dark", dark);
      rail.classList.toggle("show", window.scrollY > 200);
    };
    update();
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="chapter-rail" ref={railRef} aria-label="Sections">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={"chip" + (activeId === s.id ? " active" : "")}
          data-id={s.id}
          data-dark={s.dark}
        >
          <span className="label">{lang === "en" ? s.en : s.fr}</span>
          <span className="dot" />
        </a>
      ))}
    </nav>
  );
}

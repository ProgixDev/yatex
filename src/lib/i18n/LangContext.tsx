"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DICT, type Lang } from "./dict";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Hydrate from localStorage on the client after mount, then mark js-ready
  // so the reveal animations activate (the prototype gates them on .js-ready).
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    const stored = localStorage.getItem("yatex-lang");
    if (stored === "en" || stored === "fr") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-fr", lang === "fr");
    document.title = DICT[lang]["meta.title"] ?? document.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem("yatex-lang", l);
    setLangState(l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const d = DICT[lang];
      return d[key] ?? DICT.fr[key] ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Returns props for `dangerouslySetInnerHTML` — for dictionary entries that contain HTML markup. */
export function html(s: string) {
  return { __html: s };
}

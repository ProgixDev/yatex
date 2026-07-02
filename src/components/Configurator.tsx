"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/LangContext";
import { IconArrow, IconCheck } from "./Icons";

const CATEGORIES = [
  { id: "summer", key: "products.cat.summer" },
  { id: "winter", key: "products.cat.winter" },
  { id: "men", key: "products.cat.men" },
  { id: "women", key: "products.cat.women" },
  { id: "kids", key: "products.cat.kids" },
  { id: "shoes", key: "products.cat.shoes" },
  { id: "acc", key: "products.cat.acc" },
  { id: "mixed", key: "products.cat.mixed" },
] as const;

const VOLUMES = [
  { id: "1c", key: "cfg.vol.1" },
  { id: "25c", key: "cfg.vol.2" },
  { id: "510c", key: "cfg.vol.3" },
  { id: "lt", key: "cfg.vol.4" },
] as const;

const MARKETS = [
  { id: "local", key: "cfg.market.local" },
  { id: "africa", key: "cfg.market.africa" },
  { id: "maghreb", key: "cfg.market.maghreb" },
  { id: "middle", key: "cfg.market.middle" },
  { id: "europe", key: "cfg.market.europe" },
  { id: "other", key: "cfg.market.other" },
] as const;

type State = {
  step: number;
  category: string | null;
  volume: string | null;
  market: string | null;
  country: string;
  fullname: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: State = {
  step: 0,
  category: null,
  volume: null,
  market: null,
  country: "",
  fullname: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function Configurator() {
  const { t, lang } = useLang();
  const [state, setState] = useState<State>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setField = <K extends keyof State>(k: K, v: State[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const validateStep = (): boolean => {
    setError(null);
    switch (state.step) {
      case 0:
        return !!state.category;
      case 1:
        return !!state.volume;
      case 2:
        return !!state.market;
      case 3:
        return !!(state.fullname && state.email);
    }
    return true;
  };

  const label = (
    list: readonly { id: string; key: string }[],
    id: string | null,
  ) => {
    const item = id ? list.find((x) => x.id === id) : undefined;
    return item ? t(item.key) : "";
  };

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: label(CATEGORIES, state.category),
          volume: label(VOLUMES, state.volume),
          market: label(MARKETS, state.market),
          country: state.country,
          fullname: state.fullname,
          company: state.company,
          email: state.email,
          phone: state.phone,
          message: state.message,
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setError(t("cfg.error"));
    } finally {
      setSending(false);
    }
  };

  const go = (dir: 1 | -1) => {
    if (sending) return;
    if (dir > 0) {
      if (!validateStep()) {
        setError(t("cfg.required"));
        return;
      }
      if (state.step === 3) {
        void submit();
        return;
      }
      setState((s) => ({ ...s, step: Math.min(3, s.step + 1) }));
    } else {
      setState((s) => ({ ...s, step: Math.max(0, s.step - 1) }));
    }
  };

  const pct = (state.step / 3) * 100;
  const summary: { k: string; v: string }[] = [];
  if (state.category) {
    const c = CATEGORIES.find((x) => x.id === state.category)!;
    summary.push({ k: t("cfg.summary.cat"), v: t(c.key) });
  }
  if (state.volume) {
    const v = VOLUMES.find((x) => x.id === state.volume)!;
    summary.push({ k: t("cfg.summary.vol"), v: t(v.key) });
  }
  if (state.market || state.country) {
    const mk = state.market
      ? t(MARKETS.find((m) => m.id === state.market)!.key)
      : "";
    const co = state.country ? ` · ${state.country}` : "";
    summary.push({ k: t("cfg.summary.dest"), v: mk + co });
  }

  if (submitted) {
    return (
      <div className="cfg-success show">
        <IconCheck className="cfg-success-icon" />
        <div className="cfg-success-msg">{t("cfg.success")}</div>
      </div>
    );
  }

  return (
    <div className="cfg-wrap">
      <div className="cfg-header">
        <div className="cfg-step-label">
          {t("cfg.step")} {state.step + 1} / 4
        </div>
        <div className="cfg-progress">
          <div className="cfg-progress-bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="cfg-steps">
        {state.step === 0 && (
          <div className="cfg-step active">
            <div className="cfg-stepnum">01</div>
            <h3>{t("cfg.s1.title")}</h3>
            <p className="cfg-help">{t("cfg.s1.help")}</p>
            <div className="cfg-cat-grid">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={"cfg-cat" + (state.category === c.id ? " on" : "")}
                  onClick={() => setField("category", c.id)}
                >
                  <span className="cfg-cat-dot" />
                  <span className="cfg-cat-name">{t(c.key)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {state.step === 1 && (
          <div className="cfg-step active">
            <div className="cfg-stepnum">02</div>
            <h3>{t("cfg.s2.title")}</h3>
            <p className="cfg-help">{t("cfg.s2.help")}</p>
            <div className="cfg-vol-grid">
              {VOLUMES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={"cfg-vol" + (state.volume === v.id ? " on" : "")}
                  onClick={() => setField("volume", v.id)}
                >
                  <span className="cfg-vol-text">{t(v.key)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {state.step === 2 && (
          <div className="cfg-step active">
            <div className="cfg-stepnum">03</div>
            <h3>{t("cfg.s3.title")}</h3>
            <p className="cfg-help">{t("cfg.s3.help")}</p>
            <div className="cfg-chips">
              {MARKETS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={"cfg-chip" + (state.market === m.id ? " on" : "")}
                  onClick={() => setField("market", m.id)}
                >
                  {t(m.key)}
                </button>
              ))}
            </div>
            <div className="cfg-field cfg-field-country">
              <label>{t("cfg.field.country")}</label>
              <input
                type="text"
                value={state.country}
                placeholder={t("cfg.field.country.ph")}
                onChange={(e) => setField("country", e.target.value)}
              />
            </div>
          </div>
        )}

        {state.step === 3 && (
          <div className="cfg-step active">
            <div className="cfg-stepnum">04</div>
            <h3>{t("cfg.s4.title")}</h3>
            <p className="cfg-help">{t("cfg.s4.help")}</p>

            <div className="cfg-row">
              <div className="cfg-field">
                <label>{t("cfg.field.fullname")} *</label>
                <input
                  type="text"
                  value={state.fullname}
                  onChange={(e) => setField("fullname", e.target.value)}
                />
              </div>
              <div className="cfg-field">
                <label>{t("cfg.field.company")}</label>
                <input
                  type="text"
                  value={state.company}
                  onChange={(e) => setField("company", e.target.value)}
                />
              </div>
            </div>

            <div className="cfg-row">
              <div className="cfg-field">
                <label>{t("cfg.field.email")} *</label>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </div>
              <div className="cfg-field">
                <label>{t("cfg.field.phone")}</label>
                <input
                  type="tel"
                  value={state.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="cfg-field">
              <label>{t("cfg.field.message")}</label>
              <textarea
                rows={3}
                value={state.message}
                placeholder={t("cfg.field.message.ph")}
                onChange={(e) => setField("message", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {error && <div className="cfg-error show">{error}</div>}

      {summary.length > 0 ? (
        <div className="cfg-summary">
          {summary.map((it) => (
            <div className="cfg-sum-row" key={it.k}>
              <span className="cfg-sum-k">{it.k}</span>
              <span className="cfg-sum-v">{it.v}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="cfg-summary cfg-sum-empty" />
      )}

      <div className="cfg-footer">
        <button
          type="button"
          className="btn btn-outline cfg-back"
          style={{ visibility: state.step === 0 ? "hidden" : "visible" }}
          onClick={() => go(-1)}
        >
          {t("cfg.back")}
        </button>
        <span className="cfg-fine">{t("cfg.fine")}</span>
        <button
          type="button"
          className="btn cfg-next"
          onClick={() => go(1)}
          disabled={sending}
        >
          {state.step === 3
            ? sending
              ? t("cfg.sending")
              : t("cfg.submit")
            : t("cfg.next")}
          <IconArrow className="arrow" />
        </button>
      </div>
    </div>
  );
}

"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Variant = true | "fade" | "mask" | "img";

type Props = {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  as = "div",
  variant = true,
  delay,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);

    // Belt-and-braces fallback: if IO never fires, reveal after 1.4s.
    const t = window.setTimeout(() => setSeen(true), 1400);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const dataReveal = variant === true ? "" : variant;
  const mergedStyle: CSSProperties = {
    ...(delay != null ? ({ "--rd": `${delay}ms` } as CSSProperties) : null),
    ...style,
  };

  return createElement(
    as,
    {
      ref,
      "data-reveal": dataReveal,
      className: (seen ? "in " : "") + (className ?? ""),
      style: mergedStyle,
    },
    children
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function WordReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
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
    const t = window.setTimeout(() => setSeen(true), 1400);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={"word-reveal " + (seen ? "in " : "") + (className ?? "")}
      style={{ "--wd": `${delay}ms` } as CSSProperties}
    >
      <span>{children}</span>
    </span>
  );
}

"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const docH = document.documentElement;
      const max = docH.scrollHeight - docH.clientHeight;
      const pct = max > 0 ? docH.scrollTop / max : 0;
      bar.style.transform = `scaleX(${pct})`;
    };
    update();
    document.addEventListener("scroll", update, { passive: true });
    return () => document.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}

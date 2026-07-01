"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; caption: string };

// Vertical operational clip. Plays muted only while on screen, and pauses off
// screen — so the heavy file isn't fetched until the gallery is scrolled to.
export function VideoReel({ src, caption }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      v.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="film">
      <video ref={ref} muted loop playsInline preload="metadata">
        <source src={src} type="video/mp4" />
      </video>
      <span className="cap">{caption}</span>
    </figure>
  );
}

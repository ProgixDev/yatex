"use client";

import { useLang } from "@/lib/i18n/LangContext";

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; key: string }[];
}) {
  const { t } = useLang();
  return (
    <aside className={"mobile-menu" + (open ? " open" : "")}>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="mlink" onClick={onClose}>
              {t(l.key)}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

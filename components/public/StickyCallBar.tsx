"use client";

import {Link} from "@/i18n/navigation";
import {garage} from "@/lib/garage";
import {HoursStatus} from "./HoursStatus";
import {useTranslations} from "next-intl";

export function StickyCallBar() {
  const t = useTranslations("sticky");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 text-center text-sm font-medium">
        <a href={`tel:${garage.phoneTel}`} className="flex flex-col items-center gap-0.5 py-3 text-accent">
          {t("call")}
        </a>
        <Link href="/occasions" className="flex flex-col items-center gap-0.5 py-3">
          {t("stock")}
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-0.5 py-3 text-muted">
          <span>{t("hours")}</span>
          <span className="text-[11px]">
            <HoursStatus openLabel={t("open")} closedLabel={t("closed")} compact />
          </span>
        </Link>
      </div>
    </nav>
  );
}

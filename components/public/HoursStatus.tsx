"use client";

import {getOpenState} from "@/lib/hours";
import {useEffect, useState} from "react";

export function HoursStatus({
  openLabel,
  closedLabel,
  compact = false,
}: {
  openLabel: string;
  closedLabel: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(getOpenState().isOpen);
    const id = window.setInterval(() => setOpen(getOpenState().isOpen), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (open === null) {
    return <span className="text-muted">{compact ? "…" : closedLabel}</span>;
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-zinc-500"}`} />
      {open ? openLabel : closedLabel}
    </span>
  );
}

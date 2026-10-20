'use client';

import {Link, usePathname} from '@/i18n/navigation';
import {locales} from '@/i18n/routing';

const labels: Record<string, string> = {fr: 'FR', de: 'DE', en: 'EN'};

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-semibold tracking-wide">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className="rounded-full px-2 py-1 text-muted hover:bg-card-2 hover:text-foreground"
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}

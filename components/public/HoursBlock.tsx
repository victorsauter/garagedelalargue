'use client';

import {useTranslations} from 'next-intl';
import {getOpenStatus} from '@/lib/hours';

export function HoursBlock({id = 'horaires'}: {id?: string}) {
  const t = useTranslations();
  const status = getOpenStatus();

  return (
    <section id={id} className="rounded-2xl border border-line bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl">{t('home.hoursTitle')}</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.open ? 'bg-accent text-background' : 'bg-card-2 text-muted'}`}
        >
          {status.open ? t('hours.open') : t('hours.closed')}
        </span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        <li>{t('hours.weekdays')}</li>
        <li>{t('hours.saturday')}</li>
        <li>{t('hours.sunday')}</li>
      </ul>
    </section>
  );
}

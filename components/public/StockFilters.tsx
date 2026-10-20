'use client';

import {useRouter} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import {fuelKeys} from '@/lib/format';

type Props = {
  category: string;
  fuel: string;
  minPrice: string;
  maxPrice: string;
  minKm: string;
  maxKm: string;
  minYear: string;
  maxYear: string;
};

export function StockFilters(props: Props) {
  const t = useTranslations();
  const router = useRouter();

  function apply(formData: FormData) {
    const params = new URLSearchParams();
    for (const key of ['cat', 'fuel', 'minPrice', 'maxPrice', 'minKm', 'maxKm', 'minYear', 'maxYear']) {
      const value = String(formData.get(key) ?? '').trim();
      if (value && value !== 'all') params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `/occasions?${qs}` : '/occasions');
  }

  return (
    <form action={apply} className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs text-muted">
        {t('stock.filters')}
        <select name="cat" defaultValue={props.category} className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground">
          <option value="all">{t('stock.all')}</option>
          <option value="voitures">{t('stock.cars')}</option>
          <option value="utilitaires">{t('stock.vans')}</option>
        </select>
      </label>
      <label className="text-xs text-muted">
        {t('stock.fuel')}
        <select name="fuel" defaultValue={props.fuel} className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-foreground">
          <option value="all">{t('stock.all')}</option>
          {fuelKeys.map((fuel) => (
            <option key={fuel} value={fuel}>
              {t(`fuel.${fuel}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="text-xs text-muted">
        {t('stock.price')} (€)
        <span className="mt-1 flex gap-2">
          <input name="minPrice" defaultValue={props.minPrice} placeholder={t('stock.from')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
          <input name="maxPrice" defaultValue={props.maxPrice} placeholder={t('stock.to')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
        </span>
      </label>
      <label className="text-xs text-muted">
        {t('stock.km')}
        <span className="mt-1 flex gap-2">
          <input name="minKm" defaultValue={props.minKm} placeholder={t('stock.from')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
          <input name="maxKm" defaultValue={props.maxKm} placeholder={t('stock.to')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
        </span>
      </label>
      <label className="text-xs text-muted sm:col-span-2">
        {t('stock.year')}
        <span className="mt-1 flex gap-2">
          <input name="minYear" defaultValue={props.minYear} placeholder={t('stock.from')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
          <input name="maxYear" defaultValue={props.maxYear} placeholder={t('stock.to')} className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm" />
        </span>
      </label>
      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
        <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background">
          {t('stock.filters')}
        </button>
        <a href="./occasions" className="rounded-full border border-line px-4 py-2 text-sm text-muted">
          {t('stock.reset')}
        </a>
      </div>
    </form>
  );
}

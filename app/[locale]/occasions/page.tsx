import {VehicleCard} from "@/components/public/VehicleCard";
import {Link} from "@/i18n/navigation";
import type {Category} from "@/lib/format";
import {getPublicVehicles} from "@/lib/vehicles";
import {getTranslations, setRequestLocale} from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function OccasionsPage({
  params,
  searchParams,
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{
    cat?: string;
    fuel?: string;
    minPrice?: string;
    maxPrice?: string;
    maxKm?: string;
    minYear?: string;
  }>;
}) {
  const {locale} = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("stock");

  const category = (query.cat === "voitures" || query.cat === "utilitaires" ? query.cat : "all") as
    | Category
    | "all";
  const vehicles = await getPublicVehicles({
    category,
    fuel: query.fuel || undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : undefined,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    maxKm: query.maxKm ? Number(query.maxKm) : undefined,
    minYear: query.minYear ? Number(query.minYear) : undefined,
  });

  const tabs = [
    {href: "/occasions", key: "all", label: t("all")},
    {href: "/occasions?cat=voitures", key: "voitures", label: t("cars")},
    {href: "/occasions?cat=utilitaires", key: "utilitaires", label: t("vans")},
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("lead")}</p>

      <div className="mt-6 flex gap-2">
        {tabs.map((tab) => {
          const active = (query.cat || "all") === tab.key || (!query.cat && tab.key === "all");
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`rounded-full px-4 py-2 text-sm ${active ? "bg-accent text-accent-ink" : "border border-border"}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <form className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-6">
        {query.cat ? <input type="hidden" name="cat" value={query.cat} /> : null}
        <input name="minPrice" defaultValue={query.minPrice} placeholder={t("minPrice")} className="rounded-xl border border-border bg-card-2 px-3 py-2 text-sm" />
        <input name="maxPrice" defaultValue={query.maxPrice} placeholder={t("maxPrice")} className="rounded-xl border border-border bg-card-2 px-3 py-2 text-sm" />
        <input name="maxKm" defaultValue={query.maxKm} placeholder={t("maxKm")} className="rounded-xl border border-border bg-card-2 px-3 py-2 text-sm" />
        <input name="minYear" defaultValue={query.minYear} placeholder={t("year")} className="rounded-xl border border-border bg-card-2 px-3 py-2 text-sm" />
        <select name="fuel" defaultValue={query.fuel || ""} className="rounded-xl border border-border bg-card-2 px-3 py-2 text-sm">
          <option value="">{t("fuel")}</option>
          <option value="essence">Essence</option>
          <option value="diesel">Diesel</option>
          <option value="hybride">Hybride</option>
          <option value="electrique">Électrique</option>
        </select>
        <button className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-accent-ink">{t("apply")}</button>
      </form>

      {vehicles.length === 0 ? (
        <p className="mt-10 text-muted">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

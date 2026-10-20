import {InquiryForm} from "@/components/public/InquiryForm";
import {VehicleGallery} from "@/components/public/VehicleGallery";
import {Link} from "@/i18n/navigation";
import {garage} from "@/lib/garage";
import {formatKm, formatPriceCents, vehicleTitle} from "@/lib/format";
import {descriptionForLocale, getVehicleBySlug} from "@/lib/vehicles";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle || vehicle.status === "draft" || vehicle.status === "sold") notFound();

  const t = await getTranslations();
  const title = vehicleTitle(vehicle);
  const description = descriptionForLocale(vehicle, locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/occasions" className="text-sm text-muted">
        ← {t("vehicle.back")}
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <VehicleGallery photos={vehicle.photos} title={title} />
          <h1 className="mt-6 font-[family-name:var(--font-outfit)] text-3xl md:text-4xl">{title}</h1>
          <p className="mt-2 text-2xl font-semibold text-accent">
            {formatPriceCents(vehicle.priceTtcCents, locale)}
          </p>
          <p className="text-sm text-muted">{t("stock.financing")}</p>
          {vehicle.status === "reserved" ? (
            <p className="mt-2 text-sm text-accent">{t("stock.reserved")}</p>
          ) : null}
          <p className="mt-6 whitespace-pre-line text-muted">{description}</p>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">{t("vehicle.specs")}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label={t("vehicle.year")} value={String(vehicle.year)} />
              <Row label={t("vehicle.mileage")} value={formatKm(vehicle.mileageKm, locale)} />
              <Row label={t("vehicle.fuel")} value={vehicle.fuel} />
              <Row label={t("vehicle.gearbox")} value={vehicle.gearbox} />
              <Row
                label={t("vehicle.category")}
                value={vehicle.category === "utilitaires" ? t("vehicle.catVans") : t("vehicle.catCars")}
              />
              {vehicle.priceHtCents ? (
                <Row label={t("vehicle.priceHt")} value={formatPriceCents(vehicle.priceHtCents, locale)} />
              ) : null}
              {vehicle.warranty ? <Row label={t("vehicle.warranty")} value={vehicle.warranty} /> : null}
            </dl>
            <a
              href={`tel:${garage.phoneTel}`}
              className="mt-5 inline-flex w-full justify-center rounded-full bg-accent px-4 py-3 font-semibold text-accent-ink"
            >
              {t("vehicle.call")}
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">{t("vehicle.inquiryTitle")}</h2>
            <div className="mt-4">
              <InquiryForm vehicleId={vehicle.id} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({label, value}: {label: string; value: string}) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 py-1">
      <dt className="text-muted">{label}</dt>
      <dd className="capitalize">{value}</dd>
    </div>
  );
}

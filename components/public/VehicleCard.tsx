import {Link} from "@/i18n/navigation";
import {formatKm, formatPriceCents, vehicleTitle} from "@/lib/format";
import type {VehicleWithPhotos} from "@/lib/vehicles";
import {getTranslations} from "next-intl/server";

export async function VehicleCard({
  vehicle,
  locale,
}: {
  vehicle: VehicleWithPhotos;
  locale: string;
}) {
  const t = await getTranslations("stock");
  const photo = vehicle.photos[0]?.url ?? "/placeholders/car.svg";
  const reserved = vehicle.status === "reserved";

  return (
    <Link
      href={`/occasions/${vehicle.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-card-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={vehicleTitle(vehicle)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {reserved ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
            {t("reserved")}
          </span>
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-muted">
          {vehicle.category === "utilitaires" ? t("vans") : t("cars")}
        </p>
        <h3 className="font-semibold leading-snug">{vehicleTitle(vehicle)}</h3>
        <p className="text-sm text-muted">
          {vehicle.year} · {formatKm(vehicle.mileageKm, locale)} · {vehicle.fuel}
        </p>
        <p className="text-lg font-semibold text-accent">
          {formatPriceCents(vehicle.priceTtcCents, locale)}
        </p>
        <p className="text-xs text-muted">{t("financing")}</p>
      </div>
    </Link>
  );
}

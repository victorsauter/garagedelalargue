import { garage } from "@/lib/garage";
import { formatKm, formatPriceCents, vehicleTitle } from "@/lib/format";

type PackVehicle = {
  brand: string;
  model: string;
  version?: string | null;
  trim?: string | null;
  year: number;
  mileageKm: number;
  fuel: string;
  gearbox: string;
  priceTtcCents?: number;
  priceHtCents?: number | null;
  priceTtc?: number;
  priceHt?: number | null;
  warranty?: string | null;
  descriptionFr: string;
  category: string;
};

export function buildLeboncoinPack(vehicle: PackVehicle) {
  const title = [
    vehicle.brand.toUpperCase(),
    vehicle.model.toUpperCase(),
    (vehicle.version || vehicle.trim)?.toUpperCase(),
    vehicle.year,
    `${vehicle.mileageKm} km`,
  ]
    .filter(Boolean)
    .join(" ");

  const ttc = vehicle.priceTtcCents != null ? vehicle.priceTtcCents / 100 : vehicle.priceTtc ?? 0;
  const ht =
    vehicle.priceHtCents != null
      ? vehicle.priceHtCents / 100
      : vehicle.priceHt ?? null;

  const lines = [
    vehicleTitle(vehicle),
    `${vehicle.year} · ${formatKm(vehicle.mileageKm)} · ${vehicle.fuel} · ${vehicle.gearbox}`,
    `Prix : ${formatPriceCents(Math.round(ttc * 100))}${ht ? ` TTC (${formatPriceCents(Math.round(ht * 100))} HT)` : " TTC"}`,
    vehicle.warranty ? `Garantie : ${vehicle.warranty}` : null,
    "Financement / reprise possible",
    "",
    vehicle.descriptionFr,
    "",
    `${garage.name} — Agent Renault`,
    garage.address.street,
    `${garage.address.postalCode} ${garage.address.city}`,
    garage.phoneDisplay,
    garage.email,
  ].filter((line) => line !== null);

  return {
    title,
    description: lines.join("\n"),
    depositUrl: garage.leboncoinDepositUrl,
  };
}

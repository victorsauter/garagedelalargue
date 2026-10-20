export type Category = "voitures" | "utilitaires";
export type VehicleStatus = "draft" | "published" | "reserved" | "sold";
export const fuelKeys = ["essence", "diesel", "hybride", "electrique"] as const;

export function formatPrice(amount: number, locale = "fr") {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceCents(cents: number, locale = "fr") {
  return formatPrice(cents / 100, locale);
}

export function formatKm(km: number, locale = "fr") {
  return `${new Intl.NumberFormat(
    locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "fr-FR",
  ).format(km)} km`;
}

export function vehicleTitle(vehicle: {
  brand: string;
  model: string;
  version?: string | null;
  trim?: string | null;
}) {
  return [vehicle.brand, vehicle.model, vehicle.version || vehicle.trim].filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

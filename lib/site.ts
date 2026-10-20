export const SITE = {
  name: "Garage de la Largue",
  legalName: "GARAGE DE LA LARGUE-MULLER",
  legalForm: "SARL",
  siren: "300115615",
  siret: "30011561500027",
  manager: "Franck Muller",
  addressLine: "8 rue d'Altkirch",
  postalCode: "68580",
  city: "Seppois-le-Bas",
  country: "France",
  phoneDisplay: "03 89 25 65 42",
  phoneTel: "+33389256542",
  email: "accueil@garagedelalargue.com",
  facebookUrl: "https://www.facebook.com/p/Garage-De-La-Largue-100057086334090/",
  leboncoinUrl:
    "https://www.leboncoin.fr/boutique/20236/garage_de_la_largue.htm",
  leboncoinDepositUrl: "https://www.leboncoin.fr/depot",
  domain: "garagedelalargue.fr",
  founded: 1976,
  mapsQuery: "8 rue d'Altkirch, 68580 Seppois-le-Bas",
  mapsEmbed:
    "https://maps.google.com/maps?q=8%20rue%20d%27Altkirch%2C%2068580%20Seppois-le-Bas&t=&z=16&ie=UTF8&iwloc=&output=embed",
} as const;

export function siteUrl(pathname = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  return `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function fullAddress() {
  return `${SITE.addressLine}, ${SITE.postalCode} ${SITE.city}`;
}

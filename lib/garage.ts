export const garage = {
  name: "Garage de la Largue",
  legalName: "GARAGE DE LA LARGUE-MULLER",
  legalForm: "SARL",
  siren: "300115615",
  siret: "30011561500027",
  tvaIntra: "FR35300115615",
  gerant: "Franck Muller",
  founded: 1976,
  address: {
    street: "8 rue d'Altkirch",
    postalCode: "68580",
    city: "Seppois-le-Bas",
    country: "France",
    region: "Haut-Rhin",
  },
  phoneDisplay: "03 89 25 65 42",
  phoneTel: "+33389256542",
  email: "accueil@garagedelalargue.com",
  facebookUrl: "https://www.facebook.com/p/Garage-De-La-Largue-100057086334090/",
  leboncoinUrl: "https://www.leboncoin.fr/boutique/20236/garage_de_la_largue.htm",
  leboncoinDepositUrl: "https://www.leboncoin.fr/deposer-une-annonce",
  mapsQuery: "8 rue d'Altkirch, 68580 Seppois-le-Bas",
  mapsEmbed:
    "https://maps.google.com/maps?q=8%20rue%20d%27Altkirch%2C%2068580%20Seppois-le-Bas&t=&z=16&ie=UTF8&iwloc=&output=embed",
  branding: {
    agent: "Agent Renault",
    note: "Renault only — no Dacia branding on this site.",
  },
} as const;

export const openingHours = [
  { days: [1, 2, 3, 4, 5], labelFr: "Lundi – vendredi", open: "08:00", close: "12:00", open2: "14:00", close2: "18:00" },
  { days: [6], labelFr: "Samedi", open: "08:00", close: "12:30" },
  { days: [0], labelFr: "Dimanche", closed: true },
] as const;

export const reviews = [
  {
    quote: "Accueil chaleureux, atelier soigné. On revient les yeux fermés.",
    author: "Marie L.",
    place: "Dannemarie",
  },
  {
    quote: "Kangoo acheté ici : état et prix transparents, papiers nickel.",
    author: "Thomas R.",
    place: "Altkirch",
  },
  {
    quote: "Révision rapide, conseils clairs. Un vrai garage de confiance.",
    author: "Familie Weber",
    place: "Feldbach",
  },
] as const;

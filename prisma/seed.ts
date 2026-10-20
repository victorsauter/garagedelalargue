import {hashSync} from 'bcryptjs';
import {PrismaClient} from '@prisma/client';
import {slugify} from '../lib/format';

const prisma = new PrismaClient();

const staff = [
  {email: 'accueil@garagedelalargue.com', name: 'Accueil', password: 'changeme'},
  {email: 'franck@garagedelalargue.com', name: 'Franck Muller', password: 'changeme'},
  {email: 'atelier@garagedelalargue.com', name: 'Atelier', password: 'changeme'},
];

const photos = {
  van: [
    'https://images.unsplash.com/photo-1527786356703-4b32b08b0407?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1600&q=80',
  ],
  hatch: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80',
  ],
  suv: [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=80',
  ],
  mpv: [
    'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
  ],
};

type SeedVehicle = {
  category: 'voitures' | 'utilitaires';
  brand: string;
  model: string;
  version: string;
  year: number;
  mileageKm: number;
  fuel: string;
  gearbox: string;
  priceTtcCents: number;
  priceHtCents?: number;
  warranty: string;
  descriptionFr: string;
  gallery: string[];
};

const vehicles: SeedVehicle[] = [
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo',
    version: 'Grand Volume Extra R-Link Blue dCi 95',
    year: 2020,
    mileageKm: 52552,
    fuel: 'diesel',
    gearbox: 'manuelle',
    priceTtcCents: 1455000,
    priceHtCents: 1212500,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo Grand Volume Extra, Blue dCi 95, R-Link. Utilitaire 2 places, volume généreux, entretien garage. Idéal artisans. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Peugeot',
    model: 'Partner',
    version: '1.6 VTi 98 Premium Pack',
    year: 2018,
    mileageKm: 58135,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 1265000,
    priceHtCents: 1054100,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Peugeot Partner Premium Pack, 1.6 VTi 98 essence. Utilitaire souple, bon volume, pack confort. Contrôlé à l’atelier. Financement / reprise possible.',
  },
  {
    category: 'voitures',
    brand: 'Renault',
    model: 'Captur',
    version: '1.3 TCe 160 Techno EDC',
    year: 2024,
    mileageKm: 22075,
    fuel: 'essence',
    gearbox: 'automatique',
    priceTtcCents: 2190000,
    warranty: '12 mois',
    gallery: photos.suv,
    descriptionFr:
      'Captur Techno EDC, TCe 160, boîte automatique. SUV compact récent, faible kilométrage, finition Techno. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo',
    version: 'Blue dCi 95 Extra R-Link',
    year: 2019,
    mileageKm: 54990,
    fuel: 'diesel',
    gearbox: 'manuelle',
    priceTtcCents: 1350000,
    priceHtCents: 1125000,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo Extra R-Link, Blue dCi 95. Utilitaire 2 places, GPS R-Link, entretien suivi. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo',
    version: 'dCi 90 Grand Confort',
    year: 2019,
    mileageKm: 109070,
    fuel: 'diesel',
    gearbox: 'manuelle',
    priceTtcCents: 1080000,
    priceHtCents: 900000,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo dCi 90 Grand Confort. Utilitaire diesel, climatisation, bon rapport usage / budget. Contrôlé atelier. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo',
    version: 'TCe 115 Confort',
    year: 2018,
    mileageKm: 26495,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 1250000,
    priceHtCents: 1041600,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo TCe 115 Confort essence, très faible kilométrage pour l’année. Idéal trajets mixtes. Financement / reprise possible.',
  },
  {
    category: 'voitures',
    brand: 'Renault',
    model: 'Grand Scénic',
    version: '7 places TCe 140 Evolution',
    year: 2023,
    mileageKm: 54880,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 2199000,
    warranty: '12 mois',
    gallery: photos.mpv,
    descriptionFr:
      'Grand Scénic 7 places, TCe 140 Evolution. Familiale récente, habitabilité et coffre. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo',
    version: 'Blue dCi 115 Extra R-Link',
    year: 2020,
    mileageKm: 68000,
    fuel: 'diesel',
    gearbox: 'manuelle',
    priceTtcCents: 1399000,
    priceHtCents: 1165800,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo Extra R-Link Blue dCi 115. Motorisation plus coupleuse, R-Link, volume de charge. Financement / reprise possible.',
  },
  {
    category: 'voitures',
    brand: 'Renault',
    model: 'Clio',
    version: 'TCe 90 Evolution',
    year: 2023,
    mileageKm: 24590,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 1499000,
    warranty: '12 mois',
    gallery: photos.hatch,
    descriptionFr:
      'Clio TCe 90 Evolution, 2023, 24 590 km. Citadine récente, économique, garantie 12 mois. Financement / reprise possible.',
  },
  {
    category: 'utilitaires',
    brand: 'Renault',
    model: 'Kangoo Van',
    version: 'TCe 130 Grand Confort',
    year: 2023,
    mileageKm: 3260,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 1965000,
    priceHtCents: 1637500,
    warranty: '12 mois',
    gallery: photos.van,
    descriptionFr:
      'Kangoo 3 Van TCe 130 Grand Confort, quasi neuf (3 260 km). Utilitaire essence récent. Financement / reprise possible.',
  },
  {
    category: 'voitures',
    brand: 'Renault',
    model: 'Clio',
    version: 'TCe 90 Esprit Alpine',
    year: 2025,
    mileageKm: 9300,
    fuel: 'essence',
    gearbox: 'manuelle',
    priceTtcCents: 2080000,
    warranty: '12 mois',
    gallery: photos.hatch,
    descriptionFr:
      'Clio Esprit Alpine TCe 90, millésime 2025, 9 300 km. Finition sportive, état neuf. Financement / reprise possible.',
  },
];

async function main() {
  await prisma.publishLog.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.vehiclePhoto.deleteMany();
  await prisma.vehicleTranslation.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.staffUser.deleteMany();

  for (const person of staff) {
    await prisma.staffUser.create({
      data: {
        email: person.email,
        name: person.name,
        passwordHash: hashSync(person.password, 10),
      },
    });
  }

  for (const [index, vehicle] of vehicles.entries()) {
    const baseSlug = slugify(`${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`);
    const slug = `${baseSlug}-${index + 1}`;
    await prisma.vehicle.create({
      data: {
        slug,
        status: 'published',
        category: vehicle.category,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        mileageKm: vehicle.mileageKm,
        fuel: vehicle.fuel,
        gearbox: vehicle.gearbox,
        priceTtcCents: vehicle.priceTtcCents,
        priceHtCents: vehicle.priceHtCents ?? null,
        warranty: vehicle.warranty,
        descriptionFr: vehicle.descriptionFr,
        photos: {
          create: vehicle.gallery.map((url, sortOrder) => ({
            url,
            alt: `${vehicle.brand} ${vehicle.model}`,
            sortOrder,
          })),
        },
        translations: {
          create: [
            {
              locale: 'de',
              description: `${vehicle.brand} ${vehicle.model} ${vehicle.version} — Fahrzeug der Garage de la Largue. Finanzierung / Inzahlungnahme möglich.`,
            },
            {
              locale: 'en',
              description: `${vehicle.brand} ${vehicle.model} ${vehicle.version} — used vehicle from Garage de la Largue. Finance / part-exchange available.`,
            },
          ],
        },
      },
    });
  }

  console.log(`Seeded ${staff.length} staff and ${vehicles.length} vehicles.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import {Prisma} from '@prisma/client';
import {prisma} from '@/lib/prisma';
import type {Category} from '@/lib/format';

const publicStatuses = ['published', 'reserved'] as const;

export type VehicleWithPhotos = Prisma.VehicleGetPayload<{
  include: {photos: true; translations: true};
}>;

export async function getPublicVehicles(filters?: {
  category?: Category | 'all';
  minPrice?: number;
  maxPrice?: number;
  minKm?: number;
  maxKm?: number;
  fuel?: string;
  minYear?: number;
  maxYear?: number;
}) {
  return prisma.vehicle.findMany({
    where: {
      status: {in: [...publicStatuses]},
      category: filters?.category && filters.category !== 'all' ? filters.category : undefined,
      fuel: filters?.fuel || undefined,
      priceTtcCents: {
        gte: filters?.minPrice != null ? filters.minPrice * 100 : undefined,
        lte: filters?.maxPrice != null ? filters.maxPrice * 100 : undefined,
      },
      mileageKm: {
        gte: filters?.minKm,
        lte: filters?.maxKm,
      },
      year: {
        gte: filters?.minYear,
        lte: filters?.maxYear,
      },
    },
    include: {photos: {orderBy: {sortOrder: 'asc'}}, translations: true},
    orderBy: [{status: 'asc'}, {createdAt: 'desc'}],
  });
}

export async function getFeaturedVehicles(limit = 4) {
  return prisma.vehicle.findMany({
    where: {status: 'published'},
    include: {photos: {orderBy: {sortOrder: 'asc'}}, translations: true},
    orderBy: {createdAt: 'desc'},
    take: limit,
  });
}

export async function getVehicleBySlug(slug: string) {
  return prisma.vehicle.findUnique({
    where: {slug},
    include: {photos: {orderBy: {sortOrder: 'asc'}}, translations: true},
  });
}

export function descriptionForLocale(vehicle: VehicleWithPhotos, locale: string) {
  if (locale === 'fr') return vehicle.descriptionFr;
  return vehicle.translations.find((t) => t.locale === locale)?.description ?? vehicle.descriptionFr;
}

"use server";

import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {slugify} from "@/lib/format";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

async function staff() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

function eurosToCents(value: FormDataEntryValue | null) {
  const n = Number(String(value ?? "").replace(",", "."));
  if (Number.isNaN(n)) return 0;
  return Math.round(n * 100);
}

function vehiclePayload(formData: FormData) {
  return {
    status: String(formData.get("status") || "draft"),
    category: String(formData.get("category") || "voitures"),
    brand: String(formData.get("brand") || "").trim(),
    model: String(formData.get("model") || "").trim(),
    version: String(formData.get("version") || "").trim() || null,
    year: Number(formData.get("year") || 0),
    mileageKm: Number(formData.get("mileageKm") || 0),
    fuel: String(formData.get("fuel") || "essence"),
    gearbox: String(formData.get("gearbox") || "manuelle"),
    priceTtcCents: eurosToCents(formData.get("priceTtc")),
    priceHtCents: formData.get("priceHt") ? eurosToCents(formData.get("priceHt")) : null,
    warranty: String(formData.get("warranty") || "").trim() || null,
    descriptionFr: String(formData.get("descriptionFr") || "").trim(),
    leboncoinUrl: String(formData.get("leboncoinUrl") || "").trim() || null,
  };
}

export async function createVehicle(formData: FormData) {
  await staff();
  const data = vehiclePayload(formData);
  const slug = `${slugify(`${data.brand} ${data.model} ${data.version ?? ""} ${data.year}`)}-${Date.now().toString(36)}`;
  const vehicle = await prisma.vehicle.create({data: {...data, slug}});
  const de = String(formData.get("descriptionDe") || "").trim();
  const en = String(formData.get("descriptionEn") || "").trim();
  if (de) {
    await prisma.vehicleTranslation.upsert({
      where: {vehicleId_locale: {vehicleId: vehicle.id, locale: "de"}},
      update: {description: de},
      create: {vehicleId: vehicle.id, locale: "de", description: de},
    });
  }
  if (en) {
    await prisma.vehicleTranslation.upsert({
      where: {vehicleId_locale: {vehicleId: vehicle.id, locale: "en"}},
      update: {description: en},
      create: {vehicleId: vehicle.id, locale: "en", description: en},
    });
  }
  revalidatePath("/admin");
  redirect(`/admin/vehicles/${vehicle.id}`);
}

export async function updateVehicle(id: string, formData: FormData) {
  await staff();
  const data = vehiclePayload(formData);
  await prisma.vehicle.update({where: {id}, data});
  const de = String(formData.get("descriptionDe") || "").trim();
  const en = String(formData.get("descriptionEn") || "").trim();
  await prisma.vehicleTranslation.upsert({
    where: {vehicleId_locale: {vehicleId: id, locale: "de"}},
    update: {description: de},
    create: {vehicleId: id, locale: "de", description: de},
  });
  await prisma.vehicleTranslation.upsert({
    where: {vehicleId_locale: {vehicleId: id, locale: "en"}},
    update: {description: en},
    create: {vehicleId: id, locale: "en", description: en},
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/vehicles/${id}`);
  redirect(`/admin/vehicles/${id}`);
}

export async function deleteVehicle(id: string) {
  await staff();
  await prisma.vehicle.delete({where: {id}});
  revalidatePath("/admin");
  redirect("/admin");
}

export async function saveLeboncoinUrl(id: string, formData: FormData) {
  await staff();
  await prisma.vehicle.update({
    where: {id},
    data: {leboncoinUrl: String(formData.get("leboncoinUrl") || "").trim() || null},
  });
  await prisma.publishLog.create({
    data: {vehicleId: id, channel: "leboncoin", status: "prepared", detail: "URL enregistrée"},
  });
  revalidatePath(`/admin/vehicles/${id}`);
}

export async function saveFacebookSettings(formData: FormData) {
  await staff();
  const {setSetting} = await import("@/lib/settings");
  await setSetting("facebookPageId", String(formData.get("facebookPageId") || "").trim());
  await setSetting("facebookPageToken", String(formData.get("facebookPageToken") || "").trim());
  redirect("/admin/settings");
}

export async function deletePhoto(photoId: string) {
  await staff();
  const photo = await prisma.vehiclePhoto.findUnique({where: {id: photoId}});
  if (!photo) return;
  await prisma.vehiclePhoto.delete({where: {id: photoId}});
  revalidatePath(`/admin/vehicles/${photo.vehicleId}`);
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import { toAbsoluteAssetUrl } from "./uploads";
import { vehicleTitle } from "./format";

type FacebookPostInput = {
  pageId: string;
  pageToken: string;
  graphVersion?: string;
  message: string;
  link: string;
  photoUrls: string[];
};

async function graphFetch(
  url: string,
  init: RequestInit,
): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const response = await fetch(url, init);
  const data = (await response.json()) as Record<string, unknown>;
  return { ok: response.ok && !data.error, data };
}

async function photoAsBlob(url: string): Promise<Blob | null> {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.blob();
  }
  if (url.startsWith("/uploads/") || url.startsWith("/placeholders/")) {
    const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));
    const buffer = await readFile(filePath);
    return new Blob([new Uint8Array(buffer)]);
  }
  return null;
}

export async function postToFacebookPage(input: FacebookPostInput) {
  const version = input.graphVersion || "v21.0";
  const base = `https://graph.facebook.com/${version}/${input.pageId}`;
  const token = input.pageToken;

  const unpublishedIds: string[] = [];
  for (const photoUrl of input.photoUrls.slice(0, 10)) {
    const form = new FormData();
    form.set("published", "false");
    form.set("access_token", token);
    const blob = await photoAsBlob(photoUrl);
    if (blob) {
      form.set("source", blob, "photo.jpg");
    } else {
      form.set("url", toAbsoluteAssetUrl(photoUrl));
    }
    const { ok, data } = await graphFetch(`${base}/photos`, {
      method: "POST",
      body: form,
    });
    if (ok && typeof data.id === "string") {
      unpublishedIds.push(data.id);
    }
  }

  const body = new URLSearchParams();
  body.set("message", `${input.message}\n\n${input.link}`);
  body.set("link", input.link);
  body.set("access_token", token);
  unpublishedIds.forEach((id, index) => {
    body.set(`attached_media[${index}]`, JSON.stringify({ media_fbid: id }));
  });

  const { ok, data } = await graphFetch(`${base}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!ok) {
    const error = data.error as { message?: string } | undefined;
    throw new Error(error?.message || "Facebook Graph API error");
  }

  return { postId: String(data.id ?? ""), raw: data };
}

export function buildFacebookCaption(vehicle: {
  brand: string;
  model: string;
  version?: string | null;
  trim?: string | null;
  year: number;
  mileageKm: number;
  fuel: string;
  gearbox: string;
  priceTtcCents?: number;
  priceTtc?: number;
}) {
  const title = vehicleTitle(vehicle);
  const euros =
    vehicle.priceTtcCents != null ? vehicle.priceTtcCents / 100 : (vehicle.priceTtc ?? 0);
  return [
    `🚗 ${title} — ${vehicle.year}`,
    `${vehicle.mileageKm.toLocaleString("fr-FR")} km · ${vehicle.fuel} · ${vehicle.gearbox}`,
    `${euros.toLocaleString("fr-FR")} € TTC`,
    "Financement / reprise possible",
    "",
    "Garage de la Largue — 8 rue d'Altkirch, 68580 Seppois-le-Bas",
    "03 89 25 65 42",
  ].join("\n");
}

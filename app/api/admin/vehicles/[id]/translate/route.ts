import {auth} from "@/auth";
import {deeplConfigured, translateFr} from "@/lib/deepl";
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(
  _request: Request,
  {params}: {params: Promise<{id: string}>},
) {
  const session = await auth();
  if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});
  if (!deeplConfigured()) {
    return NextResponse.json(
      {error: "DEEPL_API_KEY manquant. Saisissez DE/EN à la main."},
      {status: 400},
    );
  }
  const {id} = await params;
  const vehicle = await prisma.vehicle.findUnique({where: {id}});
  if (!vehicle) return NextResponse.json({error: "Introuvable"}, {status: 404});

  try {
    const [de, en] = await Promise.all([
      translateFr(vehicle.descriptionFr, "DE"),
      translateFr(vehicle.descriptionFr, "EN"),
    ]);
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
    return NextResponse.json({ok: true});
  } catch (error) {
    const message = error instanceof Error ? error.message : "DeepL error";
    return NextResponse.json({error: message}, {status: 502});
  }
}

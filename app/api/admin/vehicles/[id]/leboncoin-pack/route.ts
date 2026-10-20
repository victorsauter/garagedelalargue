import {NextRequest, NextResponse} from "next/server";
import JSZip from "jszip";
import {readFile} from "fs/promises";
import path from "path";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {buildLeboncoinPack} from "@/lib/leboncoin";
import {slugify} from "@/lib/format";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const {id} = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: {id},
    include: {photos: {orderBy: {sortOrder: "asc"}}},
  });
  if (!vehicle) {
    return NextResponse.json({error: "Not found"}, {status: 404});
  }

  const download = request.nextUrl.searchParams.get("download") === "1";
  const pack = buildLeboncoinPack(vehicle);

  if (!download) {
    await prisma.publishLog.create({
      data: {vehicleId: id, channel: "leboncoin", status: "prepared", detail: "pack texte"},
    });
    return NextResponse.json(pack);
  }

  const zip = new JSZip();
  for (const [index, photo] of vehicle.photos.entries()) {
    const name = `${String(index + 1).padStart(2, "0")}.jpg`;
    try {
      if (photo.url.startsWith("http")) {
        const res = await fetch(photo.url);
        if (!res.ok) continue;
        zip.file(name, Buffer.from(await res.arrayBuffer()));
      } else {
        const filePath = path.join(process.cwd(), "public", photo.url.replace(/^\//, ""));
        zip.file(name, await readFile(filePath));
      }
    } catch {
      // skip missing photo
    }
  }

  const bytes = await zip.generateAsync({type: "uint8array"});
  const filename = `${slugify(`${vehicle.brand}-${vehicle.model}`)}-photos.zip`;
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

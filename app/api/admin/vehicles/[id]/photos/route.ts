import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {saveUpload} from "@/lib/uploads";
import {NextResponse} from "next/server";

export async function POST(
  request: Request,
  {params}: {params: Promise<{id: string}>},
) {
  const session = await auth();
  if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});
  const {id} = await params;
  const form = await request.formData();
  const files = form.getAll("files").filter((value): value is File => value instanceof File);
  const existing = await prisma.vehiclePhoto.count({where: {vehicleId: id}});
  const created = [];
  for (const [index, file] of files.entries()) {
    const url = await saveUpload(file);
    created.push(
      await prisma.vehiclePhoto.create({
        data: {vehicleId: id, url, sortOrder: existing + index, alt: file.name},
      }),
    );
  }
  return NextResponse.json({ok: true, photos: created});
}

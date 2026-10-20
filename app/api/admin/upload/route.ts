import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {saveUpload} from "@/lib/uploads";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const form = await request.formData();
  const file = form.get("file");
  const vehicleId = String(form.get("vehicleId") ?? "");
  if (!(file instanceof File)) {
    return NextResponse.json({error: "Missing file"}, {status: 400});
  }

  try {
    const url = await saveUpload(file);
    if (vehicleId) {
      const count = await prisma.vehiclePhoto.count({where: {vehicleId}});
      await prisma.vehiclePhoto.create({
        data: {vehicleId, url, sortOrder: count, alt: file.name},
      });
    }
    return NextResponse.json({url});
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({error: message}, {status: 400});
  }
}

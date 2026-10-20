import {NextResponse} from "next/server";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {postToFacebookPage, buildFacebookCaption} from "@/lib/facebook";
import {getFacebookCredentials} from "@/lib/settings";
import {siteUrl} from "@/lib/site";

export async function POST(_request: Request, {params}: {params: Promise<{id: string}>}) {
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

  const facebook = await getFacebookCredentials();
  if (!facebook.configured) {
    return NextResponse.json(
      {
        error:
          "Facebook n’est pas configuré. Renseignez l’ID de page et le jeton dans Admin > Réglages.",
      },
      {status: 400},
    );
  }

  try {
    const result = await postToFacebookPage({
      pageId: facebook.pageId,
      pageToken: facebook.pageToken,
      graphVersion: facebook.graphVersion,
      message: buildFacebookCaption(vehicle),
      link: siteUrl(`/fr/occasions/${vehicle.slug}`),
      photoUrls: vehicle.photos.map((photo) => photo.url),
    });
    await prisma.vehicle.update({where: {id}, data: {facebookPostId: result.postId}});
    await prisma.publishLog.create({
      data: {vehicleId: id, channel: "facebook", status: "success", detail: result.postId},
    });
    return NextResponse.json({ok: true, id: result.postId});
  } catch (error) {
    const message = error instanceof Error ? error.message : "Facebook error";
    await prisma.publishLog.create({
      data: {vehicleId: id, channel: "facebook", status: "error", detail: message},
    });
    return NextResponse.json({error: message}, {status: 400});
  }
}

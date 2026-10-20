import { prisma } from "./prisma";

export async function getSetting(key: string) {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? "";
}

export async function setSetting(key: string, value: string) {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getFacebookCredentials() {
  const pageId =
    (await getSetting("facebookPageId")) || process.env.FACEBOOK_PAGE_ID || "";
  const pageToken =
    (await getSetting("facebookPageToken")) ||
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    "";
  const graphVersion =
    process.env.FACEBOOK_GRAPH_VERSION || "v21.0";
  return { pageId, pageToken, graphVersion, configured: Boolean(pageId && pageToken) };
}

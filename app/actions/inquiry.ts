"use server";

import {sendInquiryEmail} from "@/lib/email";
import {prisma} from "@/lib/prisma";
import {z} from "zod";

export type InquiryState = {ok: boolean; error: string};

const schema = z.object({
  type: z.enum(["rdv", "essai", "achat", "reprise"]),
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(4),
  preferredDate: z.string().optional(),
  vehicleNeed: z.string().optional(),
  vehicleId: z.string().optional(),
  rgpdConsent: z.literal("on"),
});

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = schema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    preferredDate: formData.get("preferredDate") || undefined,
    vehicleNeed: formData.get("vehicleNeed") || undefined,
    vehicleId: formData.get("vehicleId") || undefined,
    rgpdConsent: formData.get("rgpdConsent"),
  });

  if (!parsed.success) {
    return {ok: false, error: "invalid"};
  }

  const data = parsed.data;
  const vehicle = data.vehicleId
    ? await prisma.vehicle.findUnique({where: {id: data.vehicleId}})
    : null;

  const emailed = await sendInquiryEmail({
    type: data.type,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    preferredDate: data.preferredDate,
    vehicleNeed: data.vehicleNeed,
    vehicleLabel: vehicle ? `${vehicle.brand} ${vehicle.model}` : null,
  });

  await prisma.inquiry.create({
    data: {
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      preferredDate: data.preferredDate,
      vehicleNeed: data.vehicleNeed,
      vehicleId: vehicle?.id,
      rgpdConsent: true,
      emailed: emailed.emailed,
    },
  });

  return {ok: true, error: ""};
}

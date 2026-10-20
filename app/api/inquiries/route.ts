import {NextResponse} from 'next/server';
import {z} from 'zod';
import {prisma} from '@/lib/prisma';
import {sendInquiryEmail} from '@/lib/email';

const schema = z.object({
  type: z.string().default('contact'),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  preferredDate: z.string().optional(),
  vehicleNeed: z.string().optional(),
  vehicleId: z.string().optional(),
  vehicleLabel: z.string().optional(),
  rgpdConsent: z.union([z.literal('true'), z.literal(true), z.boolean()]),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({error: 'Invalid payload'}, {status: 400});
  }

  const data = parsed.data;
  const consent = data.rgpdConsent === true || data.rgpdConsent === 'true';
  if (!consent) {
    return NextResponse.json({error: 'RGPD consent required'}, {status: 400});
  }

  const type = ['rdv', 'essai', 'achat', 'reprise', 'contact'].includes(data.type)
    ? data.type
    : 'contact';

  const emailResult = await sendInquiryEmail({
    type,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    preferredDate: data.preferredDate,
    vehicleNeed: data.vehicleNeed,
    vehicleLabel: data.vehicleLabel,
  });

  await prisma.inquiry.create({
    data: {
      type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      preferredDate: data.preferredDate,
      vehicleNeed: data.vehicleNeed,
      vehicleId: data.vehicleId || null,
      rgpdConsent: true,
      emailed: emailResult.emailed,
    },
  });

  return NextResponse.json({ok: true, emailed: emailResult.emailed});
}

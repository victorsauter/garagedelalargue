import {Resend} from 'resend';
import {garage} from '@/lib/garage';

export type InquiryEmail = {
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  preferredDate?: string | null;
  vehicleNeed?: string | null;
  vehicleLabel?: string | null;
};

export async function sendInquiryEmail(inquiry: InquiryEmail) {
  const to = process.env.INQUIRY_TO_EMAIL || garage.email;
  const from = process.env.INQUIRY_FROM_EMAIL || `Garage de la Largue <${garage.email}>`;
  const subject = `[${garage.name}] ${inquiry.type.toUpperCase()} — ${inquiry.name}`;
  const text = [
    `Type : ${inquiry.type}`,
    `Nom : ${inquiry.name}`,
    `Email : ${inquiry.email}`,
    inquiry.phone ? `Téléphone : ${inquiry.phone}` : null,
    inquiry.preferredDate ? `Date souhaitée : ${inquiry.preferredDate}` : null,
    inquiry.vehicleNeed ? `Véhicule / besoin : ${inquiry.vehicleNeed}` : null,
    inquiry.vehicleLabel ? `Annonce : ${inquiry.vehicleLabel}` : null,
    '',
    inquiry.message,
  ]
    .filter(Boolean)
    .join('\n');

  if (!process.env.RESEND_API_KEY) {
    console.info('[inquiry:no-resend]', {to, subject, text});
    return {emailed: false};
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: inquiry.email,
    subject,
    text,
  });

  if (result.error) {
    console.error('[inquiry:resend-error]', result.error);
    return {emailed: false};
  }

  return {emailed: true};
}

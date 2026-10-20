"use client";

import {submitInquiry} from "@/app/actions/inquiry";
import {useActionState} from "react";
import {useTranslations} from "next-intl";

const initial = {ok: false, error: ""};

export function InquiryForm({vehicleId}: {vehicleId?: string}) {
  const t = useTranslations("forms");
  const [state, action, pending] = useActionState(submitInquiry, initial);

  if (state.ok) {
    return (
      <p className="rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-4 text-sm">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-3">
      {vehicleId ? <input type="hidden" name="vehicleId" value={vehicleId} /> : null}
      <fieldset className="space-y-2">
        <legend className="text-sm text-muted">{t("intent")}</legend>
        <div className="flex flex-wrap gap-3 text-sm">
          {(["essai", "achat", "reprise"] as const).map((type) => (
            <label key={type} className="inline-flex items-center gap-2">
              <input type="radio" name="type" value={type} defaultChecked={type === "essai"} required />
              {t(type)}
            </label>
          ))}
        </div>
      </fieldset>
      <Field name="name" label={t("name")} required />
      <Field name="email" label={t("email")} type="email" required />
      <Field name="phone" label={t("phone")} type="tel" />
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t("message")}</span>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-xl border border-border bg-card-2 px-3 py-2"
        />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="rgpdConsent" value="on" required className="mt-1" />
        <span>{t("rgpd")}</span>
      </label>
      {state.error ? <p className="text-sm text-red-400">{t("error")}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-4 py-3 font-semibold text-accent-ink disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

export function RdvForm() {
  const t = useTranslations("forms");
  const [state, action, pending] = useActionState(submitInquiry, initial);

  if (state.ok) {
    return (
      <p className="rounded-xl border border-emerald-700/40 bg-emerald-950/30 p-4 text-sm">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="type" value="rdv" />
      <Field name="name" label={t("name")} required />
      <Field name="email" label={t("email")} type="email" required />
      <Field name="phone" label={t("phone")} type="tel" />
      <Field name="preferredDate" label={t("date")} type="date" />
      <Field name="vehicleNeed" label={t("vehicle")} />
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t("need")}</span>
        <textarea name="message" required rows={4} className="w-full rounded-xl border border-border bg-card-2 px-3 py-2" />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="rgpdConsent" value="on" required className="mt-1" />
        <span>{t("rgpd")}</span>
      </label>
      {state.error ? <p className="text-sm text-red-400">{t("error")}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-4 py-3 font-semibold text-accent-ink disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-card-2 px-3 py-2"
      />
    </label>
  );
}

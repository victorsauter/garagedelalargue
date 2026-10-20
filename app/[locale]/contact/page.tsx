import {garage} from "@/lib/garage";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">{t("contact.title")}</h1>
      <p className="mt-2 text-muted">{t("contact.lead")}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border bg-card p-6 text-sm">
          <p>
            <span className="block text-muted">{t("contact.phone")}</span>
            <a href={`tel:${garage.phoneTel}`} className="text-lg text-accent">
              {garage.phoneDisplay}
            </a>
          </p>
          <p>
            <span className="block text-muted">{t("contact.email")}</span>
            <a href={`mailto:${garage.email}`}>{garage.email}</a>
          </p>
          <p>
            <span className="block text-muted">{t("contact.address")}</span>
            {garage.address.street}
            <br />
            {garage.address.postalCode} {garage.address.city}
          </p>
          <p>
            <span className="block text-muted">{t("contact.hours")}</span>
            {t("contact.weekdays")}: {t("hours.weekdays")}
            <br />
            {t("contact.saturday")}: {t("hours.saturday")}
            <br />
            {t("contact.sunday")}: {t("hours.sunday")}
          </p>
          <p>
            <span className="block text-muted">{t("contact.social")}</span>
            <a href={garage.facebookUrl} className="text-accent" target="_blank" rel="noreferrer">
              Facebook
            </a>
            {" · "}
            <a href={garage.leboncoinUrl} className="text-accent" target="_blank" rel="noreferrer">
              Leboncoin
            </a>
          </p>
        </div>
        <iframe title={t("contact.map")} src={garage.mapsEmbed} className="h-80 w-full rounded-3xl border border-border" loading="lazy" />
      </div>
    </div>
  );
}

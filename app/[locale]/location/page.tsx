import {garage} from "@/lib/garage";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function LocationPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">{t("rental.title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("rental.lead")}</p>
      <p className="mt-4 text-sm text-muted">{t("rental.note")}</p>
      <a
        href={`tel:${garage.phoneTel}`}
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
      >
        {t("rental.cta")}
      </a>
    </div>
  );
}

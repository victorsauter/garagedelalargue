import {RdvForm} from "@/components/public/InquiryForm";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function AtelierPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <h1 className="font-[family-name:var(--font-outfit)] text-4xl">{t("workshop.title")}</h1>
        <p className="mt-4 text-muted">{t("workshop.lead")}</p>
        <ul className="mt-6 space-y-3">
          <li>{t("workshop.points.all")}</li>
          <li>{t("workshop.points.onSite")}</li>
          <li>{t("workshop.points.rdv")}</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">{t("workshop.formTitle")}</h2>
        <div className="mt-4">
          <RdvForm />
        </div>
      </div>
    </div>
  );
}

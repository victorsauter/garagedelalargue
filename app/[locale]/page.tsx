import {VehicleCard} from "@/components/public/VehicleCard";
import {Link} from "@/i18n/navigation";
import {garage, reviews} from "@/lib/garage";
import {getOpenState} from "@/lib/hours";
import {getFeaturedVehicles} from "@/lib/vehicles";
import {getTranslations, setRequestLocale} from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = await getFeaturedVehicles(4);
  const open = getOpenState().isOpen;

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#2a2410,transparent_40%),linear-gradient(180deg,#12161c,#090b0e)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">{t("brand.agent")}</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-outfit)] text-4xl font-semibold leading-tight md:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("home.heroLead")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/occasions" className="rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink">
              {t("home.ctaStock")}
            </Link>
            <Link href="/atelier" className="rounded-full border border-border px-5 py-3">
              {t("home.ctaWorkshop")}
            </Link>
            <a href={`tel:${garage.phoneTel}`} className="rounded-full px-5 py-3 text-muted">
              {t("home.ctaCall")}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl">{t("home.stockTitle")}</h2>
          <p className="mt-2 text-muted">{t("home.stockLead")}</p>
          <div className="mt-6 grid gap-4">
            {featured.slice(0, 2).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
            ))}
          </div>
          <Link href="/occasions" className="mt-6 inline-block text-accent">
            {t("home.stockAll")} →
          </Link>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl">{t("home.workshopTitle")}</h2>
          <p className="mt-2 text-muted">{t("home.workshopLead")}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>{t("workshop.points.all")}</li>
            <li>{t("workshop.points.onSite")}</li>
            <li>{t("workshop.points.rdv")}</li>
          </ul>
          <Link
            href="/atelier"
            className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink"
          >
            {t("home.workshopCta")}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl">{t("home.hoursTitle")}</h2>
          <p className="mt-3 text-sm text-accent">{open ? t("sticky.open") : t("sticky.closed")}</p>
          <p className="mt-4 text-sm text-muted">
            {t("contact.weekdays")}: {t("hours.weekdays")}
            <br />
            {t("contact.saturday")}: {t("hours.saturday")}
            <br />
            {t("contact.sunday")}: {t("hours.sunday")}
          </p>
          <p className="mt-4 text-sm">
            {garage.address.street}, {garage.address.postalCode} {garage.address.city}
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title={t("contact.map")}
            src={garage.mapsEmbed}
            className="h-64 w-full md:h-full min-h-64"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl">{t("home.quotesTitle")}</h2>
        <p className="mt-1 text-sm text-muted">{t("home.quotesNote")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.author} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm leading-relaxed">“{review.quote}”</p>
              <footer className="mt-3 text-xs text-muted">
                {review.author} — {review.place}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

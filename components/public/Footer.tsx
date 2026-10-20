import {Link} from "@/i18n/navigation";
import {garage} from "@/lib/garage";
import {getTranslations} from "next-intl/server";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card pb-20 md:pb-8">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold">{garage.name}</p>
          <p className="mt-1 text-sm text-accent">{t("brand.agent")}</p>
          <p className="mt-3 text-sm text-muted">
            {garage.address.street}
            <br />
            {garage.address.postalCode} {garage.address.city}
          </p>
        </div>
        <div className="text-sm">
          <p>
            <a className="hover:text-accent" href={`tel:${garage.phoneTel}`}>
              {garage.phoneDisplay}
            </a>
          </p>
          <p>
            <a className="hover:text-accent" href={`mailto:${garage.email}`}>
              {garage.email}
            </a>
          </p>
          <p className="mt-3 text-muted">
            {t("contact.weekdays")}: {t("hours.weekdays")}
            <br />
            {t("contact.saturday")}: {t("hours.saturday")}
            <br />
            {t("contact.sunday")}: {t("hours.sunday")}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <Link href="/mentions-legales">{t("nav.legal")}</Link>
          <Link href="/confidentialite">{t("nav.privacy")}</Link>
          <Link href="/cookies">{t("nav.cookies")}</Link>
          <p className="mt-4 text-xs">{t("footer.legalNote")}</p>
        </div>
      </div>
      <p className="border-t border-border px-4 py-4 text-center text-xs text-muted">
        © {year} {garage.legalName}. {t("footer.rights")}.
      </p>
    </footer>
  );
}

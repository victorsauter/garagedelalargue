import {Link} from "@/i18n/navigation";
import {garage} from "@/lib/garage";
import {getTranslations} from "next-intl/server";
import {LanguageSwitcher} from "./LanguageSwitcher";
import {Logo} from "./Logo";

export async function Header() {
  const t = await getTranslations("nav");
  const links = [
    {href: "/", label: t("home")},
    {href: "/occasions", label: t("stock")},
    {href: "/atelier", label: t("workshop")},
    {href: "/location", label: t("rental")},
    {href: "/contact", label: t("contact")},
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`tel:${garage.phoneTel}`}
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink sm:inline-flex"
          >
            {t("call")}
          </a>
        </div>
      </div>
    </header>
  );
}

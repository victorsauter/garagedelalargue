import {garage} from "@/lib/garage";
import {setRequestLocale} from "next-intl/server";

export default async function MentionsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <article className="prose-legal mx-auto max-w-3xl px-4 py-12 leading-relaxed">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">Mentions légales</h1>
      <p className="mt-4 text-sm text-muted">Document en français, y compris depuis l’interface DE/EN.</p>
      <section className="mt-8 space-y-3 text-sm">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p>
          {garage.legalName}, {garage.legalForm}
          <br />
          {garage.address.street}, {garage.address.postalCode} {garage.address.city}, {garage.address.country}
          <br />
          SIREN {garage.siren} — SIRET {garage.siret}
          <br />
          TVA intra-communautaire {garage.tvaIntra}
          <br />
          Gérant : {garage.gerant}
        </p>
        <p>
          Téléphone : {garage.phoneDisplay}
          <br />
          E-mail : {garage.email}
        </p>
        <h2 className="mt-8 text-xl font-semibold">Hébergement</h2>
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          <br />
          Site : vercel.com
        </p>
        <h2 className="mt-8 text-xl font-semibold">Propriété intellectuelle</h2>
        <p>
          Les contenus de ce site (textes, photos, graphisme) sont la propriété de {garage.legalName},
          sauf mentions contraires. La mention « Agent Renault » désigne l’appartenance au réseau Renault ;
          les marques Renault restent la propriété de Renault s.a.s.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>Pour toute question : {garage.email} ou {garage.phoneDisplay}.</p>
      </section>
    </article>
  );
}

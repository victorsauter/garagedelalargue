import {garage} from "@/lib/garage";
import {setRequestLocale} from "next-intl/server";

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-relaxed">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">Politique de confidentialité</h1>
      <p className="mt-4 text-sm text-muted">Document en français, y compris depuis l’interface DE/EN.</p>
      <div className="mt-8 space-y-4 text-sm">
        <p>
          {garage.legalName} ({garage.siret}) est responsable du traitement des données collectées via les
          formulaires de rendez-vous et de demande véhicule.
        </p>
        <h2 className="text-xl font-semibold">Données collectées</h2>
        <p>Nom, e-mail, téléphone éventuel, message, date souhaitée, véhicule concerné, consentement RGPD.</p>
        <h2 className="text-xl font-semibold">Finalité</h2>
        <p>
          Répondre à votre demande (essai, achat, reprise, rendez-vous atelier). Aucune newsletter n’est
          envoyée.
        </p>
        <h2 className="text-xl font-semibold">Base légale</h2>
        <p>Consentement (case à cocher) et mesures précontractuelles à votre demande.</p>
        <h2 className="text-xl font-semibold">Durée et destinataires</h2>
        <p>
          Conservation le temps du traitement de la demande, puis archivage limité. Destinataires : le
          personnel du garage. E-mails via Resend si configuré.
        </p>
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p>
          Accès, rectification, effacement, opposition : écrivez à {garage.email}. Réclamation possible
          auprès de la CNIL.
        </p>
      </div>
    </article>
  );
}

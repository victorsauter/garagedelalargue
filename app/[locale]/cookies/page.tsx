import {setRequestLocale} from "next-intl/server";

export default async function CookiesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-relaxed">
      <h1 className="font-[family-name:var(--font-outfit)] text-4xl">Cookies</h1>
      <p className="mt-4 text-sm text-muted">Document en français, y compris depuis l’interface DE/EN.</p>
      <div className="mt-8 space-y-4 text-sm">
        <p>
          Ce site n’utilise pas de cookies publicitaires ni de mesure d’audience non essentielle par défaut.
          Aucun bandeau cookies n’est affiché tant que seuls des cookies strictement nécessaires (session
          d’administration) sont déposés.
        </p>
        <p>
          L’espace /admin dépose un cookie de session Auth.js, réservé au personnel du garage, après
          connexion.
        </p>
        <p>
          Si Vercel Analytics ou un autre outil non essentiel est activé plus tard, un bandeau de
          consentement sera ajouté.
        </p>
      </div>
    </article>
  );
}

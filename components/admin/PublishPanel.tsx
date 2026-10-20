"use client";

import {saveLeboncoinUrl} from "@/app/admin/actions";
import {useState} from "react";

export function PublishPanel({
  vehicleId,
  facebookConfigured,
  deeplConfigured,
  leboncoinUrl,
  slug,
}: {
  vehicleId: string;
  facebookConfigured: boolean;
  deeplConfigured: boolean;
  leboncoinUrl: string | null;
  slug: string;
}) {
  const [fbMessage, setFbMessage] = useState("");
  const [pack, setPack] = useState<{title: string; description: string; depositUrl: string} | null>(null);
  const [copied, setCopied] = useState("");
  const [translateMsg, setTranslateMsg] = useState("");

  async function publishFacebook() {
    setFbMessage("Publication…");
    const res = await fetch(`/api/admin/vehicles/${vehicleId}/facebook`, {method: "POST"});
    const data = (await res.json()) as {ok?: boolean; error?: string};
    setFbMessage(data.ok ? "Publié sur la Page Facebook." : data.error || "Échec Facebook.");
  }

  async function prepareLeboncoin() {
    const res = await fetch(`/api/admin/vehicles/${vehicleId}/leboncoin-pack`);
    const data = (await res.json()) as {title: string; description: string; depositUrl: string};
    setPack(data);
  }

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
  }

  async function translate() {
    setTranslateMsg("Traduction…");
    const res = await fetch(`/api/admin/vehicles/${vehicleId}/translate`, {method: "POST"});
    const data = (await res.json()) as {ok?: boolean; error?: string};
    setTranslateMsg(
      data.ok
        ? "DE/EN mis à jour. Rechargez la page."
        : data.error || "DeepL indisponible — saisissez DE/EN à la main.",
    );
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#2a313c] bg-[#12161c] p-5">
      <h2 className="font-semibold">Publier</h2>
      <p className="text-sm text-[#9aa3b2]">
        Site : visible dès le statut « published ». Fiche : /fr/occasions/{slug}
      </p>

      <button
        type="button"
        onClick={() => void translate()}
        className="w-full rounded-full border border-[#2a313c] px-4 py-2 text-sm"
      >
        Traduire FR → DE/EN {deeplConfigured ? "" : "(DeepL non configuré)"}
      </button>
      {translateMsg ? <p className="text-xs text-[#9aa3b2]">{translateMsg}</p> : null}

      <button
        type="button"
        disabled={!facebookConfigured}
        onClick={() => void publishFacebook()}
        className="w-full rounded-full bg-[#1877f2] px-4 py-2 text-sm font-semibold disabled:opacity-40"
      >
        Publier sur Facebook
      </button>
      {!facebookConfigured ? (
        <p className="text-xs text-[#9aa3b2]">
          Facebook désactivé : renseignez Page ID + token dans Réglages, ou les variables
          FACEBOOK_PAGE_ID et FACEBOOK_PAGE_ACCESS_TOKEN.
        </p>
      ) : null}
      {fbMessage ? <p className="text-xs">{fbMessage}</p> : null}

      <div className="border-t border-[#2a313c] pt-4">
        <p className="text-sm font-medium">Pack Leboncoin (quelques clics, pas d’API)</p>
        <button
          type="button"
          onClick={() => void prepareLeboncoin()}
          className="mt-2 w-full rounded-full border border-[#f5c518] px-4 py-2 text-sm text-[#f5c518]"
        >
          Préparer titre + texte
        </button>
        {pack ? (
          <div className="mt-3 space-y-2 text-sm">
            <p className="font-medium">{pack.title}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="underline" onClick={() => void copy(pack.title, "titre")}>
                Copier le titre
              </button>
              <button type="button" className="underline" onClick={() => void copy(pack.description, "texte")}>
                Copier le texte
              </button>
              <a className="underline" href={`/api/admin/vehicles/${vehicleId}/leboncoin-pack?download=1`}>
                Télécharger les photos (zip)
              </a>
              <a className="underline" href={pack.depositUrl} target="_blank" rel="noreferrer">
                Ouvrir le dépôt Leboncoin
              </a>
            </div>
            {copied ? <p className="text-xs text-[#9aa3b2]">Copié : {copied}</p> : null}
          </div>
        ) : null}
        <form action={saveLeboncoinUrl.bind(null, vehicleId)} className="mt-3 space-y-2">
          <input
            name="leboncoinUrl"
            defaultValue={leboncoinUrl ?? ""}
            placeholder="URL de l’annonce Leboncoin"
            className="w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2 text-sm"
          />
          <button className="text-sm text-[#f5c518]">Enregistrer l’URL Leboncoin</button>
        </form>
      </div>
    </section>
  );
}

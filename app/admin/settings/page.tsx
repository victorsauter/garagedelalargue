import {saveFacebookSettings} from "@/app/admin/actions";
import {AdminShell} from "@/components/admin/AdminShell";
import {getFacebookCredentials} from "@/lib/settings";

export default async function SettingsPage() {
  const facebook = await getFacebookCredentials();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold">Réglages</h1>
      <form action={saveFacebookSettings} className="mt-6 max-w-xl space-y-4 rounded-2xl border border-[#2a313c] bg-[#12161c] p-5">
        <h2 className="font-semibold">Facebook Page</h2>
        <p className="text-sm text-[#9aa3b2]">
          Créez une appli Meta, un token Page avec `pages_manage_posts` et `pages_read_engagement`, puis
          collez l’identifiant de page et le jeton ici. Sans jeton, le bouton Facebook reste désactivé.
        </p>
        <label className="block text-sm">
          Page ID
          <input
            name="facebookPageId"
            defaultValue={facebook.pageId}
            className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Page access token
          <input
            name="facebookPageToken"
            defaultValue={facebook.pageToken}
            type="password"
            className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2"
          />
        </label>
        <p className="text-xs text-[#9aa3b2]">
          État : {facebook.configured ? "prêt" : "non configuré"}
        </p>
        <button className="rounded-full bg-[#f5c518] px-4 py-2 font-semibold text-[#1a1403]">
          Enregistrer
        </button>
      </form>
    </AdminShell>
  );
}

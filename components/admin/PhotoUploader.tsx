"use client";

import {deletePhoto} from "@/app/admin/actions";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function PhotoUploader({
  vehicleId,
  photos,
}: {
  vehicleId: string;
  photos: {id: string; url: string}[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.set("file", file);
        body.set("vehicleId", vehicleId);
        const res = await fetch("/api/admin/upload", {method: "POST", body});
        if (!res.ok) {
          const data = (await res.json()) as {error?: string};
          throw new Error(data.error || "Upload impossible");
        }
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#2a313c] bg-[#12161c] p-5">
      <h2 className="font-semibold">Photos</h2>
      <p className="mt-1 text-xs text-[#9aa3b2]">Glissez-déposez ou sélectionnez plusieurs images.</p>
      <input
        type="file"
        accept="image/*"
        multiple
        className="mt-3 text-sm"
        disabled={busy}
        onChange={(event) => void onFiles(event.target.files)}
      />
      {busy ? <p className="mt-2 text-xs text-[#9aa3b2]">Envoi…</p> : null}
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative overflow-hidden rounded-lg border border-[#2a313c]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="h-24 w-full object-cover" />
            <form action={deletePhoto.bind(null, photo.id)}>
              <button className="absolute right-1 top-1 rounded bg-black/70 px-2 py-0.5 text-[10px]">
                Retirer
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}

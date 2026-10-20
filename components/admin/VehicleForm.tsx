type VehicleFormValues = {
  status: string;
  category: string;
  brand: string;
  model: string;
  version?: string | null;
  year: number;
  mileageKm: number;
  fuel: string;
  gearbox: string;
  priceTtcCents: number;
  priceHtCents?: number | null;
  warranty?: string | null;
  descriptionFr: string;
  leboncoinUrl?: string | null;
  translations?: {locale: string; description: string}[];
};

export function VehicleForm({
  action,
  vehicle,
  onDelete,
}: {
  action: (formData: FormData) => Promise<void>;
  vehicle?: VehicleFormValues;
  onDelete?: () => Promise<void>;
}) {
  const de = vehicle?.translations?.find((t) => t.locale === "de")?.description ?? "";
  const en = vehicle?.translations?.find((t) => t.locale === "en")?.description ?? "";

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-[#2a313c] bg-[#12161c] p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <Select name="status" label="Statut" defaultValue={vehicle?.status ?? "draft"} options={["draft", "published", "reserved", "sold"]} />
        <Select name="category" label="Catégorie" defaultValue={vehicle?.category ?? "voitures"} options={["voitures", "utilitaires"]} />
        <Field name="brand" label="Marque" defaultValue={vehicle?.brand ?? "Renault"} required />
        <Field name="model" label="Modèle" defaultValue={vehicle?.model} required />
        <Field name="version" label="Finition / version" defaultValue={vehicle?.version ?? ""} />
        <Field name="year" label="Année" type="number" defaultValue={vehicle?.year} required />
        <Field name="mileageKm" label="Kilométrage" type="number" defaultValue={vehicle?.mileageKm} required />
        <Select name="fuel" label="Énergie" defaultValue={vehicle?.fuel ?? "essence"} options={["essence", "diesel", "hybride", "electrique"]} />
        <Select name="gearbox" label="Boîte" defaultValue={vehicle?.gearbox ?? "manuelle"} options={["manuelle", "automatique"]} />
        <Field
          name="priceTtc"
          label="Prix TTC (€)"
          type="number"
          step="1"
          defaultValue={vehicle ? vehicle.priceTtcCents / 100 : ""}
          required
        />
        <Field
          name="priceHt"
          label="Prix HT (€)"
          type="number"
          step="1"
          defaultValue={vehicle?.priceHtCents ? vehicle.priceHtCents / 100 : ""}
        />
        <Field name="warranty" label="Garantie" defaultValue={vehicle?.warranty ?? ""} />
      </div>
      <label className="block text-sm">
        Description (FR, source)
        <textarea name="descriptionFr" required rows={5} defaultValue={vehicle?.descriptionFr} className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2" />
      </label>
      <label className="block text-sm">
        Description DE
        <textarea name="descriptionDe" rows={4} defaultValue={de} className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2" />
      </label>
      <label className="block text-sm">
        Description EN
        <textarea name="descriptionEn" rows={4} defaultValue={en} className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2" />
      </label>
      <div className="flex gap-3">
        <button className="rounded-full bg-[#f5c518] px-5 py-2 font-semibold text-[#1a1403]">Enregistrer</button>
        {onDelete ? (
          <button formAction={onDelete} className="rounded-full border border-red-500/40 px-5 py-2 text-red-300">
            Supprimer
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  required,
  step,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  step?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2"
      />
    </label>
  );
}

function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label className="block text-sm">
      {label}
      <select name={name} defaultValue={defaultValue} className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

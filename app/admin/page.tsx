import {AdminShell} from "@/components/admin/AdminShell";
import {prisma} from "@/lib/prisma";
import {formatPriceCents, vehicleTitle} from "@/lib/format";
import Link from "next/link";

export const dynamic = "force-dynamic";

const labels: Record<string, string> = {
  draft: "Brouillon",
  published: "En ligne",
  reserved: "Réservé",
  sold: "Vendu",
};

export default async function AdminHome() {
  const vehicles = await prisma.vehicle.findMany({
    include: {photos: {take: 1, orderBy: {sortOrder: "asc"}}},
    orderBy: {updatedAt: "desc"},
  });

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stock</h1>
        <Link href="/admin/vehicles/new" className="rounded-full bg-[#f5c518] px-4 py-2 text-sm font-semibold text-[#1a1403]">
          Nouveau véhicule
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#2a313c]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#12161c] text-[#9aa3b2]">
            <tr>
              <th className="px-3 py-2">Véhicule</th>
              <th className="px-3 py-2">Catégorie</th>
              <th className="px-3 py-2">Prix TTC</th>
              <th className="px-3 py-2">Statut</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t border-[#2a313c]">
                <td className="px-3 py-3">{vehicleTitle(vehicle)}</td>
                <td className="px-3 py-3 capitalize">{vehicle.category}</td>
                <td className="px-3 py-3">{formatPriceCents(vehicle.priceTtcCents)}</td>
                <td className="px-3 py-3">{labels[vehicle.status] ?? vehicle.status}</td>
                <td className="px-3 py-3">
                  <Link href={`/admin/vehicles/${vehicle.id}`} className="text-[#f5c518]">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

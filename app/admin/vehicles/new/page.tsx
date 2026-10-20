import {createVehicle} from "@/app/admin/actions";
import {AdminShell} from "@/components/admin/AdminShell";
import {VehicleForm} from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold">Nouveau véhicule</h1>
      <div className="mt-6">
        <VehicleForm action={createVehicle} />
      </div>
    </AdminShell>
  );
}

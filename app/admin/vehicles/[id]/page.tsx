import {deleteVehicle, updateVehicle} from "@/app/admin/actions";
import {AdminShell} from "@/components/admin/AdminShell";
import {PhotoUploader} from "@/components/admin/PhotoUploader";
import {PublishPanel} from "@/components/admin/PublishPanel";
import {VehicleForm} from "@/components/admin/VehicleForm";
import {deeplConfigured} from "@/lib/deepl";
import {prisma} from "@/lib/prisma";
import {getFacebookCredentials} from "@/lib/settings";
import {notFound} from "next/navigation";

export default async function EditVehiclePage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: {id},
    include: {photos: {orderBy: {sortOrder: "asc"}}, translations: true},
  });
  if (!vehicle) notFound();
  const facebook = await getFacebookCredentials();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold">
        {vehicle.brand} {vehicle.model}
      </h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <VehicleForm
          action={updateVehicle.bind(null, vehicle.id)}
          vehicle={vehicle}
          onDelete={deleteVehicle.bind(null, vehicle.id)}
        />
        <div className="space-y-6">
          <PhotoUploader vehicleId={vehicle.id} photos={vehicle.photos} />
          <PublishPanel
            vehicleId={vehicle.id}
            facebookConfigured={facebook.configured}
            deeplConfigured={deeplConfigured()}
            leboncoinUrl={vehicle.leboncoinUrl}
            slug={vehicle.slug}
          />
        </div>
      </div>
    </AdminShell>
  );
}

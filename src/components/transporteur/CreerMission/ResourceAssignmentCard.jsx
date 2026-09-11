import {
  ClipboardList,
  Truck,
  User,
} from "lucide-react";

import ResourceSelect from "./ResourceSelect";
import AdditionalInformation from "./AdditionalInformation";

export default function ResourceAssignmentCard() {
  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
      
      {/* En-tête */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100">
          <ClipboardList className="size-4 text-cyan-800" />
        </div>

        <h2 className="text-lg font-bold leading-7 text-sky-950">
          Affectation des ressources
        </h2>
      </div>

      {/* Sélection des ressources */}
      <div className="grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-2">

        <ResourceSelect
          icon={<Truck className="size-4 text-slate-400" />}
          label="Sélectionner un véhicule"
          value="DK-1234-AB"
          type="vehicle"
        />

        <ResourceSelect
          icon={<User className="size-4 text-slate-400" />}
          label="Sélectionner un agent"
          value="Modou Fall"
          type="agent"
        />
      </div>

      <div className="mt-10">
        <AdditionalInformation />
      </div>
    </section>
  );
}
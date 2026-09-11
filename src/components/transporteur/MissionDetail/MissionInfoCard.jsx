import {
  Building2,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Truck,
} from "lucide-react";

import MissionResourceCard from "./MissionResourceCard";
import MissionInstructions from "./MissionInstructions";

export default function MissionInfoCard() {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
            <Truck className="size-5 text-cyan-800" />
          </div>

          <h2 className="text-lg font-bold leading-7 tracking-tight text-sky-950">
            Informations de la mission
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold leading-5 text-cyan-800"
        >
          <span>Voir la demande de chargement liée</span>
          <ExternalLink className="size-3" />
        </button>
      </div>

      {/* Informations générales */}
      <div className="flex flex-col gap-10 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MissionField
            label="Demandeur"
            icon={<Building2 className="size-3.5 text-cyan-800/60" />}
            value="Grands Moulins de Dakar"
          />

          <MissionField
            label="Point de départ"
            icon={<MapPin className="size-3.5 text-red-500/70" />}
            value="Dakar, Port"
          />

          <MissionField
            label="Destination"
            icon={<MapPin className="size-3.5 text-emerald-500" />}
            value="Thiès, Centre"
          />

          <MissionField
            label="Date de chargement"
            icon={<CalendarDays className="size-3.5 text-cyan-800/60" />}
            value="24 Octobre 2023"
          />

          <MissionField
            label="Heure de chargement"
            icon={<Clock3 className="size-3.5 text-cyan-800/60" />}
            value="08:00 AM"
          />
        </div>

        <div className="h-px w-full bg-slate-100" />

        {/* Ressources */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <MissionResourceCard
            type="vehicle"
            label="Véhicule affecté"
            name="DK-1234-AB"
            description="Renault Kerax - Plateau (35T)"
            status="En mission"
          />

          <MissionResourceCard
            type="agent"
            label="Agent affecté"
            name="Modou Fall"
            description="Chauffeur poids lourd - Exp. 8 ans"
            status="Indisponible"
            image="https://placehold.co/48x48"
          />
        </div>
      </div>

      {/* Instructions */}
      <MissionInstructions />
    </section>
  );
}

function MissionField({ label, icon, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase leading-4 tracking-wide text-slate-400">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {icon}

        <span className="text-base font-semibold leading-6 tracking-tight text-sky-950">
          {value}
        </span>
      </div>
    </div>
  );
}
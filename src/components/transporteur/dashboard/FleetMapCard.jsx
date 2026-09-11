import {
  LocateFixed,
  Minus,
  Plus,
} from "lucide-react";

const VEHICLES = [
  {
    name: "Truck 04 - Dakar",
    position: "left-[12%] top-[58%]",
    color: "bg-emerald-500",
  },
  {
    name: "Van 12 - Thiès",
    position: "left-[24%] top-[53%]",
    color: "bg-sky-950",
  },
  {
    name: "Truck 08 - Kaolack",
    position: "left-[36%] top-[65%]",
    color: "bg-orange-500",
  },
  {
    name: "Truck 01 - Saint-Louis",
    position: "left-[30%] top-[35%]",
    color: "bg-emerald-500",
  },
];

export default function FleetMapCard() {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-bold leading-6 text-sky-950">
          Aperçu de la flotte sur la carte
        </h2>

        <button
          type="button"
          className="text-sm font-semibold leading-5 text-orange-500"
        >
          Voir la carte complète →
        </button>
      </div>

      <div className="relative aspect-[16/6] min-h-72 w-full overflow-hidden bg-slate-100">
        {/* Placeholder de carte */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {VEHICLES.map((vehicle) => (
          <div
            key={vehicle.name}
            className={`absolute ${vehicle.position} flex size-5 items-center justify-center rounded-full border-2 border-white ${vehicle.color} shadow-md`}
            title={vehicle.name}
          />
        ))}

        {/* Contrôles */}
        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            aria-label="Zoom avant"
            className="flex size-10 items-center justify-center rounded-lg bg-white shadow-md"
          >
            <Plus className="h-4 w-4 text-sky-950" />
          </button>

          <button
            type="button"
            aria-label="Zoom arrière"
            className="flex size-10 items-center justify-center rounded-lg bg-white shadow-md"
          >
            <Minus className="h-4 w-4 text-sky-950" />
          </button>

          <button
            type="button"
            aria-label="Centrer la carte"
            className="flex size-10 items-center justify-center rounded-lg bg-white shadow-md"
          >
            <LocateFixed className="h-4 w-4 text-sky-950" />
          </button>
        </div>

        {/* Légende */}
        <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 bg-white p-3 shadow-md">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-600">
              Disponible
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-sky-950" />
            <span className="text-xs font-semibold text-slate-600">
              En mission
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-slate-600">
              Maintenance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
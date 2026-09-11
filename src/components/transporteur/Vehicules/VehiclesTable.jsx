import { Pencil, Trash2 } from "lucide-react";

export default function VehiclesTable({ vehicles, onEdit }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Header */}
        <div className="grid grid-cols-[1.2fr_1.1fr_1.5fr_1fr_0.8fr] border-b border-slate-100 bg-slate-50">
          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Immatriculation
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Type
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Caractéristiques (Poids/H/L)
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Statut
          </div>

          <div className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
            Actions
          </div>
        </div>

        {/* Rows */}
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`grid grid-cols-[1.2fr_1.1fr_1.5fr_1fr_0.8fr] items-center ${
              index > 0 ? "border-t border-slate-100" : ""
            }`}
          >
            <div className="px-6 py-4 text-base font-bold leading-6 text-sky-950">
              {vehicle.registration}
            </div>

            <div className="px-6 py-4 text-sm leading-5 text-slate-600">
              {vehicle.type}
            </div>

            <div className="px-6 py-4 text-sm leading-5 text-slate-500">
              {vehicle.characteristics}
            </div>

            <div className="px-6 py-4">
              <StatusBadge status={vehicle.status} />
            </div>

            <div className="flex justify-end gap-3 px-6 py-4">
              <button
                type="button"
                onClick={() => onEdit(vehicle)}
                aria-label={`Modifier ${vehicle.registration}`}
                className="flex size-8 items-center justify-center text-slate-400 transition-colors hover:text-sky-950"
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label={`Supprimer ${vehicle.registration}`}
                className="flex size-8 items-center justify-center text-slate-400 transition-colors hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {vehicles.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            Aucun véhicule ne correspond à vos filtres.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Disponible: "bg-emerald-50 text-emerald-500",
    "En mission": "bg-blue-50 text-cyan-800",
    "En panne": "bg-red-50 text-red-500",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-tight ${
        styles[status] || "bg-slate-50 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}
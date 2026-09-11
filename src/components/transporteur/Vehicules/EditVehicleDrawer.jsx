import { useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  Truck,
  X,
} from "lucide-react";

export default function EditVehicleDrawer({
  isOpen,
  onClose,
  vehicle,
}) {
  const [status, setStatus] = useState(
    vehicle?.status || "Disponible"
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/60 backdrop-blur-[0.5px]"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <h2 className="text-xl font-bold leading-7 text-sky-950">
              Modifier le véhicule
            </h2>

            <p className="mt-1 text-xs font-medium leading-4 tracking-tight text-slate-400">
              Référence : {vehicle?.registration || "DK-8821-BC"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-50"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Contenu */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-10">

            {/* Identification */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                  Identification
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {/* Immatriculation */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="registration"
                    className="text-xs font-semibold leading-5 tracking-tight text-slate-600"
                  >
                    Immatriculation
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <Truck className="ml-4 h-4 w-4 shrink-0 text-slate-400" />

                    <input
                      id="registration"
                      type="text"
                      defaultValue={vehicle?.registration || "DK-8821-BC"}
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base font-medium leading-6 text-sky-950 outline-none"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="vehicleType"
                    className="text-xs font-semibold leading-5 tracking-tight text-slate-600"
                  >
                    Type de véhicule
                  </label>

                  <div className="relative">
                    <Truck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <select
                      id="vehicleType"
                      defaultValue={vehicle?.type || "Plateau"}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-base font-medium leading-6 text-sky-950 outline-none focus:border-orange-500"
                    >
                      <option>Plateau</option>
                      <option>Porteur</option>
                      <option>Semi-remorque</option>
                      <option>Citerne</option>
                      <option>Frigorifique</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Caractéristiques */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                  Caractéristiques
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="weight"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Poids (t)
                  </label>

                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    defaultValue={vehicle?.weight || "20.0"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="height"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Hauteur (m)
                  </label>

                  <input
                    id="height"
                    type="number"
                    step="0.1"
                    defaultValue={vehicle?.height || "3.5"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="width"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Largeur (m)
                  </label>

                  <input
                    id="width"
                    type="number"
                    step="0.1"
                    defaultValue={vehicle?.width || "2.4"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </section>

            {/* Statut actuel */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                  Statut actuel
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    status === "Disponible"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Disponible"
                    checked={status === "Disponible"}
                    onChange={(event) => setStatus(event.target.value)}
                    className="sr-only"
                  />

                  <span
                    className={`flex size-4 items-center justify-center rounded-full border-2 ${
                      status === "Disponible"
                        ? "border-emerald-500"
                        : "border-slate-300"
                    }`}
                  >
                    {status === "Disponible" && (
                      <span className="size-2 rounded-full bg-emerald-500" />
                    )}
                  </span>

                  <span
                    className={`text-base font-bold leading-6 ${
                      status === "Disponible"
                        ? "text-slate-600"
                        : "text-slate-400"
                    }`}
                  >
                    Disponible
                  </span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                    status === "En panne"
                      ? "border-red-500 bg-red-50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="En panne"
                    checked={status === "En panne"}
                    onChange={(event) => setStatus(event.target.value)}
                    className="sr-only"
                  />

                  <span
                    className={`flex size-4 items-center justify-center rounded-full border-2 ${
                      status === "En panne"
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                  >
                    {status === "En panne" && (
                      <span className="size-2 rounded-full bg-red-500" />
                    )}
                  </span>

                  <span
                    className={`text-base font-bold leading-6 ${
                      status === "En panne"
                        ? "text-red-500"
                        : "text-slate-400"
                    }`}
                  >
                    En panne
                  </span>
                </label>
              </div>

              {/* Information */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                <p className="text-xs font-medium leading-5 text-slate-500">
                  Si le véhicule est assigné à un trajet, son statut passera
                  automatiquement à{" "}
                  <span className="font-bold text-cyan-800">
                    En mission
                  </span>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600"
          >
            Enregistrer les modifications
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 bg-white py-4 text-base font-bold leading-6 text-slate-500 transition-colors hover:bg-slate-50"
          >
            Annuler
          </button>
        </div>
      </aside>
    </div>
  );
}
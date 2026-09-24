import {
  ChevronDown,
  Truck,
  User,
} from "lucide-react";

export default function ResourceSelect({
  icon,
  label,
  value,
  onChange,
  type,
  disabled,
  options = [],
}) {
  const isVehicle = type === "vehicle";

  const ressourceSelectionnee = options.find(
    (option) => String(option.id) === String(value)
  );

  return (
    <div className="flex min-w-0 flex-col gap-3">

      {/* Label */}
      <div className="flex items-center gap-2">
        {icon}

        <label className="text-sm font-semibold leading-5 tracking-tight text-slate-700">
          {label}
        </label>
      </div>

      {/* Select */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none rounded-xl border py-3 pl-11 pr-10 text-sm outline-none ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-200 bg-slate-50 text-gray-900 focus:border-sky-950"
          }`}
        >
          <option value="">
            {disabled
              ? "Saisissez la date de fin prévue"
              : isVehicle
                ? "Sélectionner un véhicule"
                : "Sélectionner un agent"}
          </option>

          {!disabled &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {isVehicle
                  ? option.immatriculation
                  : `${option.prenom} ${option.nom}`}
              </option>
            ))}
        </select>

        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          {isVehicle ? (
            <Truck className="size-3.5 text-slate-400" />
          ) : (
            <User className="size-3.5 text-slate-400" />
          )}
        </div>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Ressource sélectionnée */}
      {ressourceSelectionnee && !disabled && (
        <>
          {isVehicle ? (
            <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="size-2 shrink-0 rounded-full bg-emerald-500" />

                <span className="truncate text-xs font-bold uppercase leading-4 text-slate-700">
                  {ressourceSelectionnee.immatriculation}
                </span>
              </div>

              <span className="shrink-0 text-[10px] font-bold uppercase leading-4 tracking-tight text-emerald-500">
                Disponible
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={
                    ressourceSelectionnee.photo
                    ? `http://127.0.0.1:8000${ressourceSelectionnee.photo}`
                    : "https://placehold.co/24x24"
                  }
                  alt={`${ressourceSelectionnee.prenom} ${ressourceSelectionnee.nom}`}
                  className="size-6 shrink-0 rounded-full object-cover"
                />

                <span className="truncate text-xs font-bold leading-4 tracking-tight text-slate-700">
                  {ressourceSelectionnee.prenom}{" "}
                  {ressourceSelectionnee.nom}
                </span>
              </div>

              <span className="shrink-0 text-[10px] font-bold uppercase leading-4 tracking-tight text-emerald-500">
                Disponible
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
import {
  ChevronDown,
  Truck,
  User,
} from "lucide-react";

export default function ResourceSelect({
  icon,
  label,
  value,
  type,
}) {
  const isVehicle = type === "vehicle";

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
          defaultValue={value}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-gray-900 outline-none focus:border-sky-950"
        >
          <option value={value}>{value}</option>
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
      {isVehicle ? (
        <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" />

            <span className="truncate text-xs font-bold uppercase leading-4 text-slate-700">
              DK-1234-AB - Plateau (35T)
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
              src="https://placehold.co/24x24"
              alt="Modou Fall"
              className="size-6 shrink-0 rounded-full"
            />

            <span className="truncate text-xs font-bold leading-4 tracking-tight text-slate-700">
              Modou Fall
            </span>
          </div>

          <span className="shrink-0 text-[10px] font-bold uppercase leading-4 tracking-tight text-emerald-500">
            Disponible
          </span>
        </div>
      )}
    </div>
  );
}
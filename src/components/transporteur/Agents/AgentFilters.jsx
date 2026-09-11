import { Search, ChevronDown } from "lucide-react";

export default function AgentFilters() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 lg:flex-row lg:items-center">
      
      {/* Recherche */}
      <div className="relative min-w-0 flex-1">
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-sky-900"
        />

        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Disponibilité */}
      <div className="relative w-full lg:w-64">
        <select
          defaultValue=""
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-sky-900"
        >
          <option value="">Toutes les disponibilités</option>
          <option value="disponible">Disponible</option>
          <option value="indisponible">Indisponible</option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Effacer */}
      <button
        type="button"
        className="px-4 py-2.5 text-left text-sm font-medium tracking-tight text-slate-500 transition hover:text-sky-950 lg:text-center"
      >
        Effacer
      </button>
    </div>
  );
}
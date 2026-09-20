import {
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function DemandesFilters({
  search,
  setSearch,
  status,
  setStatus,
  onClear,
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      {/* Recherche */}
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une demande..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500"
        />
      </div>

      {/* Statut */}
      <div className="relative w-full lg:w-48">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-orange-500"
        >
          <option value="Tous les statuts">
            Tous les statuts
          </option>

          <option value="PREVU">
            Prévu
          </option>

          <option value="TRAITE">
            Traité
          </option>

          <option value="ANNULEE">
            Annulée
          </option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      {/* Tri
      <div className="relative w-full lg:w-48">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-orange-500"
        >
          <option value="date">
            Trier par date
          </option>

          <option value="recent">
            Plus récente
          </option>

          <option value="ancienne">
            Plus ancienne
          </option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div> */}

      {/* Effacer */}
      <button
        type="button"
        onClick={onClear}
        className="shrink-0 px-4 py-2.5 text-base font-medium tracking-tight text-slate-500"
      >
        Effacer
      </button>

      
    </div>
  );
}
import {
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function DemandesFilters({ onNewRequest }) {
  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
        
        {/* Recherche */}
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Rechercher une demande..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
          />
        </div>

        {/* Statut */}
        <div className="relative w-full md:w-auto md:min-w-48">
          <select
            defaultValue="all"
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-sky-950"
          >
            <option value="all">
              Tous les statuts
            </option>
            <option value="prevu">
              Prévu
            </option>
            <option value="traite">
              Traité
            </option>
            <option value="annulee">
              Annulée
            </option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Tri */}
        <div className="relative w-full md:w-auto md:min-w-44">
          <select
            defaultValue="date"
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-sky-950"
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

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Effacer */}
        <button
          type="button"
          className="shrink-0 text-left text-sm font-semibold tracking-tight text-orange-500 hover:text-orange-600"
        >
          Effacer
        </button>
      </div>

      {/* Nouvelle demande */}
      <button
        type="button"
        onClick={onNewRequest}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white"
      >
        <Plus className="size-4" />
        Nouvelle demande
      </button>
    </div>
  );
}
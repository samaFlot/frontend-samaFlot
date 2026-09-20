import {
  Search,
  ChevronDown,
  List,
  LayoutGrid,
} from "lucide-react";

export default function MissionsFilters({
  // Valeur actuelle de la recherche
  search,

  // Fonction permettant de modifier la recherche
  setSearch,

  // Statut actuellement sélectionné
  status,

  // Fonction permettant de modifier le statut
  setStatus,
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 lg:flex-row lg:items-center lg:justify-between">
      {/* Filtres */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">

        {/* Recherche */}
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher par demandeur, destination..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
          />
        </div>

        {/* Statut */}
        <div className="relative w-full md:w-auto">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-600 outline-none focus:border-sky-950 md:w-auto"
          >
            {/* Valeur par défaut */}
            <option value="Tous les statuts">
              Tous les statuts
            </option>

            {/* Statuts réels retournés par le backend */}
            <option value="PREVU">
              Prévue
            </option>

            <option value="EN_COURS">
              En cours
            </option>

            <option value="TERMINEE">
              Terminée
            </option>

            <option value="ANNULEE">
              Annulée
            </option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Affichage 
      <div className="flex items-center gap-2">
        
        <button
          type="button"
          className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-3"
          aria-label="Vue liste"
        >
          <List className="size-4 text-slate-500" />
        </button>

       
        <button
          type="button"
          className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-3"
          aria-label="Vue grille"
        >
          <LayoutGrid className="size-4 text-slate-500" />
        </button>
      </div>*/}
    </div>
  );
}


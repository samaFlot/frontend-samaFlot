import { Search, ChevronDown } from "lucide-react";

export default function ManagersFilters({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center">
      <div className="relative flex flex-1 items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une entreprise ou un responsable..."
          className="w-full rounded-xl bg-white py-3 pl-12 pr-4 text-sm text-gray-900 outline outline-1 outline-offset-[-1px] outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-500"
        />
      </div>

      <div className="relative w-full sm:w-48">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full appearance-none rounded-xl bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-900 outline outline-1 outline-offset-[-1px] outline-gray-200"
        >
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>Désactivé</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
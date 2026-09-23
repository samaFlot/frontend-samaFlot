import { Search } from "lucide-react";

export default function RechercheVehicule({
  valeur,
  onChange,
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
      <Search
        size={18}
        className="text-gray-400"
      />

      <input
        type="text"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un véhicule..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Nombre maximum de numéros de page affichés en même temps
const NOMBRE_PAGES_VISIBLES = 5;

export default function Pagination({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  debut = 0,
  fin = 0,
  onPageChange,
  libelle = "éléments",
}) {
  // Aucun résultat : pas de pagination
  if (totalItems === 0) {
    return null;
  }

  // Calculer la fenêtre de numéros à afficher autour de la page courante
  let premiere = Math.max(
    1,
    page - Math.floor(NOMBRE_PAGES_VISIBLES / 2)
  );
  let derniere = premiere + NOMBRE_PAGES_VISIBLES - 1;

  if (derniere > totalPages) {
    derniere = totalPages;
    premiere = Math.max(1, derniere - NOMBRE_PAGES_VISIBLES + 1);
  }

  const numeros = [];

  for (let numero = premiere; numero <= derniere; numero++) {
    numeros.push(numero);
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-slate-500">
        Affichage de {debut} à {fin} sur {totalItems} {libelle}
      </p>

      {/* Boutons : seulement s'il y a plus d'une page */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Page précédente"
          >
            <ChevronLeft className="size-3.5 text-slate-400" />
          </button>

          {numeros.map((numero) => (
            <button
              key={numero}
              type="button"
              onClick={() => onPageChange(numero)}
              className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold ${
                numero === page
                  ? "bg-cyan-800 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {numero}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Page suivante"
          >
            <ChevronRight className="size-3.5 text-slate-400" />
          </button>
        </div>
      )}
    </div>
  );
}
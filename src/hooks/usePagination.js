import { useEffect, useState } from "react";

// items : la liste déjà filtrée
// pageSize : nombre de lignes par page
// resetKey : texte qui change quand la recherche ou un filtre change,
//            pour revenir automatiquement à la page 1
export function usePagination(items, pageSize = 8, resetKey = "") {
  const [page, setPage] = useState(1);

  const totalItems = items?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Revenir à la page 1 quand la recherche ou un filtre change
  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  // Si la page courante n'existe plus (ex : dernier élément
  // de la dernière page supprimé), on retombe sur la dernière page valide.
  const pageCourante = Math.min(page, totalPages);

  const indexDebut = (pageCourante - 1) * pageSize;

  // Les lignes de la page courante
  const pageItems = (items || []).slice(
    indexDebut,
    indexDebut + pageSize
  );

  return {
    pageItems,
    page: pageCourante,
    totalPages,
    totalItems,
    debut: totalItems === 0 ? 0 : indexDebut + 1,
    fin: Math.min(indexDebut + pageSize, totalItems),
    onPageChange: setPage,
  };
}
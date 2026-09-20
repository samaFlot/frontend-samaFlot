import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Libellés et styles des statuts
const STATUTS = {
  ACTIF: {
    label: "Actif",
    style: "bg-green-600/10 text-green-600",
  },
  DESACTIVE: {
    label: "Désactivé",
    style: "bg-red-700/10 text-red-700",
  },
};

// Date lisible : "14 oct. 2023"
const formaterDate = (valeur) => {
  const date = new Date(valeur);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AccountsTable({
  // Liste des responsables venant de l'API
  responsables = [],

  // Indique que la liste est en cours de chargement
  loading = false,
}) {
  // Les plus récents d'abord
  const recents = [...responsables].sort(
    (a, b) =>
      new Date(b.date_creation) - new Date(a.date_creation)
  );

  // Les derniers comptes créés
  const comptesAffiches = recents.slice(0, 5);

  // Nombre de comptes non affichés
  const autres = responsables.length - comptesAffiches.length;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
      <div className="flex items-center justify-between border-b border-gray-50 p-8">
        <h2 className="text-xl font-bold tracking-tight text-sky-950">
          Derniers comptes créés
        </h2>

        <Link
          to='/admin/responsables'
          className="flex items-center gap-2 text-sm font-semibold text-cyan-800"
        >
          Voir tous les Responsables
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 border-b border-gray-50 px-8 py-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nom de l'entreprise</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nom du Responsable</span>
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400">Statut</span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Date de création</span>
          </div>

          {/* Chargement */}
          {loading && (
            <div className="px-8 py-8 text-center text-sm text-gray-400">
              Chargement des comptes...
            </div>
          )}

          {/* Aucun responsable */}
          {!loading && comptesAffiches.length === 0 && (
            <div className="px-8 py-8 text-center text-sm text-gray-400">
              Aucun responsable trouvé.
            </div>
          )}

          {/* Lignes */}
          {!loading &&
            comptesAffiches.map((acc, i) => {
              const statut = STATUTS[acc.statut_compte] || {
                label: acc.statut_compte || "—",
                style: "bg-gray-100 text-gray-500",
              };

              const nomResponsable = [acc.prenom, acc.nom]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={acc.id}
                  className={`grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 px-8 py-4 ${
                    i > 0 ? "border-t border-gray-50" : ""
                  }`}
                >
                  {/* Nom de l'entreprise */}
                  <span className="text-base font-semibold text-sky-950">
                    {acc.nom_entreprise}
                  </span>

                  {/* Nom du responsable */}
                  <span className="text-sm font-medium tracking-tight text-gray-900">
                    {nomResponsable}
                  </span>

                  {/* Statut */}
                  <div className="flex justify-center">
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-tight ${statut.style}`}
                    >
                      {statut.label}
                    </span>
                  </div>

                  {/* Date de création */}
                  <span className="text-right text-sm font-medium text-gray-500">
                    {formaterDate(acc.date_creation)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
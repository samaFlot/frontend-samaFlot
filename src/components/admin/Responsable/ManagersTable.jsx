import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

// Libellés et couleurs des statuts (valeurs de la base : ACTIF / DESACTIVE)
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

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ManagersTable({
  responsables = [],
  onEdit,
}) {
  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
      <div className="w-full overflow-x-auto">
        <div className="min-w-0">
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.8fr] gap-4 border-b border-gray-100 bg-gray-50/50 px-8 py-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Nom de l'entreprise
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Nom du Responsable
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Téléphone ou email
            </span>
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
              Statut
            </span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
              Date de création
            </span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
              Actions
            </span>
          </div>

          {responsables.map((responsable, i) => {
            // Statut : libellé et couleur (gris si la valeur est inconnue)
            const statut = STATUTS[responsable.statut_compte] || {
              label: responsable.statut_compte || "",
              style: "bg-gray-100 text-gray-500",
            };

            return (
              <div
                key={responsable.id}
                className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.8fr] items-center gap-4 px-8 py-4 ${
                  i > 0 ? "border-t border-gray-50" : ""
                }`}
              >
                {/* Nom de l'entreprise */}
                <span className="min-w-0 truncate text-base font-semibold tracking-tight text-sky-950">
                  {responsable.nom_entreprise}
                </span>

                {/* Nom du responsable */}
                <span className="min-w-0 truncate text-sm font-medium tracking-tight text-gray-900">
                  {responsable.prenom} {responsable.nom}
                </span>

                {/* Téléphone puis email */}
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm text-gray-900">
                    {responsable.telephone || "—"}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {responsable.email}
                  </span>
                </div>

                {/* Statut */}
                <div className="flex min-w-0 justify-center">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-tight ${statut.style}`}
                  >
                    {statut.label}
                  </span>
                </div>

                {/* Date de création */}
                <span className="truncate text-right text-sm font-medium text-gray-500">
                  {formaterDate(responsable.date_creation)}
                </span>

                {/* Actions : voir le détail et modifier */}
                <div className="flex min-w-0 items-center justify-end gap-3">
                  <Link
                    to={`/admin/responsables/${responsable.id}`}
                    className="text-gray-400 transition-colors hover:text-sky-950"
                    aria-label="Voir le détail"
                    title="Voir le détail"
                  >
                    <Eye className="size-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onEdit(responsable)}
                    className="text-gray-400 transition-colors hover:text-sky-950"
                    aria-label="Modifier"
                    title="Modifier"
                  >
                    <Pencil className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {responsables.length === 0 && (
            <div className="px-8 py-12 text-center text-sm text-gray-400">
              Aucun responsable ne correspond à votre recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
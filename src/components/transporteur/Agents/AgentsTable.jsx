import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../Pagination";

// Colonnes flexibles qui peuvent rétrécir jusqu'à rentrer dans le conteneur.
// Statut et Actions restent fixes pour éviter que les badges/icônes soient écrasés.
const GRID_COLS =
  "grid-cols-[minmax(0,1.5fr)_minmax(0,1.7fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_112px_88px]";

export default function AgentsTable({
  agents,
  onEdit,
  onDelete,
  pagination,
}) {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="w-full overflow-x-auto">
        {/* Header */}
        <div
          className={`grid ${GRID_COLS} border-b border-slate-100 bg-slate-50`}
        >
          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Agent
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Contact
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Adresse
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Permis
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Catégorie
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Expiration
          </div>

          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Statut
          </div>

          <div className="px-3 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
            Actions
          </div>
        </div>

        {/* Aucun agent */}
        {!agents?.length && (
          <div className="px-3 py-8 text-center text-sm text-slate-400">
            Aucun agent trouvé.
          </div>
        )}

        {/* Lignes */}
        {agents?.map((agent) => {
          const isAvailable = agent.disponible === true;
          const permisValide = agent.permis_valide === true;

          return (
            <div
              key={agent.id}
              className={`grid ${GRID_COLS} items-center border-b border-slate-100 last:border-b-0`}
            >
              {/* Agent */}
              <div className="flex min-w-0 items-center gap-3 px-3 py-5">
                <img
                  src={agent.photo}
                  alt={`${agent.prenom} ${agent.nom}`}
                  className="size-10 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <p className="break-words text-base font-bold tracking-tight text-sky-950">
                    {agent.prenom} {agent.nom}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="min-w-0 px-3 py-5">
                <p className="break-words text-sm text-slate-600">
                  {agent.telephone || "-"}
                </p>

                {agent.email && (
                  <p className="mt-0.5 break-words text-sm text-slate-500">
                    {agent.email}
                  </p>
                )}
              </div>

              {/* Adresse */}
              <div className="min-w-0 break-words px-3 py-5 text-sm text-slate-600">
                {agent.adresse || "-"}
              </div>

              {/* Numéro de permis */}
              <div className="min-w-0 break-words px-3 py-5 text-sm text-slate-600">
                {agent.numero_permis || "-"}
              </div>

              {/* Catégorie permis */}
              <div className="min-w-0 break-words px-3 py-5 text-sm text-slate-600">
                {agent.categorie_permis || "-"}
              </div>

              {/* Date d'expiration */}
              <div className="min-w-0 px-3 py-5">
                {agent.date_expiration_permis ? (
                  <p className="text-sm text-slate-600">
                    {new Date(
                      agent.date_expiration_permis
                    ).toLocaleDateString("fr-FR")}
                  </p>
                ) : (
                  <span className="text-sm text-slate-400">-</span>
                )}

                {agent.date_expiration_permis && (
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      permisValide
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {permisValide ? "Valide" : "Expiré"}
                  </span>
                )}
              </div>

              {/* Statut de disponibilité */}
              <div className="min-w-0 px-3 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-tight ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-500"
                      : "bg-slate-100 text-cyan-800"
                  }`}
                >
                  {isAvailable ? "Disponible" : "Indisponible"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 px-3 py-5">
                <button
                  type="button"
                  onClick={() => onEdit?.(agent)}
                  className="text-slate-400 transition hover:text-sky-950"
                  aria-label={`Modifier ${agent.prenom} ${agent.nom}`}
                >
                  <Pencil className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(agent.id)}
                  aria-label={`Supprimer ${agent.prenom}`}
                  className="flex size-8 items-center justify-center text-slate-400 transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          debut={pagination.debut}
          fin={pagination.fin}
          onPageChange={pagination.onPageChange}
          libelle="agents"
        />
      )}
    </section>
  );
}

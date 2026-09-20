import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

export default function MissionsTable({
  // Liste des missions récupérées depuis l'API
  missions = [],
  // Actions fournies par la page
  onEdit,
  onDelete,
  pagination,
}) {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="w-full overflow-x-auto">
        {/* La table utilise directement les missions envoyées
            par MissionsPage.jsx. */}
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Demandeur
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Date Chargement
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Véhicule
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Agent
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Statut
              </th>

              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Afficher les missions reçues depuis l'API */}
            {missions.map((mission) => (
              <MissionRow
                key={mission.id}
                mission={mission}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
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
          libelle="missions"
        />
      )}
    </section>
  );
}

function MissionRow({ mission, onEdit, onDelete }) {
  // ----------------------------------------------------------
  // Préparer les informations de la mission
  // ----------------------------------------------------------

  // Nom complet du demandeur
  const demandeur =
    mission.demandeur || "—";

  // Immatriculation du véhicule
  const vehicule =
    mission.vehicule_immatriculation || "—";

  // Type de véhicule.
  // Le backend peut retourner vehicule_type ou type_vehicule.
  const typeVehicule =
    mission.vehicule_type ||
    mission.type_vehicule ||
    "—";

  // Nom complet de l'agent
  const agentNom = [
    mission.agent_prenom,
    mission.agent_nom,
  ]
    .filter(Boolean)
    .join(" ");

  const agent =
    agentNom || "—";

  // ----------------------------------------------------------
  // Date et heure de chargement
  // ----------------------------------------------------------

  let dateChargement = "—";

  if (
    mission.date_chargement &&
    mission.heure_chargement
  ) {
    const date = new Date(
      `${mission.date_chargement}T${mission.heure_chargement}`
    );

    // Vérifier que la date est valide
    if (!Number.isNaN(date.getTime())) {
      dateChargement = date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  // ----------------------------------------------------------
  // Statut
  // ----------------------------------------------------------

  // Les statuts viennent du backend.
  const statut = mission.statut || "";

  // Traduction du statut technique en texte affiché.
  const statutLabels = {
    PREVU: "Prévue",
    EN_COURS: "En cours",
    TERMINEE: "Terminée",
    ANNULEE: "Annulée",
  };

  const statutAffiche =
    statutLabels[statut] || statut || "—";

  // Déterminer si la mission est terminée
  const isCompleted = statut === "TERMINEE";

  // Style spécifique pour une mission annulée
  const isCancelled = statut === "ANNULEE";

  return (
    <tr className="border-b border-slate-50 last:border-b-0">
      {/* Demandeur */}
      <td className="max-w-[180px] px-6 py-6">
        <span className="block truncate text-sm font-bold tracking-tight text-sky-950">
          {demandeur}
        </span>
      </td>

      {/* Date de chargement */}
      <td className="px-6 py-6">
        <span className="whitespace-nowrap text-xs text-slate-500">
          {dateChargement}
        </span>
      </td>

      {/* Véhicule */}
      <td className="px-6 py-6">
        <div>
          <p className="whitespace-nowrap text-xs font-bold text-slate-700">
            {vehicule}
          </p>

          <p className="whitespace-nowrap text-[10px] uppercase leading-4 text-slate-400">
            {typeVehicule}
          </p>
        </div>
      </td>

      {/* Agent */}
      <td className="px-6 py-6">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {/* Photo de l'agent si le backend la fournit.
              Sinon on conserve le placeholder pour ne pas
              changer le design actuel. */}
          <img
            src={
              mission.agent_photo ||
              "https://placehold.co/24x24"
            }
            alt={agent}
            className="size-6 shrink-0 rounded-full"
          />

          <span className="text-xs font-medium text-slate-700">
            {agent}
          </span>
        </div>
      </td>

      {/* Statut */}
      <td className="px-6 py-6">
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
            isCompleted
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
              : isCancelled
                ? "border-red-500/20 bg-red-500/10 text-red-500"
                : "border-cyan-800/20 bg-cyan-800/10 text-cyan-800"
          }`}
        >
          {statutAffiche}
        </span>
      </td>

      {/* Actions : détail, modifier, supprimer */}
      <td className="whitespace-nowrap px-6 py-6">
        <div className="flex items-center justify-end gap-3">
          {/* Voir le détail */}
          <Link
            to={`/transporteur/missions/${mission.id}`}
            className="text-slate-400 transition hover:text-sky-950"
            aria-label="Voir le détail de la mission"
            title="Voir le détail"
          >
            <Eye className="size-4" />
          </Link>

          {/* Modifier */}
          <button
            type="button"
            onClick={() => onEdit?.(mission)}
            className="text-slate-400 transition hover:text-sky-950"
            aria-label="Modifier la mission"
            title="Modifier"
          >
            <Pencil className="size-4" />
          </button>

          {/* Supprimer */}
          <button
            type="button"
            onClick={() => onDelete?.(mission.id)}
            className="text-slate-400 transition-colors hover:text-red-500"
            aria-label="Supprimer la mission"
            title="Supprimer"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
import { useState } from "react";
import { Plus, X } from "lucide-react";
import MissionCreatedCard from "./MissionCreatedCard";
import { Link } from "react-router-dom";

export default function MissionsCreatedSection({
  // Informations complètes de la demande
  demande,

  // ID de la demande
  demandeId,

  // Liste des missions déjà créées
  missions,

  // Nombre de missions déjà créées
  nombreMissionsCreees,

  // Nombre de véhicules demandés
  nombreVehiculesDemandes,

  // Indique si une nouvelle mission peut encore être créée
  peutCreerMission,

  // Fonction d'annulation fournie par la page
  onCancel,
}) {
  // Popup de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Popup indiquant que l'annulation est impossible
  const [showDateError, setShowDateError] = useState(false);

  // Indique qu'une annulation est en cours
  const [cancelling, setCancelling] = useState(false);

  const STATUTS_MISSION_BLOQUANTS = ["EN_COURS", "TERMINEE"];

  // Vrai si une mission est déjà en cours ou terminée
const annulationBloquee =
  missions?.filter((mission) =>
    STATUTS_MISSION_BLOQUANTS.includes(mission.statut)
  ).length > 0;

  // ----------------------------------------------------------
  // Vérifier si la date de chargement est passée
  // ----------------------------------------------------------

  const chargementEstPasse = () => {
    // Vérifier que la date et l'heure existent
    if (
      !demande?.date_chargement ||
      !demande?.heure_chargement
    ) {
      return false;
    }

    // Construire la date complète du chargement
    const dateChargement = new Date(
      `${demande.date_chargement}T${demande.heure_chargement}`
    );

    // Comparer avec la date actuelle
    return new Date() > dateChargement;
  };

  // ----------------------------------------------------------
  // Cliquer sur "Annuler la demande"
  // ----------------------------------------------------------

  const handleOpenConfirmation = () => {
    // Vérifier si le chargement est déjà passé
    if (chargementEstPasse()) {
      // Afficher la popup d'erreur
      setShowDateError(true);
      return;
    }

    // Sinon afficher la popup de confirmation
    setShowConfirmation(true);
  };

  // ----------------------------------------------------------
  // Confirmer l'annulation
  // ----------------------------------------------------------

  const handleConfirmCancel = async () => {
    try {
      // Bloquer les boutons pendant l'appel API
      setCancelling(true);

      // Appeler la fonction handleCancel de la page
      const resultat = await onCancel?.(demandeId);

      // Si l'annulation a réussi :
      if (resultat) {
        // Fermer la popup
        setShowConfirmation(false);
      }
    } finally {
      // Réactiver les boutons
      setCancelling(false);
    }
  };

  return (
    <>
      <section className="flex w-full flex-col gap-4">
        {/* Titre + actions */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold leading-7 text-sky-950">
              Missions créées
            </h2>

            {/* Compteur dynamique venant de l'API */}
            <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-bold text-slate-700">
              {nombreMissionsCreees} sur {nombreVehiculesDemandes} demandées
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Annuler la demande */}
            {demande?.statut === "PREVU" && !annulationBloquee && (
              <button
                type="button"
                onClick={handleOpenConfirmation}
                disabled={cancelling}
                className="inline-flex items-center justify-center rounded-lg border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="mr-2 size-4" />
                Annuler la demande
              </button>
            )}

            {/* Créer une mission */}
            {peutCreerMission &&
              demande?.statut !== "ANNULEE" && (
                <Link
                  to={`/transporteur/demandes-chargement/${demandeId}/mission`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus className="size-4" />
                  Créer une mission
                </Link>
              )}
          </div>
        </div>

        {/* Missions */}
        <div className="flex w-full flex-col gap-3">
          {missions?.length > 0 ? (
            missions.map((mission) => (
              <MissionCreatedCard
                key={mission.id}
                mission={mission}
              />
            ))
          ) : (
            <div className="rounded-xl bg-white px-6 py-8 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-sm font-medium text-slate-500">
                Pas de mission encore créée pour cette demande.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          POPUP : ANNULATION IMPOSSIBLE
          ====================================================== */}

      {showDateError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Titre + message */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-sky-950">
                  Annulation impossible
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  Impossible d’annuler cette demande : la date
                  et l’heure de chargement sont déjà passées.
                </p>
              </div>

              {/* Fermer la popup */}
              <button
                type="button"
                onClick={() => setShowDateError(false)}
                className="flex size-8 items-center justify-center rounded-full hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="size-4 text-slate-400" />
              </button>
            </div>

            {/* Bouton */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDateError(false)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          POPUP : CONFIRMATION D'ANNULATION
          ====================================================== */}

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Titre + message */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-sky-950">
                  Annuler la demande ?
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  Êtes-vous sûr de vouloir annuler cette
                  demande de chargement ?
                </p>
              </div>

              {/* Fermer le popup */}
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={cancelling}
                className="flex size-8 items-center justify-center rounded-full hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="size-4 text-slate-400" />
              </button>
            </div>

            {/* Boutons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

              {/* Garder la demande */}
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={cancelling}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
              >
                Non, garder
              </button>

              {/* Confirmer l'annulation */}
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling
                  ? "Annulation..."
                  : "Oui, annuler"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
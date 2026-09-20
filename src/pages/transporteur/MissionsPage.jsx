import { useEffect, useState } from "react";

import MissionsPageHeader from "../../components/transporteur/Missions/MissionsPageHeader";
import MissionsFilters from "../../components/transporteur/Missions/MissionsFilters";
import MissionsTable from "../../components/transporteur/Missions/MissionsTable";

import { useMissions } from "../../hooks/useMissions";
import { usePagination } from "../../hooks/usePagination";

export default function MissionsPage() {
  // ----------------------------------------------------------
  // États des filtres
  // ----------------------------------------------------------

  // Texte saisi dans la barre de recherche
  const [search, setSearch] = useState("");

  // Statut sélectionné
  const [status, setStatus] = useState("Tous les statuts");

  // ----------------------------------------------------------
  // Récupération des missions depuis l'API
  // ----------------------------------------------------------

  const {
    missions,
    loading,
    error,
    chargerMissions,
  } = useMissions();

  // ----------------------------------------------------------
  // Charger les missions au chargement de la page
  // ----------------------------------------------------------

  useEffect(() => {
    chargerMissions();
  }, []);

  // ----------------------------------------------------------
  // Filtrer les missions
  // ----------------------------------------------------------

  const filteredMissions = missions.filter((mission) => {
    // Transformer la recherche en minuscules
    // pour rendre la recherche insensible aux majuscules.
    const termeRecherche = search.trim().toLowerCase();

    // Demandeur
    const demandeur = (
      mission.demandeur || ""
    ).toLowerCase();

    // Point de départ
    const depart = (
      mission.point_depart ||
      mission.depart ||
      ""
    ).toLowerCase();

    // Destination
    const destination = (
      mission.destination || ""
    ).toLowerCase();

    // Immatriculation du véhicule
    const immatriculation = (
      mission.vehicule_immatriculation || ""
    ).toLowerCase();

    // Nom complet de l'agent
    const agent = [
      mission.agent_prenom,
      mission.agent_nom,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    // ID de la mission
    const idMission = String(
      mission.id || ""
    ).toLowerCase();

    // Vérifier si la mission correspond à la recherche
    const correspondRecherche =
      !termeRecherche ||
      demandeur.includes(termeRecherche) ||
      depart.includes(termeRecherche) ||
      destination.includes(termeRecherche) ||
      immatriculation.includes(termeRecherche) ||
      agent.includes(termeRecherche) ||
      idMission.includes(termeRecherche);

    // Vérifier si la mission correspond au statut
    const correspondStatut =
      status === "Tous les statuts" ||
      mission.statut === status;

    return (
      correspondRecherche &&
      correspondStatut
    );
  });

    // 8 missions par page, retour à la page 1
  // quand la recherche ou le statut change
  const pagination = usePagination(
    filteredMissions,
    8,
    `${search}|${status}`
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <MissionsPageHeader />

      <main className="flex w-full flex-1 flex-col gap-6 p-6 sm:p-8">
        {/* Filtres */}
        <MissionsFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {/* Chargement */}
        {loading && (
          <p className="text-sm text-slate-500">
            Chargement des missions...
          </p>
        )}

        {/* Erreur */}
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Résultats */}
        {!loading && !error && (
          <>
            {/* Aucune mission trouvée */}
            {filteredMissions.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-semibold text-slate-600">
                  Aucune mission trouvée.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Aucune mission ne correspond à votre recherche ou à votre filtre.
                </p>
              </div>
            ) : (
              // Afficher le tableau uniquement lorsqu'il existe
              // au moins une mission.
              <MissionsTable
                missions={pagination.pageItems}
                pagination={pagination}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}


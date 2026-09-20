import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MissionDetailHeader from "../../components/transporteur/MissionDetail/MissionDetailHeader";
import MissionInfoCard from "../../components/transporteur/MissionDetail/MissionInfoCard";

import { useMissions } from "../../hooks/useMissions";

export default function MissionDetailPage() {
  // Récupère l'identifiant de la mission depuis l'URL.
  //
  // Exemple :
  // /transporteur/missions/12
  //
  // id = "12"
  const { id } = useParams();

  // Récupère les données et la fonction permettant
  // de charger une mission depuis l'API.
  const {
    mission,
    loading,
    error,
    chargerMission,
  } = useMissions();

  // ----------------------------------------------------------
  // Charger la mission
  // ----------------------------------------------------------

  useEffect(() => {
    // Vérifier que l'ID existe avant de faire l'appel API.
    if (id) {
      chargerMission(id);
    }
  }, [id]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      {/* En-tête de la page */}
      <MissionDetailHeader />

      <main className="flex w-full flex-1 flex-col gap-6 overflow-y-auto p-6 sm:p-8">

        {/* Chargement de la mission */}
        {loading && (
          <p className="text-sm text-slate-500">
            Chargement de la mission...
          </p>
        )}

        {/* Erreur lors du chargement */}
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Afficher les informations uniquement
            lorsque la mission est disponible */}
        {!loading && !error && mission && (
          <MissionInfoCard
            mission={mission}
          />
        )}
      </main>
    </div>
  );
}


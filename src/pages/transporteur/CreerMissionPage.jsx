import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MissionPageFooter from "../../components/transporteur/CreerMission/MissionPageFooter";
import MissionPageHeader from "../../components/transporteur/CreerMission/MissionPageHeader";
import MissionRequestSummary from "../../components/transporteur/CreerMission/MissionRequestSummary";
import ResourceAssignmentCard from "../../components/transporteur/CreerMission/ResourceAssignmentCard";

import { useDemandesChargement } from "../../hooks/useDemandesChargement";
import { useMissions } from "../../hooks/useMissions";

export default function CreerMissionPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  // ---------------------------------------------------------
  // DONNÉES DU FORMULAIRE
  // ---------------------------------------------------------

  // ID du véhicule choisi par le Responsable.
  const [
    vehiculeSelectionne,
    setVehiculeSelectionne,
  ] = useState("");

  // ID de l'agent choisi par le Responsable.
  const [
    agentSelectionne,
    setAgentSelectionne,
  ] = useState("");

  // ---------------------------------------------------------
  // HOOK DEMANDES DE CHARGEMENT
  // ---------------------------------------------------------

  const {
    demandeChargement,
    ressourcesDisponibles,
    loading: ressourcesLoading,
    error: ressourcesError,
    chargerDemande,
    chargerRessourcesDisponibles,
  } = useDemandesChargement();

  // ---------------------------------------------------------
  // HOOK MISSIONS
  // ---------------------------------------------------------

  const {
    ajouterMission,
    loading: missionLoading,
    error: missionError,
  } = useMissions();

  // ---------------------------------------------------------
  // CHARGER LA DEMANDE
  // ---------------------------------------------------------

  useEffect(() => {
    if (id) {
      chargerDemande(id);
    }
  }, [id]);

  // ---------------------------------------------------------
  // RECHERCHER LES RESSOURCES DISPONIBLES
  // ---------------------------------------------------------

  useEffect(() => {
    if (!id || !demandeChargement) {
      return;
    }

    // La date de fin appartient maintenant à la demande.
    // On demande donc directement au backend les ressources
    // disponibles pour cette demande.
    chargerRessourcesDisponibles(id);

    // Réinitialiser les anciennes sélections.
    setVehiculeSelectionne("");
    setAgentSelectionne("");
  }, [id, demandeChargement]);

  // ---------------------------------------------------------
  // CRÉER LA MISSION
  // ---------------------------------------------------------

  const handleCreateMission = async () => {
    // Vérifier que toutes les informations obligatoires
    // sont présentes.
    if (
      !id ||
      !vehiculeSelectionne ||
      !agentSelectionne
    ) {
      return;
    }

    // -------------------------------------------------------
    // DONNÉES À ENVOYER AU BACKEND
    // -------------------------------------------------------

    const donnees = {
      // ID de la demande de chargement.
      demande_chargement: Number(id),

      // ID du véhicule sélectionné.
      vehicule: Number(vehiculeSelectionne),

      // ID de l'agent sélectionné.
      agent: Number(agentSelectionne),
    };

    // -------------------------------------------------------
    // ENVOYER LA MISSION
    // -------------------------------------------------------

    const nouvelleMission =
      await ajouterMission(donnees);

    // -------------------------------------------------------
    // APRÈS LA CRÉATION
    // -------------------------------------------------------

    if (nouvelleMission) {
      navigate(
        `/transporteur/demandes-chargement/${id}`
      );
    }
  };

  // ---------------------------------------------------------
  // VÉRIFIER SI LE FORMULAIRE EST VALIDE
  // ---------------------------------------------------------

  const formulaireValide =
    Boolean(vehiculeSelectionne) &&
    Boolean(agentSelectionne);

  // ---------------------------------------------------------
  // AFFICHAGE DE LA PAGE
  // ---------------------------------------------------------

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">

      {/* En-tête de la page */}
      <MissionPageHeader id={id} />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">

        {/* ---------------------------------------------------
            RÉSUMÉ DE LA DEMANDE
            --------------------------------------------------- */}

        <MissionRequestSummary
          demande={demandeChargement}
        />

        {/* ---------------------------------------------------
            ERREUR DE RÉCUPÉRATION DES RESSOURCES
            --------------------------------------------------- */}

        {ressourcesError && (
          <p className="text-sm text-red-500">
            {ressourcesError}
          </p>
        )}

        {/* ---------------------------------------------------
            ERREUR DE CRÉATION DE LA MISSION
            --------------------------------------------------- */}

        {missionError && (
          <p className="text-sm text-red-500">
            {missionError}
          </p>
        )}

        {/* ---------------------------------------------------
            AFFECTATION DES RESSOURCES
            --------------------------------------------------- */}

        <ResourceAssignmentCard
          vehiculeSelectionne={vehiculeSelectionne}
          setVehiculeSelectionne={
            setVehiculeSelectionne
          }

          agentSelectionne={agentSelectionne}
          setAgentSelectionne={
            setAgentSelectionne
          }

          ressourcesDisponibles={
            ressourcesDisponibles
          }

          loading={ressourcesLoading}
        />

      </main>

      {/* -----------------------------------------------------
          FOOTER
          ----------------------------------------------------- */}

      <MissionPageFooter
        // Bouton Annuler :
        // revient à la page précédente.
        onCancel={() => navigate(-1)}

        // Bouton Créer :
        // appelle handleCreateMission().
        onCreate={handleCreateMission}

        // Le bouton est actif uniquement lorsque
        // le véhicule et l'agent sont sélectionnés.
        disabled={!formulaireValide}

        // Pendant le POST :
        // bouton désactivé et texte "Création..."
        saving={missionLoading}
      />

    </div>
  );
}

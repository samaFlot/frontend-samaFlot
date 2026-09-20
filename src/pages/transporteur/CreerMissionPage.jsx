import { useEffect, useState } from "react";

// useNavigate : permet de naviguer vers une autre page avec du code.
// useParams : permet de récupérer les paramètres présents dans l'URL.
import { useNavigate, useParams } from "react-router-dom";

// Composants visuels de la page.
import MissionPageFooter from "../../components/transporteur/CreerMission/MissionPageFooter";
import MissionPageHeader from "../../components/transporteur/CreerMission/MissionPageHeader";
import MissionRequestSummary from "../../components/transporteur/CreerMission/MissionRequestSummary";
import ResourceAssignmentCard from "../../components/transporteur/CreerMission/ResourceAssignmentCard";

// Hook qui permet de gérer les demandes de chargement.
import { useDemandesChargement } from "../../hooks/useDemandesChargement";

// Hook qui permet de gérer les missions.
import { useMissions } from "../../hooks/useMissions";


export default function CreerMissionPage() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ---------------------------------------------------------
  // DONNÉES DU FORMULAIRE
  // ---------------------------------------------------------

  // Date de fin prévue de la mission.
  const [dateFinPrevue, setDateFinPrevue] = useState("");

  // Heure de fin prévue de la mission.
  const [heureFinPrevue, setHeureFinPrevue] = useState("");

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
  // VÉRIFIER LA DATE DE FIN
  // ---------------------------------------------------------

  // Message d'erreur concernant la date de fin.
  // Cette valeur est CALCULÉE à chaque rendu
  let validationDate = "";

  if (
    dateFinPrevue &&
    heureFinPrevue &&
    demandeChargement?.date_chargement &&
    demandeChargement?.heure_chargement
  ) {

    const debutMission = new Date(
      `${demandeChargement.date_chargement}T${demandeChargement.heure_chargement}`
    );

    const finMission = new Date(
      `${dateFinPrevue}T${heureFinPrevue}`
    );

    // La fin doit obligatoirement être après le début.
    if (finMission <= debutMission) {
      validationDate =
        "La date et l'heure de fin prévue doivent être après la date et l'heure de chargement.";
    }
  }


  // ---------------------------------------------------------
  // RECHERCHER LES RESSOURCES DISPONIBLES
  // ---------------------------------------------------------

  useEffect(() => {

    // On ne recherche rien s'il manque l'id, la date ou l'heure.
    if (
      !id ||
      !dateFinPrevue ||
      !heureFinPrevue
    ) {
      return;
    }


    // On attend que la demande soit chargée : sans sa date de chargement,
    // on ne peut pas savoir si la date de fin est valide.
    if (
      !demandeChargement?.date_chargement ||
      !demandeChargement?.heure_chargement
    ) {
      return;
    }


    // Date invalide :
    // on annule les sélections précédentes
    // et on n'appelle PAS l'API.
    if (validationDate) {
      setVehiculeSelectionne("");
      setAgentSelectionne("");
      return;
    }


    // -------------------------------------------------------
    // CONSTRUIRE LA DATE ISO
    // -------------------------------------------------------
    // C'est le format utilisé par ton endpoint.
    const dateFinISO =
      `${dateFinPrevue}T${heureFinPrevue}:00Z`;

    chargerRessourcesDisponibles(
      id,
      dateFinISO
    );


    // -------------------------------------------------------
    // RÉINITIALISER LES SÉLECTIONS
    // -------------------------------------------------------

    // Si le Responsable change la date de fin,
    // les anciennes ressources choisies ne sont plus forcément
    // valables pour la nouvelle période.
    //
    // On les remet donc à vide.
    setVehiculeSelectionne("");
    setAgentSelectionne("");

  }, [
    id,
    dateFinPrevue,
    heureFinPrevue,
    validationDate,
    demandeChargement?.date_chargement,
    demandeChargement?.heure_chargement,
  ]);


  // ---------------------------------------------------------
  // CRÉER LA MISSION
  // ---------------------------------------------------------

  const handleCreateMission = async () => {

    // Sécurité :
    // on ne fait rien si une information obligatoire manque.
    if (
      !id ||
      !dateFinPrevue ||
      !heureFinPrevue ||
      !vehiculeSelectionne ||
      !agentSelectionne ||
      validationDate
    ) {
      return;
    }


    // -------------------------------------------------------
    // CONSTRUIRE LA DATE DE FIN
    // -------------------------------------------------------
    const dateFinISO =
      `${dateFinPrevue}T${heureFinPrevue}:00Z`;


    // -------------------------------------------------------
    // DONNÉES À ENVOYER AU BACKEND
    // -------------------------------------------------------

    const donnees = {

      // ID de la demande.
      demande_chargement: Number(id),

      // ID du véhicule sélectionné.
      vehicule: Number(vehiculeSelectionne),

      // ID de l'agent sélectionné.
      agent: Number(agentSelectionne),

      // Date/heure de fin prévue.
      date_fin_prevue: dateFinISO,
    };


    // -------------------------------------------------------
    // ENVOYER LA MISSION
    // -------------------------------------------------------

    // Appelle le hook useMissions()
    // qui lui-même utilise le service missions.js.
    //
    // Cela provoquera :
    //
    // POST /api/operations/missions/
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

  // Le bouton "Créer la mission" doit être actif
  // uniquement si toutes les informations nécessaires sont présentes.
  const formulaireValide =
    Boolean(dateFinPrevue) &&
    Boolean(heureFinPrevue) &&
    Boolean(vehiculeSelectionne) &&
    Boolean(agentSelectionne) &&
    !validationDate;


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
          dateFinPrevue={dateFinPrevue}
          heureFinPrevue={heureFinPrevue}

          setDateFinPrevue={setDateFinPrevue}
          setHeureFinPrevue={setHeureFinPrevue}

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

          validationDate={validationDate}
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

        // Si false → bouton actif.
        // Si true → bouton désactivé.
        disabled={!formulaireValide}

        // Pendant le POST :
        // bouton désactivé et texte "Création..."
        saving={missionLoading}
      />

    </div>
  );
}
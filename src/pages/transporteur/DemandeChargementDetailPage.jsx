import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DemandeDetailHeader from "../../components/transporteur/DemandesChargement/detail/DemandeDetailHeader";
import DemandeInfoCard from "../../components/transporteur/DemandesChargement/detail/DemandeInfoCard";
import MissionsCreatedSection from "../../components/transporteur/DemandesChargement/detail/MissionsCreatedSection";

import { useDemandesChargement } from "../../hooks/useDemandesChargement";

export default function DemandeChargementDetailPage() {
  // Récupérer l'ID de la demande depuis l'URL
  const { id } = useParams()

  const {
    demandeChargement,
    loading,
    error,
    chargerDemande,
    annulerDemande,
  } = useDemandesChargement();

  // Charger les informations de la demande
  // lorsqu'on arrive sur la page.
  useEffect(() => {
    if (id) {
      chargerDemande(id);
    }
  }, [id]);

  // ----------------------------------------------------------
  // Annuler la demande
  // ----------------------------------------------------------
  const handleCancel = async (demandeId) => {
    // Appeler le hook qui communique avec le backend
    const resultat = await annulerDemande(demandeId);

    // Si l'annulation a réussi
    if (resultat) {
      // Recharger la demande pour récupérer son nouveau statut.
      // Le statut passera notamment de PREVU à ANNULEE.
      await chargerDemande(demandeId);

      // Indiquer au composant MissionsCreatedSection
      // que l'annulation a bien fonctionné.
      return true;
    }

    // L'annulation n'a pas fonctionné
    return false;
  };



  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      {/* En-tête de la page */}
      <DemandeDetailHeader />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        {/* Chargement */}
        {loading && (
          <p className="text-sm text-slate-500">
            Chargement de la demande...
          </p>
        )}

        {/* Erreur */}
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Contenu de la page */}
        {!loading && !error && demandeChargement && (
          <>
            {/* Informations de la demande */}
            <DemandeInfoCard
              demande={demandeChargement}
            />

            {/* Missions associées à la demande */}
            <MissionsCreatedSection
              // Toute la demande est envoyée au composant.
              // Cela permet notamment de vérifier la date de chargement.
              demande={demandeChargement}

              // ID de la demande
              demandeId={id}

              // Liste des missions
              missions={demandeChargement.missions}

              // Nombre de missions créées
              nombreMissionsCreees={
                demandeChargement.nombre_missions_creees
              }

              // Nombre de véhicules demandés
              nombreVehiculesDemandes={
                demandeChargement.nombre_vehicules_demandes
              }

              // Autorisation de créer une mission
              peutCreerMission={
                demandeChargement.peut_creer_mission
              }

              // Utiliser notre fonction handleCancel
              // au lieu de passer directement annulerDemande.
              onCancel={handleCancel}
            />
          </>
        )}
      </main>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DemandeDetailHeader from "../../components/transporteur/DemandesChargement/detail/DemandeDetailHeader";
import { useDemandesChargement } from "../../hooks/useDemandesChargement";
import { useMissions } from "../../hooks/useMissions";
import DemandeResumeCard from "../../components/transporteur/DemandesChargement/detail/detail_IA/DemandeResumeCard";
import DemandeProgressionCard from "../../components/transporteur/DemandesChargement/detail/detail_IA/DemandeProgressionCard";
import PropositionsIASection from "../../components/transporteur/DemandesChargement/detail/detail_IA/PropositionsIASection";
//import MissionsCreatedSection from "../../components/transporteur/DemandesChargement/detail/MissionsCreatedSection";

export default function DemandeChargementDetail() {
  const { id } = useParams();

  const {
    demandeChargement,
    loading,
    error,
    chargerDemande,
    chargerPropositionsIA,
    annulerDemande,
  } = useDemandesChargement();

  const {
    ajouterMission,
  } = useMissions();

  const [propositions, setPropositions] = useState([]);

  const [loadingPropositions, setLoadingPropositions] =
    useState(false);

  const [errorPropositions, setErrorPropositions] =
    useState(null);

  const [messagePropositions, setMessagePropositions] =
    useState(null);

  const [popupSucces, setPopupSucces] = useState(false);

  useEffect(() => {
    if (!id) return;

    chargerDemande(id);
    chargerPropositions();
  }, [id]);

  const chargerPropositions = async () => {
    if (!id) return;

    try {
      setLoadingPropositions(true);
      setErrorPropositions(null);

      const resultat = await chargerPropositionsIA(id);

      if (resultat) {
        console.log(
          "PROPOSITIONS FRONTEND :",
          resultat.propositions
        );

        console.log(
          "MESSAGE IA :",
          resultat.message
        );

        setPropositions(
          resultat.propositions || []
        );

        setMessagePropositions(
          resultat.message || null
        );
      }
    } catch (erreur) {
      console.error(
        "Erreur propositions IA :",
        erreur
      );

      setErrorPropositions(
        "Une erreur est survenue lors du chargement des propositions."
      );
    } finally {
      setLoadingPropositions(false);
    }
  };

  const handleCancel = async (demandeId) => {
    const resultat = await annulerDemande(demandeId);

    if (resultat) {
      await chargerDemande(demandeId);
      return true;
    }

    return false;
  };

  const handleValiderProposition = async (proposition) => {
    try {
      const nouvelleMission = await ajouterMission({
        demande_chargement: id,
        vehicule: proposition.vehicule.id,
        agent: proposition.agent.id,
      });

      if (!nouvelleMission) {
        return;
      }

      // Afficher le popup de succès
      setPopupSucces(true);

    } catch (erreur) {
      console.error(
        "Erreur validation proposition :",
        erreur
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <DemandeDetailHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">

        {/* Chargement de la demande */}
        {loading && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Chargement de la demande...
            </p>
          </div>
        )}

        {/* Erreur demande */}
        {error && (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
            <p className="text-sm font-bold text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Contenu */}
        {!loading &&
          !error &&
          demandeChargement && (
            <>
              {/* Informations de la demande */}
              <DemandeResumeCard
                demande={demandeChargement}
              />

              {/* Progression */}
              <DemandeProgressionCard
                missionsCreees={
                  demandeChargement.nombre_missions_creees
                }
                missionsDemandees={
                  demandeChargement.nombre_vehicules_demandes
                }
              />

              {/* Propositions IA */}
              {demandeChargement.nombre_missions_creees <
                demandeChargement.nombre_vehicules_demandes && (
                <PropositionsIASection
                  propositions={propositions}
                  loading={loadingPropositions}
                  error={errorPropositions}
                  message={messagePropositions}
                  onValider={
                    handleValiderProposition
                  }
                />
              )}
            </>
          )}
      </main>

      {/* Popup de succès */}
      {popupSucces && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-3xl text-emerald-600">
                ✓
              </span>
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#0F2A4A]">
              Mission créée avec succès
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              La proposition de l’IA a été validée et la mission a été créée.
            </p>

            <button
              onClick={async () => {
                setPopupSucces(false);

                // Recharger la demande
                await chargerDemande(id);

                // Recharger les propositions IA
                const resultat =
                  await chargerPropositionsIA(id);

                if (resultat) {
                  setPropositions(
                    resultat.propositions || []
                  );

                  setMessagePropositions(
                    resultat.message || null
                  );
                }
              }}
              className="mt-6 w-full rounded-xl bg-[#0F2A4A] px-5 py-3 font-bold text-white transition hover:opacity-90"
            >
              Continuer
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
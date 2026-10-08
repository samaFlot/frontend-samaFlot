import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useVehicules } from "../../hooks/useVehicules";
import { useTraitementSignalement } from "../../hooks/useTraitementSignalement";

import EnTeteVehicule from "../../components/transporteur/Vehicules/detail/EnTeteVehicule";
import ResumeVehicule from "../../components/transporteur/Vehicules/detail/ResumeVehicule";
import OngletsVehicule from "../../components/transporteur/Vehicules/detail/OngletsVehicule";
import InformationsVehicule from "../../components/transporteur/Vehicules/detail/InformationsVehicule";
import EtatVehicule from "../../components/transporteur/Vehicules/detail/EtatVehicule";
import EmplacementVehicule from "../../components/transporteur/Vehicules/detail/EmplacementVehicule";
import DocumentsActifs from "../../components/transporteur/Vehicules/detail/DocumentsActifs";
import DocumentsVehicule from "../../components/transporteur/Vehicules/detail/DocumentsVehicule";
import SignalementsVehicule from "../../components/transporteur/Vehicules/detail/SignalementsVehicule";
import DetailSignalement from "../../components/transporteur/Vehicules/detail/DetailSignalement";

export default function VehiculeDetail() {
  const { id } = useParams();

  const {
    vehicule,
    loading,
    error,
    chargerVehicule,
  } = useVehicules();

  const {
    ignorer,
    traiter,
    remettreEnBonEtat,
    chargement: chargementTraitement,
    erreur: erreurTraitement,
  } = useTraitementSignalement();

  const [ongletActif, setOngletActif] = useState("informations");
  const [idOuvert, setIdOuvert] = useState(null);

  // Popup de succès
  const [messageSucces, setMessageSucces] = useState(null);

  // Charger le véhicule
  useEffect(() => {
    chargerVehicule(id);
  }, [id]);

  // Faire disparaître le popup automatiquement
  useEffect(() => {
    if (!messageSucces) return;

    const timer = setTimeout(() => {
      setMessageSucces(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [messageSucces]);

  // Signalements du véhicule
  const signalements = vehicule?.signalements || [];

  // Signalement actuellement ouvert
  const signalementOuvert = signalements.find(
    (signalement) => signalement.id === idOuvert
  );

  // ================================
  // Ignorer un signalement
  // ================================
  async function ignorerSignalement() {
    if (!signalementOuvert) return;

    try {
      await ignorer(signalementOuvert.id);

      // Recharger les données depuis l'API
      await chargerVehicule(id);

      setMessageSucces(
        "Signalement ignoré avec succès."
      );
    } catch (error) {
      console.error(
        "Erreur lors de l'ignorance du signalement :",
        error
      );
    }
  }

  // ================================
  // Prendre en compte un signalement
  // ================================
  async function traiterSignalement() {
    if (!signalementOuvert) return;

    try {
      await traiter(signalementOuvert.id);

      // Recharger le véhicule pour récupérer
      // le nouveau statut du signalement
      await chargerVehicule(id);

      setMessageSucces(
        "Signalement pris en compte avec succès."
      );
    } catch (error) {
      console.error(
        "Erreur lors du traitement du signalement :",
        error
      );
    }
  }

  // ================================
  // Remettre le véhicule en bon état
  // ================================
  async function remettreVehiculeEnBonEtat() {
    if (!signalementOuvert) return;

    try {
      await remettreEnBonEtat(signalementOuvert.id);

      // Recharger le véhicule pour récupérer
      // son nouvel état technique
      await chargerVehicule(id);

      setMessageSucces(
        "Véhicule remis en bon état avec succès."
      );
    } catch (error) {
      console.error(
        "Erreur lors de la remise en bon état :",
        error
      );
    }
  }

  // Chargement
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Chargement du véhicule...
        </p>
      </div>
    );
  }

  // Erreur
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  // Aucun véhicule
  if (!vehicule) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Véhicule introuvable.
        </p>
      </div>
    );
  }

  // ================================
  // Page détail d'un signalement
  // ================================
  if (signalementOuvert) {
    return (
      <>
        <DetailSignalement
          signalement={signalementOuvert}
          vehicule={vehicule}
          onRetour={() => setIdOuvert(null)}
          onIgnorer={ignorerSignalement}
          onTraiter={traiterSignalement}
          onRemettreEnBonEtat={remettreVehiculeEnBonEtat}
          chargement={chargementTraitement}
          erreur={erreurTraitement}
        />

        {/* Popup succès */}
        {messageSucces && (
          <div className="fixed top-6 right-6 z-50">
            <div className="flex items-center gap-3 px-5 py-4 bg-white border border-green-100 rounded-2xl shadow-xl">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">
                  ✓
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Succès
                </p>

                <p className="text-sm text-slate-500">
                  {messageSucces}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ================================
  // Page détail du véhicule
  // ================================
  return (
    <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">

      <main className="w-full min-w-0">

        <EnTeteVehicule vehicule={vehicule} />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

          <div className="w-full min-w-0 flex flex-col gap-8">

            <ResumeVehicule vehicule={vehicule} />

            <OngletsVehicule
              ongletActif={ongletActif}
              setOngletActif={setOngletActif}
            />

            {/* INFORMATIONS */}
            {ongletActif === "informations" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 min-w-0 flex flex-col gap-8">

                  <InformationsVehicule
                    vehicule={vehicule}
                  />

                  <EtatVehicule
                    vehicule={vehicule}
                  />

                </div>

                <div className="min-w-0 flex flex-col gap-8">

                  <EmplacementVehicule
                    emplacement={vehicule.derniere_position}
                  />

                  <DocumentsActifs
                    documents={vehicule.documents || []}
                  />

                </div>

              </div>
            )}

            {/* DOCUMENTS */}
            {ongletActif === "documents" && (
              <DocumentsVehicule
                documents={vehicule.documents}
                vehiculeId={vehicule.id}
              />
            )}

            {/* SIGNALEMENTS */}
            {ongletActif === "signalements" && (
              <SignalementsVehicule
                signalements={signalements}
                onVoir={(signalement) =>
                  setIdOuvert(signalement.id)
                }
              />
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DetailSignalement from "../../components/transporteur/Vehicules/detail/DetailSignalement";
import { useTraitementSignalement } from "../../hooks/useTraitementSignalement";
import { recupererSignalement } from "../../services/signalementService";

export default function SignalementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [signalement, setSignalement] = useState(null);
  const [vehicule, setVehicule] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const {
    ignorer,
    traiter,
    remettreEnBonEtat,
    chargement: chargementTraitement,
    erreur: erreurTraitement,
  } = useTraitementSignalement();

  async function chargerSignalement() {
    try {
      setChargement(true);
      setErreur(null);

      const donnees = await recupererSignalement(id);

      // Adapter les données pour le composant DetailSignalement.
      setSignalement({
        ...donnees,
        mission: donnees.mission_details ?? donnees.mission,
      });

      // Récupérer les informations du véhicule.
      if (donnees.vehicule && typeof donnees.vehicule === "object") {
        setVehicule(donnees.vehicule);
      } else {
        setVehicule(null);
        setErreur("Les informations du véhicule ne sont pas disponibles.");
      }
    } catch (error) {
      console.error("Erreur de récupération du signalement :", error);
      setErreur("Impossible de récupérer le signalement.");
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    chargerSignalement();
  }, [id]);

  async function executerAction(action) {
    try {
      await action(signalement.id);
      await chargerSignalement();
    } catch (error) {
      console.error("Erreur de traitement :", error);
    }
  }

  if (chargement && !signalement) {
    return <div className="p-8">Chargement du signalement...</div>;
  }

  if (erreur && !signalement) {
    return <div className="p-8 text-red-500">{erreur}</div>;
  }

  if (!signalement || !vehicule) {
    return <div className="p-8">Signalement introuvable.</div>;
  }

  return (
    <DetailSignalement
      signalement={signalement}
      vehicule={vehicule}
      onRetour={() => navigate(-1)}
      onIgnorer={() => executerAction(ignorer)}
      onTraiter={() => executerAction(traiter)}
      onRemettreEnBonEtat={() => executerAction(remettreEnBonEtat)}
      chargement={chargementTraitement}
      erreur={erreurTraitement}
    />
  );
}
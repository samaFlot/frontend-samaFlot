import { useState } from "react";
import {
  ignorerSignalement,
  traiterSignalement,
  remettreEnBonEtat  as remettreEnBonEtatService,
} from "../services/signalementService";

export function useTraitementSignalement() {
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const ignorer = async (id) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await ignorerSignalement(id);

      return response;
    } catch (error) {
      setErreur(error);
      throw error;
    } finally {
      setChargement(false);
    }
  };

  const traiter = async (id) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await traiterSignalement(id);

      return response;
    } catch (error) {
      setErreur(error);
      throw error;
    } finally {
      setChargement(false);
    }
  };

  const remettreEnBonEtat = async (id) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await remettreEnBonEtatService(id);

      return response;
    } catch (error) {
      setErreur(error);
      throw error;
    } finally {
      setChargement(false);
    }
  };

  return {
    ignorer,
    traiter,
    remettreEnBonEtat,
    chargement,
    erreur,
  };
}
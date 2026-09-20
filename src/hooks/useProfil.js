import { useState } from "react";

import {
  recupererProfil,
  modifierProfil,
  modifierMotDePasse,
} from "../services/profil";

export function useProfil() {
  // Données du profil
  const [profil, setProfil] = useState(null);

  // État de chargement
  const [loading, setLoading] = useState(false);

  // Message d'erreur
  const [error, setError] = useState(null);

  // ----------------------------------------------------------
  // Charger le profil
  // ----------------------------------------------------------

  const chargerProfil = async () => {
    try {
      setLoading(true);
      setError(null);

      // Appel à l'API
      const resultat = await recupererProfil();

      // Stocker le profil récupéré
      setProfil(resultat);

      return resultat;
    } catch (error) {
      console.error(
        "Erreur lors du chargement du profil :",
        error
      );

      setError("Impossible de charger le profil.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // Modifier les informations du profil
  // ----------------------------------------------------------

  const mettreAJourProfil = async (donnees) => {
    const profilModifie = await modifierProfil(donnees);

    setProfil(profilModifie);

    return profilModifie;
  };

  // ----------------------------------------------------------
  // Changer le mot de passe
  // ----------------------------------------------------------

  const changerMotDePasse = async (donnees) => {

    return await modifierMotDePasse(donnees);
  };

  return {
    profil,
    loading,
    error,
    chargerProfil,
    mettreAJourProfil,
    changerMotDePasse,
  };
}
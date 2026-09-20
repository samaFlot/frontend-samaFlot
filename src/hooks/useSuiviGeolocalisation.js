import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { recupererSuivi } from "../services/geolocalisation";

export const useSuiviGeolocalisation = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chargerSuivi = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererSuivi();

      setPositions(donnees);
    } catch (error) {
      console.error(
        "Erreur récupération suivi GPS :",
        error
      );

      setError(
        "Impossible de récupérer les positions des véhicules."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Appelle automatiquement l'API
  // lorsque le composant est chargé.
  useEffect(() => {
    chargerSuivi();
  }, [chargerSuivi]);

  return {
    positions,
    loading,
    error,
    chargerSuivi,
  };
};
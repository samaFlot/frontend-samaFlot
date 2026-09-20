import { useCallback, useEffect, useState } from 'react';

import {
  recupererMissions,
  recupererMission,
  creerMission,
} from '../services/missions';

export const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const [mission, setMission] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger toutes les missions.
  const chargerMissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererMissions();

      setMissions(donnees);
    } catch (error) {
      console.error(
        'Erreur récupération missions :',
        error
      );

      setError(
        'Impossible de récupérer les missions.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger une mission.
  const chargerMission = async (missionId) => {
    try {
      setLoading(true);
      setError(null);

      const donnees =
        await recupererMission(missionId);

      setMission(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur récupération mission :',
        error
      );

      setError(
        'Impossible de récupérer la mission.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Créer une mission.
  const ajouterMission = async (donnees) => {
    try {
      setLoading(true);
      setError(null);

      const nouvelleMission =
        await creerMission(donnees);

      setMissions((liste) => [
        ...liste,
        nouvelleMission,
      ]);

      return nouvelleMission;
    } catch (error) {
      console.error(
        'Erreur création mission :',
        error
      );

      setError(
        'Impossible de créer la mission.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial.
  useEffect(() => {
    chargerMissions();
  }, [chargerMissions]);

  return {
    missions,
    mission,
    loading,
    error,
    chargerMissions,
    chargerMission,
    ajouterMission,
  };
};
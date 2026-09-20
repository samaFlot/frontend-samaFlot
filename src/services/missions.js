import api from './api';

// Récupérer toutes les missions.
export const recupererMissions = async () => {
  const response = await api.get(
    '/operations/missions/'
  );

  return response.data;
};

// Récupérer une mission.
export const recupererMission = async (missionId) => {
  const response = await api.get(
    `/operations/missions/${missionId}/`
  );

  return response.data;
};

// Créer une mission.
export const creerMission = async (donnees) => {
  const response = await api.post(
    '/operations/missions/',
    donnees
  );

  return response.data;
};
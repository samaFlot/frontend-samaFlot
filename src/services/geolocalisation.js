import api from './api';

// Récupérer les dernières positions des véhicules.
export const recupererSuivi = async () => {
  const response = await api.get(
    'geolocalisation/suivi/'
  );

  return response.data;
};
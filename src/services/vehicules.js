import api from './api';

// Récupérer la liste des véhicules.
export const recupererVehicules = async () => {
  const response = await api.get('/flotte/vehicules/');

  return response.data;
};

// Récupérer un véhicule.
export const recupererVehicule = async (vehiculeId) => {
  const response = await api.get(
    `/flotte/vehicules/${vehiculeId}/`
  );

  return response.data;
};

// Créer un véhicule.
export const creerVehicule = async (donnees) => {
  const response = await api.post(
    '/flotte/vehicules/',
    donnees
  );

  return response.data;
};

// Modifier un véhicule.
export const modifierVehicule = async (
  vehiculeId,
  donnees
) => {
  const response = await api.patch(
    `/flotte/vehicules/${vehiculeId}/`,
    donnees
  );

  return response.data;
};

// Supprimer un véhicule.
export const supprimerVehicule = async (vehiculeId) => {
  const response = await api.delete(
    `/flotte/vehicules/${vehiculeId}/`
  );

  return response.data;
};
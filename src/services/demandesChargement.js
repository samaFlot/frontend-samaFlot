import api from './api';

// Récupérer toutes les demandes de chargement.
export const recupererDemandesChargement = async () => {
  const response = await api.get(
    '/operations/demandes-chargement/'
  );

  return response.data;
};

// Récupérer une demande.
export const recupererDemandeChargement = async (
  demandeId
) => {
  const response = await api.get(
    `/operations/demandes-chargement/${demandeId}/`
  );

  return response.data;
};

// Créer une demande.
export const creerDemandeChargement = async (
  donnees
) => {
  const response = await api.post(
    '/operations/demandes-chargement/',
    donnees
  );

  return response.data;
};

// Annuler une demande.
export const annulerDemandeChargement = async (
  demandeId
) => {
  const response = await api.post(
    `/operations/demandes-chargement/${demandeId}/annuler/`
  );

  return response.data;
};

// Récupérer les ressources disponibles pour une demande.
export const recupererRessourcesDisponibles =
  async (demandeId, dateFinPrevue) => {
    const response = await api.get(
      `/operations/demandes-chargement/${demandeId}/ressources-disponibles/`,
      {
        params: {
          date_fin_prevue: dateFinPrevue,
        },
      }
    );

    return response.data;
  };
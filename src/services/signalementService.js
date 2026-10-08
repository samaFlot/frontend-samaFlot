import api from "./api";

// Ignorer un signalement
export const ignorerSignalement = async (id) => {
  const response = await api.post(`/signalements/${id}/ignorer/`);
  return response.data;
};

// Prendre en compte un signalement
export const traiterSignalement = async (id) => {
  const response = await api.post(`/signalements/${id}/traiter/`);
  return response.data;
};

// Remettre le véhicule en bon état
export const remettreEnBonEtat = async (id) => {
  const response = await api.post(
    `/signalements/${id}/remettre_en_bon_etat/`
  );
  return response.data;
};
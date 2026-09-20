import api from './api';

// Récupérer tous les agents.
export const recupererAgents = async () => {
  const response = await api.get('/flotte/agents/');

  return response.data;
};

// Récupérer un agent.
export const recupererAgent = async (agentId) => {
  const response = await api.get(
    `/flotte/agents/${agentId}/`
  );

  return response.data;
};

// Créer un agent.
export const creerAgent = async (donnees) => {
  const response = await api.post(
    '/flotte/agents/',
    donnees
  );

  return response.data;
};

// Modifier un agent.
export const modifierAgent = async (
  agentId,
  donnees
) => {
  const response = await api.patch(
    `/flotte/agents/${agentId}/`,
    donnees
  );

  return response.data;
};

// Supprimer un agent.
export const supprimerAgent = async (agentId) => {
  const response = await api.delete(
    `/flotte/agents/${agentId}/`
  );

  return response.data;
};

// Réinitialiser l'accès d'un agent.
export const reinitialiserAccesAgent = async (
  agentId
) => {
  const response = await api.post(
    `/flotte/agents/${agentId}/reinitialiser-acces/`
  );

  return response.data;
};
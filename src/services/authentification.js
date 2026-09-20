import api from './api';


export const connexion = async (email, password) => {
  // Envoie les identifiants à l'API Django.
  const response = await api.post('/comptes/connexion/', {
    email,
    password,
  });

  // Retourne les données de connexion.
  return response.data;
};
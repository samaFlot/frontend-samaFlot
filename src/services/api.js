import axios from 'axios';

// Instance Axios utilisée pour communiquer avec l'API Django.
const api = axios.create({
  // Adresse de base de l'API.
  baseURL: 'http://127.0.0.1:8000/api',

  // Temps maximum d'attente d'une requête.
  timeout: 30000,
});

// Intercepteur exécuté avant chaque requête.
api.interceptors.request.use(
  (config) => {
    // Récupère le token enregistré dans le navigateur.
    const accessToken = localStorage.getItem('accessToken');

    // Si un token existe, on l'ajoute automatiquement.
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Transmet l'erreur si la requête ne peut pas être préparée.
    return Promise.reject(error);
  }
);

export default api;
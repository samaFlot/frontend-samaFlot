import { useState } from 'react';
import axios from 'axios';

import { connexion } from '../services/authentification';

/**
 * Hook qui gère la connexion de l'utilisateur.
 */
export const useAuthentification = () => {
  // Indique si la requête de connexion est en cours.
  const [loading, setLoading] = useState(false);

  // Contient le message d'erreur.
  const [error, setError] = useState(null);

  // Contient les données de l'utilisateur connecté.
  const [user, setUser] = useState(null);

  /**
   * Authentifie l'utilisateur auprès du backend.
   */
  const authentifier = async (email, password) => {
    try {
      // Supprime l'ancienne erreur.
      setError(null);

      // Active l'état de chargement.
      setLoading(true);

      // Appelle le service d'authentification.
      const response = await connexion(email, password);

      // Affiche la réponse reçue de Django.
      console.log('Réponse connexion :', response);

      // Sauvegarde les informations de l'utilisateur.
      setUser(response);

      // Retourne les données reçues.
      return response;
    } catch (error) {
      console.error(
        'Erreur authentification :',
        error
      );

      // Erreur Axios.
      if (axios.isAxiosError(error)) {
        // Django a répondu avec une erreur HTTP.
        if (error.response) {
          console.error(
            'Status Django :',
            error.response.status
          );

          console.error(
            'Réponse Django :',
            error.response.data
          );

          // Message affiché à l'utilisateur.
          if (error.response.status === 401) {
            setError(
              'Email ou mot de passe incorrect.'
            );
          } else {
            setError(
              'Une erreur est survenue lors de la connexion.'
            );
          }
        }

        // Le serveur n'a pas répondu.
        else {
          setError(
            'Impossible de contacter le serveur.'
          );
        }
      } else {
        // Erreur qui n'est pas liée à Axios.
        setError(
          'Une erreur inattendue est survenue.'
        );
      }

      // Indique que la connexion a échoué.
      return null;
    } finally {
      // Désactive le chargement dans tous les cas.
      setLoading(false);
    }
  };

  return {
    authentifier,
    loading,
    error,
    user,
  };
};
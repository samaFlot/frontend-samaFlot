import { useCallback, useEffect, useState } from 'react';

import {
  recupererAgents,
  recupererAgent,
  creerAgent,
  modifierAgent,
  supprimerAgent,
  reinitialiserAccesAgent,
} from '../services/agents';

export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger la liste des agents.
  const chargerAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererAgents();

      setAgents(donnees);
    } catch (error) {
      console.error(
        'Erreur récupération agents :',
        error
      );

      setError(
        'Impossible de récupérer les agents.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger un agent.
  const chargerAgent = async (agentId) => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererAgent(agentId);

      setAgent(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur récupération agent :',
        error
      );

      setError(
        'Impossible de récupérer l’agent.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Créer un agent.
const ajouterAgent = async (donnees) => {
  try {
    setLoading(true);
    setError(null);

    const nouvelAgent = await creerAgent(donnees);

    // On recharge la liste depuis le serveur : la réponse du POST
    // ne contient pas forcément l'URL de la photo.
    await chargerAgents();

    return nouvelAgent;
  } catch (error) {
    console.error(
      'Erreur création agent :',
      error
    );

    setError(
      'Impossible de créer l’agent.'
    );

    return null;
  } finally {
    setLoading(false);
  }
};


// Modifier un agent.
const mettreAJourAgent = async (
  agentId,
  donnees
) => {
  try {
    setLoading(true);
    setError(null);

    const agentModifie = await modifierAgent(
      agentId,
      donnees
    );

    // On recharge la liste depuis le serveur pour avoir
    // les données à jour (photo, champs calculés, etc.).
    await chargerAgents();

    return agentModifie;
  } catch (error) {
    console.error(
      'Erreur modification agent :',
      error
    );

    setError(
      'Impossible de modifier l’agent.'
    );

    return null;
  } finally {
    setLoading(false);
  }
};

  // Supprimer un agent.
  const retirerAgent = async (agentId) => {
    try {
      setLoading(true);
      setError(null);

      await supprimerAgent(agentId);

      setAgents((liste) =>
        liste.filter(
          (item) => item.id !== agentId
        )
      );

      return true;
    } catch (error) {
      console.error(
        'Erreur suppression agent :',
        error
      );

      setError(
        'Impossible de supprimer l’agent.'
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Réinitialiser l'accès.
  const reinitialiserAcces = async (agentId) => {
    try {
      setLoading(true);
      setError(null);

      const resultat =
        await reinitialiserAccesAgent(
          agentId
        );

      return resultat;
    } catch (error) {
      console.error(
        'Erreur réinitialisation accès :',
        error
      );

      setError(
        'Impossible de réinitialiser l’accès.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial.
  useEffect(() => {
    chargerAgents();
  }, [chargerAgents]);

  return {
    agents,
    agent,
    loading,
    error,
    chargerAgents,
    chargerAgent,
    ajouterAgent,
    mettreAJourAgent,
    retirerAgent,
    reinitialiserAcces,
  };
};
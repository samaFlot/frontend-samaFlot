import { useCallback, useEffect, useState } from 'react';

import {
  recupererResponsables,
  recupererResponsable,
  creerResponsable,
  modifierResponsable,
  activerResponsable,
  desactiverResponsable,
  reinitialiserAccesResponsable,
} from '../services/responsables';

export const useResponsables = () => {
  const [responsables, setResponsables] = useState([]);
  const [responsable, setResponsable] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger la liste des responsables.
  const chargerResponsables = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererResponsables(params);

      // Gère une réponse simple ou paginée par DRF
      setResponsables(
        Array.isArray(donnees) ? donnees : donnees.results || []
      );
    } catch (error) {
      console.error(
        'Erreur récupération responsables :',
        error
      );

      setError(
        'Impossible de récupérer les responsables.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger un responsable.
  const chargerResponsable = async (responsableId) => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererResponsable(responsableId);

      setResponsable(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur récupération responsable :',
        error
      );

      setError(
        'Impossible de récupérer le responsable.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Créer un responsable.
  const ajouterResponsable = async (donnees) => {

    const nouveauResponsable = await creerResponsable(donnees);

    // On recharge la liste depuis le serveur pour avoir
    // les données complètes (photo, date de création...).
    await chargerResponsables();

    return nouveauResponsable;
  };

  // Modifier un responsable (même principe que pour la création).
  const mettreAJourResponsable = async (responsableId, donnees) => {
    const responsableModifie = await modifierResponsable(
      responsableId,
      donnees
    );

    // On recharge la liste pour afficher les nouvelles informations
    await chargerResponsables();

    return responsableModifie;
  };

  // Activer un compte.
  const activerCompte = async (responsableId) => {
    try {
      setError(null);

      const resultat = await activerResponsable(responsableId);

      // Mettre à jour le statut dans la liste, sans recharger
      setResponsables((liste) =>
        liste.map((item) =>
          item.id === responsableId
            ? { ...item, statut_compte: resultat.statut_compte }
            : item
        )
      );

      return true;
    } catch (error) {
      console.error(
        'Erreur activation responsable :',
        error
      );

      setError(
        'Impossible d’activer le compte.'
      );

      return false;
    }
  };

  // Désactiver un compte.
  const desactiverCompte = async (responsableId) => {
    try {
      setError(null);

      const resultat = await desactiverResponsable(responsableId);

      // Mettre à jour le statut dans la liste, sans recharger
      setResponsables((liste) =>
        liste.map((item) =>
          item.id === responsableId
            ? { ...item, statut_compte: resultat.statut_compte }
            : item
        )
      );

      return true;
    } catch (error) {
      console.error(
        'Erreur désactivation responsable :',
        error
      );

      setError(
        'Impossible de désactiver le compte.'
      );

      return false;
    }
  };

  // Réinitialiser l'accès (nouveau mot de passe envoyé par email).
  const reinitialiserAcces = async (responsableId) => {
    try {
      setError(null);

      const resultat = await reinitialiserAccesResponsable(
        responsableId
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
    }
  };

  // Chargement initial.
  useEffect(() => {
    chargerResponsables();
  }, [chargerResponsables]);

  return {
    responsables,
    responsable,
    loading,
    error,
    chargerResponsables,
    chargerResponsable,
    ajouterResponsable,
    mettreAJourResponsable,
    activerCompte,
    desactiverCompte,
    reinitialiserAcces,
  };
};
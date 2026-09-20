import { useCallback, useEffect, useState } from 'react';

import {
  recupererDemandesChargement,
  recupererDemandeChargement,
  creerDemandeChargement,
  annulerDemandeChargement,
  recupererRessourcesDisponibles,
} from '../services/demandesChargement';

export const useDemandesChargement = () => {
  const [
    demandesChargement,
    setDemandesChargement,
  ] = useState([]);

  const [
    demandeChargement,
    setDemandeChargement,
  ] = useState(null);

  const [
    ressourcesDisponibles,
    setRessourcesDisponibles,
  ] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger toutes les demandes.
  const chargerDemandes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const donnees =
        await recupererDemandesChargement();

      setDemandesChargement(donnees);
    } catch (error) {
      console.error(
        'Erreur récupération demandes :',
        error
      );

      setError(
        'Impossible de récupérer les demandes.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger une demande.
  const chargerDemande = async (demandeId) => {
    try {
      setLoading(true);
      setError(null);

      const donnees =
        await recupererDemandeChargement(
          demandeId
        );

      setDemandeChargement(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur récupération demande :',
        error
      );

      setError(
        'Impossible de récupérer la demande.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Créer une demande.
  const ajouterDemande = async (donnees) => {
    try {
      setLoading(true);
      setError(null);

      const nouvelleDemande =
        await creerDemandeChargement(
          donnees
        );

      setDemandesChargement((liste) => [
        ...liste,
        nouvelleDemande,
      ]);

      return nouvelleDemande;
    } catch (error) {
      console.error(
        'Erreur création demande :',
        error
      );

      setError(
        'Impossible de créer la demande.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Annuler une demande.
  const annulerDemande = async (demandeId) => {
    try {
      setLoading(true);
      setError(null);

      const resultat =
        await annulerDemandeChargement(
          demandeId
        );

      // Recharge la liste après annulation.
      await chargerDemandes();

      return resultat;
    } catch (error) {
      console.error(
        'Erreur annulation demande :',
        error
      );

      setError(
        'Impossible d’annuler la demande.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Charger les ressources disponibles.
  const chargerRessourcesDisponibles = async (
    demandeId,
    dateFinPrevue
  ) => {
    try {
      setLoading(true);
      setError(null);

      const donnees =
        await recupererRessourcesDisponibles(
          demandeId,
          dateFinPrevue
        );

      setRessourcesDisponibles(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur ressources disponibles :',
        error
      );

      setError(
        'Impossible de récupérer les ressources disponibles.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial.
  useEffect(() => {
    chargerDemandes();
  }, [chargerDemandes]);

  return {
    demandesChargement,
    demandeChargement,
    ressourcesDisponibles,
    loading,
    error,
    chargerDemandes,
    chargerDemande,
    ajouterDemande,
    annulerDemande,
    chargerRessourcesDisponibles,
  };
};
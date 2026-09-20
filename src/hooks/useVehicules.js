import { useCallback, useEffect, useState } from 'react';

import {
  recupererVehicules,
  recupererVehicule,
  creerVehicule,
  modifierVehicule,
  supprimerVehicule,
} from '../services/vehicules';

export const useVehicules = () => {
  const [vehicules, setVehicules] = useState([]);
  const [vehicule, setVehicule] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger tous les véhicules.
  const chargerVehicules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererVehicules();

      setVehicules(donnees);
    } catch (error) {
      console.error(
        'Erreur récupération véhicules :',
        error
      );

      setError(
        'Impossible de récupérer les véhicules.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger un véhicule.
  const chargerVehicule = async (vehiculeId) => {
    try {
      setLoading(true);
      setError(null);

      const donnees = await recupererVehicule(vehiculeId);

      setVehicule(donnees);

      return donnees;
    } catch (error) {
      console.error(
        'Erreur récupération véhicule :',
        error
      );

      setError(
        'Impossible de récupérer le véhicule.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un véhicule.
  const ajouterVehicule = async (donnees) => {
    try {
      setLoading(true);
      setError(null);

      const nouveauVehicule =
        await creerVehicule(donnees);

      setVehicules((liste) => [
        ...liste,
        nouveauVehicule,
      ]);

      return nouveauVehicule;
    } catch (error) {
      console.error(
        'Erreur création véhicule :',
        error
      );

      setError(
        'Impossible de créer le véhicule.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Modifier un véhicule.
  const mettreAJourVehicule = async (
    vehiculeId,
    donnees
  ) => {
    try {
      setLoading(true);
      setError(null);

      const vehiculeModifie =
        await modifierVehicule(
          vehiculeId,
          donnees
        );

      setVehicules((liste) =>
        liste.map((item) =>
          item.id === vehiculeId
            ? vehiculeModifie
            : item
        )
      );

      return vehiculeModifie;
    } catch (error) {
      console.error(
        'Erreur modification véhicule :',
        error
      );

      setError(
        'Impossible de modifier le véhicule.'
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un véhicule.
  const retirerVehicule = async (vehiculeId) => {
    try {
      setLoading(true);
      setError(null);

      await supprimerVehicule(vehiculeId);

      setVehicules((liste) =>
        liste.filter(
          (item) => item.id !== vehiculeId
        )
      );

      return true;
    } catch (error) {
      console.error(
        'Erreur suppression véhicule :',
        error
      );

      setError(
        'Impossible de supprimer le véhicule.'
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial.
  useEffect(() => {
    chargerVehicules();
  }, [chargerVehicules]);

  return {
    vehicules,
    vehicule,
    loading,
    error,
    chargerVehicules,
    chargerVehicule,
    ajouterVehicule,
    mettreAJourVehicule,
    retirerVehicule,
  };
};
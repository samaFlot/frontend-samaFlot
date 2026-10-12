import { useState } from "react";

import {
  ajouterDocument,
  modifierDocument,
  supprimerDocument,
  telechargerDocument,
} from "../services/documents";

export const useDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ajouter un document
  const ajouterNouveauDocument = async (vehiculeId, donnees) => {
    try {
      setLoading(true);
      setError(null);

      const document = await ajouterDocument(vehiculeId, donnees);

      return document;
    } catch (error) {
      console.error("Erreur ajout document :", error);

      setError("Impossible d'ajouter le document.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Modifier un document
  const modifierDocumentExistant = async (documentId, donnees) => {
    try {
      setLoading(true);
      setError(null);

      const document = await modifierDocument(documentId, donnees);

      return document;
    } catch (error) {
      console.error("Erreur modification document :", error);

      setError("Impossible de modifier le document.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un document
  const supprimerDocumentExistant = async (documentId) => {
    try {
      setLoading(true);
      setError(null);

      await supprimerDocument(documentId);

      return true;
    } catch (error) {
      console.error("Erreur suppression document :", error);

      setError("Impossible de supprimer le document.");

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Télécharger un document
  const telechargerDocumentExistant = async (documentId) => {
    try {
      setLoading(true);
      setError(null);

      const fichier = await telechargerDocument(documentId);

      return fichier;
    } catch (error) {
      console.error("Erreur téléchargement document :", error);

      setError("Impossible de télécharger le document.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    ajouterNouveauDocument,
    modifierDocumentExistant,
    supprimerDocumentExistant,
    telechargerDocumentExistant,
  };
};
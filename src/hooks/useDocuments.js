import { useState } from "react";

import {
  ajouterDocument,
} from "../services/documents";

export const useDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ajouter un document.
  const ajouterNouveauDocument = async (
    vehiculeId,
    donnees
  ) => {
    try {
      setLoading(true);
      setError(null);

      const document =
        await ajouterDocument(
          vehiculeId,
          donnees
        );

      return document;
    } catch (error) {
      console.error(
        "Erreur ajout document :",
        error
      );

      setError(
        "Impossible d'ajouter le document."
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    ajouterNouveauDocument,
  };
};

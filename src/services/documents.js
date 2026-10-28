import api from "./api";

// Ajouter un document à un véhicule
export const ajouterDocument = async (vehiculeId, donnees) => {
  const formData = new FormData();

  formData.append("vehicule", vehiculeId);
  formData.append("type_document", donnees.type_document);
  formData.append("numero_document", donnees.numero_document || "");
  formData.append("date_emission", donnees.date_emission);
  formData.append("date_expiration", donnees.date_expiration);
  formData.append("fichier", donnees.fichier);

  const response = await api.post("/documents/", formData);

  return response.data;
};

// Modifier un document
export const modifierDocument = async (documentId, donnees) => {
  const formData = new FormData();

  formData.append("type_document", donnees.type_document);
  formData.append("numero_document", donnees.numero_document || "");
  formData.append("date_emission", donnees.date_emission);
  formData.append("date_expiration", donnees.date_expiration);

  // Ajouter le fichier uniquement si un nouveau fichier est fourni
  if (donnees.fichier) {
    formData.append("fichier", donnees.fichier);
  }

  const response = await api.patch(
    `/documents/${documentId}/`,
    formData
  );

  return response.data;
};

// Supprimer un document
export const supprimerDocument = async (documentId) => {
  await api.delete(`/documents/${documentId}/`);
};

// Télécharger un document
export const telechargerDocument = async (documentId) => {
  const response = await api.get(
    `/documents/${documentId}/telecharger/`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};
import api from "./api";

// Ajouter un document à un véhicule.
export const ajouterDocument = async (
  vehiculeId,
  donnees
) => {
  const formData = new FormData();

  formData.append(
    "vehicule",
    vehiculeId
  );

  formData.append(
    "type_document",
    donnees.type_document
  );

  formData.append(
    "numero_document",
    donnees.numero_document || ""
  );

  formData.append(
    "date_emission",
    donnees.date_emission
  );

  formData.append(
    "date_expiration",
    donnees.date_expiration
  );

  formData.append(
    "fichier",
    donnees.fichier
  );

  const response = await api.post(
    "/documents/",
    formData
  );

  return response.data;
};

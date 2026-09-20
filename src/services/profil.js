import api from "./api";

// Récupérer le profil de l'utilisateur connecté
export const recupererProfil = async () => {
  const response = await api.get("/comptes/profil/");
  return response.data;
};

// Modifier le profil.
export const modifierProfil = async (donnees) => {
  const response = await api.patch(
    '/comptes/profil/',
    donnees
  );

  return response.data;
};

// Modifier le mot de passe de l'utilisateur connecté.
export const modifierMotDePasse = async (donnees) => {
  const response = await api.post(
    '/comptes/mot-de-passe/',
    donnees
  );

  return response.data;
};


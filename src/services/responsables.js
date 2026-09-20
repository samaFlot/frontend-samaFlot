import api from './api';

// Récupérer tous les responsables.
// `params` est optionnel : { statut: 'ACTIF', recherche: 'texte' }
// (le backend sait filtrer, mais on peut aussi filtrer côté React).
export const recupererResponsables = async (params = {}) => {
  const response = await api.get(
    '/comptes/responsables/',
    { params }
  );

  return response.data;
};

// Récupérer un responsable.
export const recupererResponsable = async (responsableId) => {
  const response = await api.get(
    `/comptes/responsables/${responsableId}/`
  );

  return response.data;
};

// Créer un responsable.
// `donnees` est un FormData : nom_entreprise, nom, prenom, telephone,
// adresse, email et photo (optionnelle).
export const creerResponsable = async (donnees) => {
  const response = await api.post(
    '/comptes/responsables/',
    donnees
  );

  return response.data;
};

// Modifier un responsable (on envoie tous les champs).
export const modifierResponsable = async (responsableId, donnees) => {
  const response = await api.put(
    `/comptes/responsables/${responsableId}/`,
    donnees
  );

  return response.data;
};

// Activer un compte responsable.
// Réponse : { statut_compte: 'ACTIF' }
export const activerResponsable = async (responsableId) => {
  const response = await api.post(
    `/comptes/responsables/${responsableId}/activer/`
  );

  return response.data;
};

// Désactiver un compte responsable.
// Réponse : { statut_compte: 'DESACTIVE' }
export const desactiverResponsable = async (responsableId) => {
  const response = await api.post(
    `/comptes/responsables/${responsableId}/desactiver/`
  );

  return response.data;
};

// Réinitialiser l'accès : nouveau mot de passe généré et envoyé par email.
export const reinitialiserAccesResponsable = async (
  responsableId
) => {
  const response = await api.post(
    `/comptes/responsables/${responsableId}/reinitialiser-acces/`
  );

  return response.data;
};
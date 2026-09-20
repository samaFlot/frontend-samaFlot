import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AccountActionsCard from "../../components/admin/DetailResponsable/AccountActionsCard";
import ActionPopup from "../../components/admin/DetailResponsable/ActionPopup";
import ResponsableDetailHeader from "../../components/admin/DetailResponsable/ResponsableDetailHeader";
import ResponsableInfoCard from "../../components/admin/DetailResponsable/ResponsableInfoCard";

import { useResponsables } from "../../hooks/useResponsables";

// La base contient "ACTIF" / "DESACTIVE",
// les composants affichent "Actif" / "Désactivé"
const LIBELLES_STATUT = {
  ACTIF: "Actif",
  DESACTIVE: "Désactivé",
};

// Popup affiché quand une action échoue
const POPUP_ERREUR = {
  variant: "error",
  title: "Une erreur est survenue",
  message: "L'action n'a pas pu être effectuée. Veuillez réessayer.",
};

export default function ResponsableDetailPage() {
  // L'id du responsable est dans l'URL : /admin/responsables/:id
  const { id } = useParams();

  // Popup affiché (null = aucun)
  const [popup, setPopup] = useState(null);

  // Une action est en cours d'envoi
  const [processing, setProcessing] = useState(false);

  const {
    responsable,
    loading,
    error,
    chargerResponsable,
    activerCompte,
    desactiverCompte,
    reinitialiserAcces,
  } = useResponsables();

  // ----------------------------------------------------------
  // Charger le responsable quand la page s'ouvre
  // ----------------------------------------------------------

  useEffect(() => {
    chargerResponsable(id);
  }, [id]);

  // ----------------------------------------------------------
  // Fermer le popup (impossible pendant un envoi)
  // ----------------------------------------------------------

  const closePopup = () => {
    if (!processing) {
      setPopup(null);
    }
  };

  // ----------------------------------------------------------
  // Actions sur le compte : popup de confirmation,
  // puis popup de résultat
  // ----------------------------------------------------------

  const handleActivate = () => {
    setPopup({
      variant: "activate",
      title: "Activer ce compte ?",
      message: "Le responsable pourra de nouveau se connecter.",
      confirmLabel: "Oui, activer",
      onConfirm: async () => {
        setProcessing(true);

        const reussi = await activerCompte(id);

        // Recharger le responsable pour afficher le nouveau statut
        if (reussi) {
          await chargerResponsable(id);
        }

        setProcessing(false);

        setPopup(
          reussi
            ? {
                variant: "success",
                title: "Compte activé",
                message: "Le responsable peut de nouveau se connecter.",
              }
            : POPUP_ERREUR
        );
      },
    });
  };

  const handleDeactivate = () => {
    setPopup({
      variant: "danger",
      title: "Désactiver ce compte ?",
      message:
        "Le responsable ne pourra plus se connecter tant que le compte ne sera pas réactivé.",
      confirmLabel: "Oui, désactiver",
      onConfirm: async () => {
        setProcessing(true);

        const reussi = await desactiverCompte(id);

        if (reussi) {
          await chargerResponsable(id);
        }

        setProcessing(false);

        setPopup(
          reussi
            ? {
                variant: "success",
                title: "Compte désactivé",
                message: "Le responsable ne peut plus se connecter.",
              }
            : POPUP_ERREUR
        );
      },
    });
  };

  const handleResetAccess = () => {
    setPopup({
      variant: "reset",
      title: "Réinitialiser l'accès ?",
      message:
        "Un nouveau mot de passe sera généré et envoyé par email au responsable.",
      confirmLabel: "Oui, réinitialiser",
      onConfirm: async () => {
        setProcessing(true);

        const resultat = await reinitialiserAcces(id);

        setProcessing(false);

        setPopup(
          resultat
            ? {
                variant: "success",
                title: "Accès réinitialisés",
                message: `Les nouveaux identifiants ont été envoyés à ${responsable.email}.`,
              }
            : POPUP_ERREUR
        );
      },
    });
  };

  // ----------------------------------------------------------
  // Chargement ou erreur : on n'affiche pas la page
  // ----------------------------------------------------------

  if (!responsable) {
    return (
      <div className="p-6 sm:p-10">
        <p className={error ? "text-sm text-red-500" : "text-sm text-gray-500"}>
          {error || (loading ? "Chargement du responsable..." : "")}
        </p>
      </div>
    );
  }

  // Statut affiché ("Actif" ou "Désactivé")
  const status =
    LIBELLES_STATUT[responsable.statut_compte] ||
    responsable.statut_compte;

  return (
    <>
      <ResponsableDetailHeader
        company={responsable.nom_entreprise}
        status={status}
      />

      <div className="flex w-full flex-1 gap-8 p-6 sm:p-8 lg:p-10">
        <ResponsableInfoCard
          firstName={responsable.prenom}
          lastName={responsable.nom}
          fullName={`${responsable.prenom} ${responsable.nom}`}
          phone={responsable.telephone}
          email={responsable.email}
          adresse={responsable.adresse}
          avatar={responsable.photo || "https://placehold.co/80x80"}
        />

        <AccountActionsCard
          status={status}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onResetAccess={handleResetAccess}
        />
      </div>

      {/* Popup de confirmation ou de résultat */}
      <ActionPopup
        popup={popup}
        loading={processing}
        onClose={closePopup}
      />
    </>
  );
}
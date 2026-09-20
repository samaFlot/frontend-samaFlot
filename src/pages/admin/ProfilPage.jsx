import { useEffect } from "react";

import ProfilPageHeader from "../../components/admin/Profil/ProfilPageHeader";
import PersonalInfoCard from "../../components/admin/Profil/PersonalInfoCard";
import SecurityCard from "../../components/admin/Profil/SecurityCard";
import LogoutButton from "../../components/admin/Profil/LogoutButton";

import { useProfil } from "../../hooks/useProfil";

export default function ProfilPage() {
  // Récupérer les données du profil
  const {
    profil,
    loading,
    error,
    chargerProfil,
    mettreAJourProfil,
    changerMotDePasse,
  } = useProfil();

  // ----------------------------------------------------------
  // Charger le profil lorsque la page est ouverte
  // ----------------------------------------------------------

  useEffect(() => {
    chargerProfil();
  }, []);

  return (
    <div>
      <ProfilPageHeader />

      <div className="flex flex-1 justify-center px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex max-w-5xl flex-col gap-10">
          {/* Chargement */}
          {loading && (
            <p className="text-sm text-gray-500">
              Chargement du profil...
            </p>
          )}

          {/* Erreur */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Contenu du profil */}
          {!loading && !error && profil && (
            <>
              {/* Informations personnelles (modifiables) */}
              <PersonalInfoCard
                profil={profil}
                onSave={mettreAJourProfil}
              />

              {/* Sécurité : changement de mot de passe */}
              <SecurityCard
                onChangePassword={changerMotDePasse}
              />
            </>
          )}

          {/* La déconnexion reste visible même si le profil ne charge pas
              (par exemple si la session a expiré) */}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
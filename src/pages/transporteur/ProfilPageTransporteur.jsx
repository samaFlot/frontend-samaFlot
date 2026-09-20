import { useEffect } from "react";

import ProfilHeader from "../../components/transporteur/Profil/ProfilHeader";
import PersonalInfoCard from "../../components/transporteur/Profil/PersonalInfoCard";
import SecurityCard from "../../components/transporteur/Profil/SecurityCard";
import LogoutButton from "../../components/transporteur/Profil/LogoutButton";

import { useProfil } from "../../hooks/useProfil";

export default function ProfilPageTransporteur() {
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
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <ProfilHeader />

      <main className="flex w-full flex-1 flex-col items-center gap-6 overflow-y-auto p-6 sm:p-8">

        {/* Chargement */}
        {loading && (
          <p className="text-sm text-slate-500">
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
          <div className="flex w-full max-w-3xl flex-col gap-6 pb-12">

            {/* Informations personnelles (modifiables) */}
            <PersonalInfoCard
              profil={profil}
              onSave={mettreAJourProfil}
            />

            {/* Sécurité : changement de mot de passe */}
            <SecurityCard
              onChangePassword={changerMotDePasse}
            />

            {/* Déconnexion */}
            <LogoutButton />
          </div>
        )}
      </main>
    </div>
  );
}
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfil } from "../../../hooks/useProfil";
import NotificationsButton from "../notifications/NotificationsButton";

export default function TransporteurTopbar() {
  // Profil de l'utilisateur connecté
        const {
          profil,
          chargerProfil,
        } = useProfil();
      
        // État local pour éviter d'afficher
        // une image cassée si aucune photo n'existe.
        const [photo, setPhoto] = useState("https://placehold.co/40x40");
      
        // ----------------------------------------------------------
        // Charger le profil de l'utilisateur connecté
        // ----------------------------------------------------------
      
        useEffect(() => {
          chargerProfil();
        }, []);
      
        // Mettre à jour la photo lorsque le profil est chargé.
        useEffect(() => {
          if (profil?.photo) {
            setPhoto(profil.photo);
          } else {
            setPhoto("https://placehold.co/40x40");
          }
        }, [profil]);
  return (
    <header className="flex min-h-20 w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-4 sm:px-8">
      <h1 className="text-2xl font-bold leading-8 tracking-tight text-sky-950">
        Tableau de bord
      </h1>

      <div className="flex items-center gap-4 sm:gap-6">
        <NotificationsButton />

        <div className="h-8 w-px bg-slate-200" />

        <img
          src={photo}
          alt="Profil"
          className="size-9 rounded-full"
        />
      </div>
    </header>
  );
}
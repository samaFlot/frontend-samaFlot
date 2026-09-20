import { Bell, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfil } from "../../../hooks/useProfil";

export default function DemandesPageHeader({onNewRequest}) {
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
    <header className="flex w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
      <h1 className="text-2xl font-bold leading-8 tracking-tight text-sky-950">
        Demandes de chargement
      </h1>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Nouvelle demande */}
      <button
        type="button"
        onClick={onNewRequest}
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
      >
        <Plus className="size-4" />
        Nouvelle demande
      </button>
        <button
          type="button"
          className="relative flex size-8 items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="size-5 text-slate-400" />

          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <img
          src={photo}
          alt="Profil"
          className="size-9 rounded-full"
        />
      </div>
    </header>
  );
}
import {
  ArrowLeft,
  Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfil } from "../../../hooks/useProfil";

export default function MissionPageHeader({id}) {
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
      <div className="flex min-w-0 items-center gap-4">
        <Link
          to={`/transporteur/demandes-chargement/${id}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight text-slate-500 hover:bg-slate-50"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-8 text-sky-950">
            Créer une mission
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <button
          type="button"
          className="relative flex size-8 items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="size-5 text-slate-400" />

          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">

          <img
            src={photo}
            alt="Moussa Diop"
            className="size-9 rounded-full border border-slate-200"
          />
        </div>
      </div>
    </header>
  );
}
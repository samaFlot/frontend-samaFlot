import {
  ArrowLeft,
  Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfil } from "../../../hooks/useProfil";
import NotificationsButton from "../notifications/NotificationsButton";

export default function MissionDetailHeader() {
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
    <header className="flex min-h-20 w-full items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-8">
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
         <Link
          to="/transporteur/missions"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight text-slate-500 hover:bg-slate-50"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <h1 className="truncate text-xl font-bold leading-8 text-sky-950 sm:text-2xl">
            Détail de la Mission
          </h1>
        </div>
      </div>

      <div className="hidden items-center gap-6 lg:flex">
        <div className="flex items-center gap-2">

        </div>
        <NotificationsButton />

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3">

          <img
            className="size-9 rounded-full border border-slate-200"
            src={photo}
            alt="Moussa Diop"
          />
        </div>
      </div>
    </header>
  );
}
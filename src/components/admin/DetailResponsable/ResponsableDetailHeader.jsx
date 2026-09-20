import { Bell } from "lucide-react";
import { useProfil } from "../../../hooks/useProfil";
import { useEffect, useState } from "react";

// Couleurs du badge selon le statut
const STYLES_STATUT = {
  Actif: {
    badge: "bg-green-600/10 text-green-600",
    point: "bg-green-600",
  },
  Désactivé: {
    badge: "bg-red-700/10 text-red-700",
    point: "bg-red-700",
  },
};

export default function ResponsableDetailHeader({
  company,
  status,
}) {

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


  const style = STYLES_STATUT[status];

  return (
    <header className="flex min-h-20 w-full items-center justify-between gap-6 border-b border-gray-100 bg-white px-6 py-4 sm:px-10">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">

        <div className="flex min-w-0 items-center gap-4">
          <h1 className="truncate text-xl font-bold leading-7 text-sky-950 sm:text-2xl">
            {company}
          </h1>

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tight ${style.badge}`}
          >
            <span className={`size-1.5 rounded-full ${style.point}`} />
            {status}
          </span>
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

        <img
          className="size-10 rounded-full"
          src={photo}
          alt="Profil"
        />
      </div>
    </header>
  );
}
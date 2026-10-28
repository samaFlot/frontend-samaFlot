import { Bell, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfil } from "../../../../hooks/useProfil";
import NotificationsButton from "../../notifications/NotificationsButton";

export default function EnTeteVehicule({ vehicule }) {
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
    <header className="w-full h-20 bg-white border-b border-slate-200">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <div className="w-10 h-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center">
            <Truck size={20} className="text-slate-400" />
          </div>

          <div className="ml-4 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
              {vehicule.immatriculation}
            </h1>

            <p className="text-sm font-medium text-slate-500">
              {vehicule.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">

          <NotificationsButton />
          
          <div className="h-8 w-px bg-slate-200" />
          
            <img
              src={photo}
              alt="Profil"
              className="size-9 rounded-full"
            />
          </div>
      </div>
    </header>
  );
}
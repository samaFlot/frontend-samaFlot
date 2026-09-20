import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

import { useProfil } from "../hooks/useProfil";

function Sidebar({ items }) {
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

  // ----------------------------------------------------------
  // Préparer le nom et la photo
  // ----------------------------------------------------------

  // Construire le nom complet
  const nomUtilisateur = [
    profil?.first_name,
    profil?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  // Si le prénom et le nom sont vides,
  // on utilise l'email comme solution de secours.
  const nomAffiche =
    nomUtilisateur ||
    profil?.email ||
    "Utilisateur";

  // Mettre à jour la photo lorsque le profil est chargé.
  useEffect(() => {
    if (profil?.photo) {
      setPhoto(profil.photo);
    } else {
      setPhoto("https://placehold.co/40x40");
    }
  }, [profil]);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col justify-between bg-sky-950">
      <div className="flex w-full items-center gap-3 p-8">
        <img
          className="h-14 w-auto"
          src={logo}
          alt="SamaFlot"
        />
      </div>

      <nav className="flex w-full flex-1 flex-col gap-2 px-4 pt-4">
        {items.map(({ icon: Icon, label, path, end }) => (
          <NavLink
            key={label}
            to={path}
            // Sans end, React Router considère que /admin
            // est toujours actif même sur /admin/responsables.
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? "bg-cyan-900 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                />

                <span className="text-base font-medium tracking-tight">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="w-full border-t border-white/10 p-6">
        <div className="flex items-center gap-3 rounded-2xl p-3">
          {/* Photo de l'utilisateur connecté */}
          <img
            className="size-10 shrink-0 rounded-full border-2 border-cyan-800"
            src={photo}
            alt={nomAffiche}
          />

          {/* Nom de l'utilisateur connecté */}
          <span className="truncate text-sm font-semibold tracking-tight text-white">
            {nomAffiche}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;


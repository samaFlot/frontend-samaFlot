/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

import { ChevronDown, ShieldCheck, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png"

const NAV_LINKS = [
  {
    label: "Accueil",
    path: "/",
  },
  {
    label: "Solutions",
    path: "/solutions",
  },
  {
    label: "À propos",
    path: "/a-propos",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  //Hook de React Router qui permet de connaître l’URL actuelle de l’utilisateur dans ton application
  const location = useLocation();
  const [open, setOpen] = useState(false);
 
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-12">
        {/* Logo */}
        <img
          className="h-12 w-auto sm:h-14"
          src={logo}
          alt="SamaFlott"
        />
 
        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map(({ label, path }) => {
            //Est-ce que l'URL actuelle est la même que l'URL de ce lien ?
            const isActive = location.pathname === path;

            return (
              <Link
                key={label}
                to={path}
                className={
                  isActive
                    ? "border-b-2 border-orange-500 pb-0.5 text-base font-medium tracking-tight text-sky-950"
                    : "text-base font-medium tracking-tight text-gray-600 transition-colors hover:text-sky-950"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
 
        {/* Se connecter dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-6 py-2.5 outline outline-2 outline-offset-[-2px] outline-sky-950 transition-colors hover:bg-sky-950 hover:text-white"
          >
            <span className="text-base font-bold">Se connecter</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
              strokeWidth={3}
            />
          </button>
 
          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-xl bg-white shadow-2xl outline outline-1 outline-offset-[-1px] outline-gray-100">
              <a
                href="#"
                className="flex items-center gap-4 border-b border-gray-50 px-6 py-4 hover:bg-gray-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <UserRound className="h-5 w-5 text-blue-600" />
                </span>
                <span>
                  <span className="block text-sm font-bold tracking-tight text-sky-950">
                    Espace Transporteur
                  </span>
                  <span className="block text-xs tracking-tight text-gray-500">
                    Gérer ma flotte
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-50">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-sky-950">
                    Espace Administrateur
                  </span>
                  <span className="block text-xs text-gray-500">
                    Supervision SamaFlot
                  </span>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

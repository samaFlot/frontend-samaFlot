/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logo.png"
 
export default function Footer() {
  return (
    <footer className="bg-sky-950 w-full border-t border-gray-100 px-6 pb-10 pt-20 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col items-start gap-8">
            <img
              className="h-12 w-auto sm:h-14"
              src={logo}
              alt="SamaFlott"
            />
            <p className="text-base leading-6 text-gray-300">
              La plateforme de référence pour la logistique intelligente en
              Afrique de l'Ouest. Simplifiez, optimisez, grandissez.
            </p>
            <div className="flex items-center gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-gray-50 text-sky-950 transition-colors hover:bg-gray-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
 
          {/* Solutions */}
          <div className="flex flex-col items-start gap-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Solutions
            </span>
            <div className="flex flex-col items-start gap-4">
              {[
                "Gestion de flotte",
                "Suivi GPS",
                "Analyse de données",
                "Assistant IA",
              ].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-base text-gray-300 hover:text-orange-500"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
 
          {/* Société */}
          <div className="flex flex-col items-start gap-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Société
            </span>
            <div className="flex flex-col items-start gap-4">
              {["À propos", "Témoignages", "Carrières", "Contact"].map(
                (label) => (
                  <a
                    key={label}
                    href="#"
                    className="text-base text-gray-300 hover:text-orange-500"
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </div>
 
          {/* Contact */}
          <div className="flex flex-col items-start gap-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Contact
            </span>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                <span className="text-base leading-6 text-gray-300">
                  Avenue Cheikh Anta Diop, Dakar, Sénégal
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                <span className="text-base text-gray-300">
                  +221 77 822 40 46
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                <span className="text-base tracking-tight text-gray-300">
                  mamesayelom04@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
 
        <div className="flex w-full flex-col items-center gap-4 border-t border-gray-100 pt-10 sm:flex-row sm:justify-between">
          <span className="text-sm text-gray-300">
            © 2026 SamaFlott. Tous droits réservés.
          </span>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm tracking-tight text-gray-300 hover:text-sky-950">
              Politique de confidentialité
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-sky-950">
              CGU / CGV
            </a>
            <a href="#" className="text-sm tracking-tight text-gray-300 hover:text-sky-950">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

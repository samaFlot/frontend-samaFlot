import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full flex-col gap-10">
      {/* Logo + contexte */}
      <div className="flex flex-col items-center">
        <img
          src="https://placehold.co/196x49"
          alt="SamaFlott"
          className="h-auto w-48"
        />

        <p className="pt-2 text-base font-medium leading-6 tracking-tight text-gray-500">
          Espace Transporteur
        </p>
      </div>

      {/* Formulaire */}
      <form className="flex flex-col gap-6">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold leading-5 text-gray-900"
          >
            Adresse Email
          </label>

          <div className="flex items-center rounded-[10px] border border-gray-200 bg-gray-50 focus-within:border-orange-500">
            <Mail className="ml-4 h-4 w-4 shrink-0 text-gray-400" />

            <input
              id="email"
              type="email"
              placeholder="responsable@entreprise.com"
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-base text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="password"
              className="text-sm font-semibold leading-5 tracking-tight text-gray-900"
            >
              Mot de passe
            </label>

            <button
              type="button"
              className="text-xs font-medium leading-4 tracking-tight text-orange-500"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <div className="flex items-center rounded-[10px] border border-gray-200 bg-gray-50 focus-within:border-orange-500">
            <LockKeyhole className="ml-4 h-4 w-4 shrink-0 text-gray-400" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-base text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              className="mr-4 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Se souvenir */}
        <label className="flex items-center gap-2 text-sm leading-5 text-gray-600">
          <input
            type="checkbox"
            className="size-4 rounded border-gray-300 text-orange-500 accent-orange-500"
          />
          Se souvenir de moi
        </label>

        {/* Connexion */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-orange-500 py-3.5 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600"
        >
          Se connecter
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Sécurité */}
      <div className="flex items-start justify-center gap-2 border-t border-gray-100 pt-8">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />

        <p className="text-center text-xs leading-4 text-gray-400">
          Connexion sécurisée — SamaFlott Support v2.4
        </p>
      </div>
    </div>
  );
}
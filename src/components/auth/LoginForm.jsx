import logo from "../../assets/logo.png"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentification } from "../../hooks/useAuthentification";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erreurEmail, setErreurEmail] = useState("");
  const [erreurPassword, setErreurPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const {
  authentifier,
  loading,
  error,
} = useAuthentification();

const handleConnexion = async (e) => {
  e.preventDefault();

  setErreurEmail('');
  setErreurPassword('');

  // Validation email
  if (!email.trim()) {
    setErreurEmail("Veuillez saisir votre adresse email.");
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    setErreurEmail("Veuillez saisir une adresse email valide.");
  }

  // Validation mot de passe
  if (!password) {
    setErreurPassword("Veuillez saisir votre mot de passe.");
  } else if (password.length < 8) {
    setErreurPassword(
      "Le mot de passe doit contenir au moins 8 caractères."
    );
  }

  // Empêche la connexion si un champ contient une erreur.
  if (
    !email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !password ||
    password.length < 8
  ) {
    return;
  }

  const response = await authentifier(
    email.trim(),
    password
  );

  if (!response) {
    return;
  }

  localStorage.setItem(
  "accessToken",
  response.access
);

localStorage.setItem(
  "refreshToken",
  response.refresh
);


  if (response.role === "RESPONSABLE") {
    navigate("/transporteur");
  } else if (response.role === "ADMIN") {
    navigate("/admin");
  }

};

  return (
  <div className="flex w-full flex-col gap-10">
    {/* Logo + contexte */}
    <div className="flex flex-col items-center">
      <img
        src={logo}
        alt="SamaFlott"
        className="h-auto w-48"
      />
    </div>


      {/* Erreur générale venant du backend */}
      {error && (
        <p className="text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}

    {/* Formulaire */}
    <form
      className="flex flex-col gap-6"
      onSubmit={handleConnexion}
    >
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold leading-5 text-gray-900"
        >
          Adresse Email
        </label>

        <div
          className={`flex items-center rounded-[10px] border bg-gray-50 focus-within:border-orange-500 ${
            erreurEmail
              ? "border-red-500"
              : "border-gray-200"
          }`}
        >
          <Mail className="ml-4 h-4 w-4 shrink-0 text-gray-400" />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErreurEmail("");
            }}
            placeholder="exemple@gmail.com"
            className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-base text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        {erreurEmail && (
          <p className="text-xs font-medium text-red-500">
            {erreurEmail}
          </p>
        )}
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

        <div
          className={`flex items-center rounded-[10px] border bg-gray-50 focus-within:border-orange-500 ${
            erreurPassword
              ? "border-red-500"
              : "border-gray-200"
          }`}
        >
          <LockKeyhole className="ml-4 h-4 w-4 shrink-0 text-gray-400" />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErreurPassword("");
            }}
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

        {erreurPassword && (
          <p className="text-xs font-medium text-red-500">
            {erreurPassword}
          </p>
        )}
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
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-orange-500 py-3.5 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Connexion..." : "Se connecter"}

        {!loading && (
          <ArrowRight className="h-4 w-4" />
        )}
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
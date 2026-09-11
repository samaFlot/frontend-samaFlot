import { Eye, Lock, Save } from "lucide-react";

export default function SecurityCard() {
  return (
    <section className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-50 p-6 sm:p-8">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-950/10">
          <Lock className="h-5 w-5 text-sky-950" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold leading-7 tracking-tight text-sky-950">
            Sécurité
          </h2>

          <p className="text-sm leading-5 text-gray-400">
            Sécurisez votre compte en mettant à jour votre mot de passe.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          {/* Mot de passe actuel */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-semibold leading-5 text-gray-600"
            >
              Mot de passe actuel
            </label>

            <div className="relative">
              <input
                id="currentPassword"
                type="password"
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 pr-12 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />

              <button
                type="button"
                aria-label="Afficher le mot de passe"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Nouveau + confirmation */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold leading-5 text-gray-600"
              >
                Nouveau mot de passe
              </label>

              <input
                id="newPassword"
                type="password"
                placeholder="Min. 8 caractères"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold leading-5 text-gray-600"
              >
                Confirmation du nouveau mot de passe
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-950 px-8 py-3 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-sky-900 sm:w-auto"
          >
            <Save className="h-4 w-4" />
            Modifier le mot de passe
          </button>
        </div>
      </div>
    </section>
  );
}
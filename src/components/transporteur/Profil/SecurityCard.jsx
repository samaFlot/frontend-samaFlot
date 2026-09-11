import { Eye } from "lucide-react";

export default function SecurityCard() {
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="text-lg font-bold leading-7 text-sky-950">
        Sécurité
      </h2>

      <div className="flex flex-col gap-6">
        <PasswordField
          label="Mot de passe actuel"
          value="••••••••••••"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PasswordField
            label="Nouveau mot de passe"
            value="••••••••••••"
          />

          <PasswordField
            label="Confirmer le nouveau mot de passe"
            value="••••••••••••"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold leading-5 tracking-tight text-white"
        >
          Modifier le mot de passe
        </button>
      </div>
    </section>
  );
}

function PasswordField({ label, value }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
        {label}
      </label>

      <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-3">
        <input
          type="password"
          defaultValue={value}
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-gray-900 outline-none"
        />

        <button
          type="button"
          className="ml-2 shrink-0 text-gray-400"
          aria-label="Afficher le mot de passe"
        >
          <Eye className="size-4" />
        </button>
      </div>
    </div>
  );
}
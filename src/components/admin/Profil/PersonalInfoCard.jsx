import { Mail, Save, UserRound } from "lucide-react";

function Field({ label, value, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold leading-5 text-gray-600">
        {label}
      </label>

      <input
        type={type}
        defaultValue={value}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-base font-medium text-sky-950 outline-none transition-colors focus:border-orange-500 focus:bg-white"
      />
    </div>
  );
}

export default function PersonalInfoCard() {
  return (
    <section className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-50 p-6 sm:p-8">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
          <UserRound className="h-5 w-5 text-orange-500" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            Informations personnelles
          </h2>

          <p className="text-sm leading-5 text-gray-400">
            Gérez les détails de votre identité et vos coordonnées.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6">
          <Field label="Nom" value="Diop" />
          <Field label="Prénom" value="Moussa" />
          <Field label="Téléphone" value="+221 77 123 45 67" type="tel" />
          <Field
            label="Email"
            value="moussa.diop@samaflot.sn"
            type="email"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600 sm:w-auto"
          >
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </section>
  );
}
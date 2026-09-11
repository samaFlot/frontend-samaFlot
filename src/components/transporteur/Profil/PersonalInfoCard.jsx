import { Camera, Eye, EyeOff } from "lucide-react";

export default function PersonalInfoCard() {
  return (
    <section className="flex w-full flex-col gap-8 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold leading-7 text-sky-950">
          Informations personnelles
        </h2>

        <button
          type="button"
          className="group relative flex size-24 overflow-hidden rounded-full border-4 border-gray-50"
        >
          <img
            className="size-full object-cover"
            src="https://placehold.co/88x88"
            alt="Photo de profil"
          />

          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white">
              Changer
            </span>
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <ProfileField label="Nom" value="Diop" />

        <ProfileField label="Prénom" value="Mamadou" />

        <ProfileField
          label="Téléphone"
          value="+221 77 123 45 67"
        />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
            Email
          </label>

          <div className="rounded-lg border border-red-500 bg-red-50/30 px-4 py-3">
            <input
              type="email"
              defaultValue="m.diop@samaflot.sn"
              className="w-full bg-transparent text-sm leading-5 text-gray-900 outline-none"
            />
          </div>

          <div className="flex items-start gap-1">
            <span className="mt-1 size-3 shrink-0 rounded-full bg-red-500" />

            <p className="text-xs leading-4 text-red-500">
              Cette adresse email est déjà utilisée par un autre
              compte.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold leading-5 text-white"
        >
          Enregistrer
        </button>
      </div>
    </section>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
        {label}
      </label>

      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
        <input
          type="text"
          defaultValue={value}
          className="w-full bg-transparent text-sm leading-5 text-gray-900 outline-none"
        />
      </div>
    </div>
  );
}
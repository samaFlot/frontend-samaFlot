import { Camera, Eye, X, Phone } from "lucide-react";

export default function CreateAgentDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/60"
        aria-label="Fermer"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            Ajouter un agent
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Fermer"
          >
            <X className="size-5 text-slate-400" />
          </button>
        </div>

        {/* Corps */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-8">

            {/* Identité */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Identité
                </h3>
              </div>

              {/* Photo */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex size-24 flex-col items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-2 ring-slate-300">
                    <Camera className="mb-2 size-6 text-slate-300" />
                    <span className="text-[10px] font-medium text-slate-400">
                      Photo
                    </span>
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-sky-950 ring-2 ring-white"
                    aria-label="Ajouter une photo"
                  >
                    <Camera className="size-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Nom / Prénom */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Nom
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Fall"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Prénom
                  </label>

                  <input
                    type="text"
                    placeholder="Ex: Modou"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>
              </div>
            </section>

            {/* Coordonnées */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Coordonnées
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {/* Téléphone */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Téléphone
                  </label>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="77 000 00 00"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-16 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                    />

                    <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                      <Phone className="size-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-400">
                        +221
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Email professionnel
                  </label>

                  <input
                    type="email"
                    placeholder="m.fall@samaflot.sn"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>
              </div>
            </section>

            {/* Accès */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Accès
                </h3>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Mot de passe initial
                </label>

                <div className="relative">
                  <input
                    type="password"
                    value="password"
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-12 text-sm outline-none"
                  />

                  <Eye className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="mt-3 flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-cyan-800" />

                  <p className="text-xs leading-4 text-slate-500">
                    L'agent pourra le modifier depuis son application mobile
                    lors de sa première connexion.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600"
            >
              Annuler
            </button>

            <button
              type="button"
              className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white"
            >
              Enregistrer l'agent
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
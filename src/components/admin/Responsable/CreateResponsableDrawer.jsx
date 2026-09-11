import { X, Info, Send } from "lucide-react";

export default function CreateResponsableDrawer({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/40 backdrop-blur-[1px]"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold leading-7 text-sky-950 sm:text-xl">
            Créer un compte Responsable
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-50"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Formulaire */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-8">

            {/* Entreprise */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-orange-500" />

                <span className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  Entreprise
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="company"
                  className="text-sm font-semibold leading-5 text-sky-950"
                >
                  Nom de l'entreprise
                </label>

                <input
                  id="company"
                  type="text"
                  placeholder="Ex: Sahel Shipping"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500"
                />
              </div>
            </section>

            {/* Informations Responsable */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-orange-500" />

                <span className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  Informations du Responsable
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-semibold leading-5 text-sky-950"
                    >
                      Prénom
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      placeholder="Prénom"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-semibold leading-5 text-sky-950"
                    >
                      Nom
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      placeholder="Nom"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold leading-5 text-sky-950"
                  >
                    Numéro de téléphone
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <div className="flex shrink-0 items-center border-r border-gray-200 px-4 text-sm font-medium text-gray-400">
                      +221
                    </div>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="77 000 00 00"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold leading-5 text-sky-950"
                  >
                    Adresse Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="responsable@entreprise.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500"
                  />
                </div>
              </div>
            </section>

            {/* Information */}
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

              <p className="text-xs leading-5 text-blue-800">
                Les accès de connexion seront envoyés par email au
                Responsable une fois le compte créé. Il pourra ensuite
                configurer ses propres paramètres de sécurité.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/30 p-6 sm:p-8">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
          >
            Créer et envoyer les accès
            <Send className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-sm font-bold text-gray-500 transition-colors hover:text-gray-700"
          >
            Annuler
          </button>
        </div>
      </aside>
    </div>
  );
}
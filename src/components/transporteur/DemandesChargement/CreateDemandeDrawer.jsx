import {
  X,
  User,
  Truck,
  CalendarDays,
  Clock3,
  MapPin,
  ArrowDown,
  FileText,
} from "lucide-react";

export default function CreateDemandeDrawer({
  isOpen,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/40"
        aria-label="Fermer"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-6 sm:px-8">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            Créer une demande de chargement
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Fermer"
          >
            <X className="size-5 text-gray-400" />
          </button>
        </div>

        {/* Corps */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6">

            {/* Demandeur */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<User className="size-4 text-orange-500/80" />}
                label="Demandeur"
              />

              <input
                type="text"
                placeholder="Nom complet de l'agent"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>

            {/* Nombre de véhicules */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<Truck className="size-4 text-orange-500/80" />}
                label="Nombre de véhicules"
              />

              <input
                type="number"
                min="1"
                placeholder="Ex: 2"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>

            {/* Date + Heure */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={
                    <CalendarDays className="size-4 text-orange-500/80" />
                  }
                  label="Date de chargement"
                />

                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-sky-950"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={
                    <Clock3 className="size-4 text-orange-500/80" />
                  }
                  label="Heure"
                />

                <input
                  type="time"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-sky-950"
                />
              </div>
            </div>

            {/* Trajet */}
            <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8">

              {/* Départ */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={<MapPin className="size-4 text-green-600" />}
                  label="Point de départ"
                />

                <input
                  type="text"
                  placeholder="Lieu d'enlèvement"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
                />
              </div>

              {/* Séparateur */}
              <div className="flex items-center">
                <div className="h-px flex-1 bg-gray-200" />

                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <ArrowDown className="size-4 text-gray-400" />
                </div>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={<MapPin className="size-4 text-orange-500" />}
                  label="Destination"
                />

                <input
                  type="text"
                  placeholder="Lieu de livraison"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<FileText className="size-4 text-orange-500/80" />}
                label="Description & Instructions"
              />

              <textarea
                rows={5}
                placeholder="Détails du chargement, contraintes particulières..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-4 border-t border-gray-100 bg-gray-50 px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold tracking-tight text-gray-500"
          >
            Annuler
          </button>

          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
          >
            <FileText className="size-4" />
            Créer la demande
          </button>
        </div>
      </aside>
    </div>
  );
}

function FieldLabel({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      {icon}

      <label className="text-sm font-semibold leading-5 tracking-tight text-gray-700">
        {label}
      </label>
    </div>
  );
}
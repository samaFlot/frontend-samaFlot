import {
  CalendarDays,
  Clock3,
  MapPin,
  Truck,
  User,
} from "lucide-react";

export default function DemandeInfoCard() {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 bg-slate-50/30 px-6 py-4">
        <Truck className="size-4 text-cyan-800" />

        <h2 className="text-base font-bold leading-6 text-sky-950">
          Informations de la demande
        </h2>
      </div>

      {/* Contenu */}
      <div className="w-full p-6 sm:p-8">

        {/* Première ligne : 3 colonnes */}
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3">
          <InfoRow
            label="Demandeur"
            icon={<User className="size-4 text-slate-400" />}
            value="Grands Moulins de Dakar"
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Nombre de véhicules
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">
                2 véhicules
              </span>

              <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-slate-600">
                Type: 35T
              </span>
            </div>
          </div>

          <InfoRow
            label="Date de chargement"
            icon={<CalendarDays className="size-4 text-slate-400" />}
            value="24 Oct 2023"
          />
        </div>

        {/* Deuxième ligne : 3 colonnes */}
        <div className="mt-5 grid w-full grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3">
          <InfoRow
            label="Heure de chargement"
            icon={<Clock3 className="size-4 text-slate-400" />}
            value="08:00"
          />

          <InfoRow
            label="Point de départ"
            icon={<MapPin className="size-4 text-red-500" />}
            value="Dakar, Port"
          />

          <InfoRow
            label="Destination"
            icon={<MapPin className="size-4 text-emerald-500" />}
            value="Thiès, Centre"
          />
        </div>

        {/* Description */}
        <div className="mt-5 border-t border-slate-50 pt-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Description & Instructions
          </div>

          <p className="max-w-4xl text-sm leading-6 text-slate-600">
            Transport de 50 tonnes de farine réparties sur deux camions.
            Chargement au quai N°4 des Grands Moulins de Dakar. La livraison
            doit être effectuée au dépôt central de Thiès avant 17h00. Les
            chauffeurs doivent être munis de leurs EPI complets. Escorte non
            requise mais suivi GPS activé obligatoire.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, icon, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {icon}

        <span className="text-sm font-semibold text-slate-800">
          {value}
        </span>
      </div>
    </div>
  );
}
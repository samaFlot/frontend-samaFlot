import {
  Truck,
} from "lucide-react";

const STATUS_STYLES = {
  PREVU: "border-blue-100 bg-blue-50 text-cyan-800",
  EN_COURS: "border-orange-100 bg-orange-50 text-orange-600",
  TERMINEE: "border-green-100 bg-green-50 text-green-600",
  ANNULEE: "border-red-100 bg-red-50 text-red-600",
};

const STATUS_LABELS = {
  PREVU: "Prévu",
  EN_COURS: "En cours",
  TERMINEE: "Terminée",
  ANNULEE: "Annulée",
};

export default function MissionCreatedCard({ mission }) {
  if (!mission) {
    return null;
  }

  const {
    id,
    statut,
    vehicule_immatriculation,
    agent_nom,
    agent_prenom,
  } = mission;

  const statusStyle =
    STATUS_STYLES[statut] ||
    "border-slate-100 bg-slate-50 text-slate-600";

  const statusLabel =
    STATUS_LABELS[statut] || statut;

  return (
    <article className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        
        {/* Icône */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Truck className="size-5 text-cyan-800" />
        </div>

        {/* Mission */}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
            Mission #{id}
          </p>

          <p className="text-sm font-bold text-sky-950">
            Véhicule {vehicule_immatriculation}
          </p>
        </div>

        <div className="hidden h-10 w-px bg-slate-100 sm:block" />

        {/* Agent */}
        <div className="flex items-center gap-3">
          <img
            src="https://placehold.co/32x32"
            alt={`${agent_prenom} ${agent_nom}`}
            className="size-8 rounded-full"
          />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
              Agent
            </p>

            <p className="text-sm font-semibold text-slate-700">
              {agent_prenom} {agent_nom}
            </p>
          </div>
        </div>
      </div>

      {/* Statut */}
      <span
        className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${statusStyle}`}
      >
        {statusLabel}
      </span>
    </article>
  );
}
import { Plus, X } from "lucide-react";
import MissionCreatedCard from "./MissionCreatedCard";
import PendingMissionCard from "./PendingMissionCard";
import { Link } from "react-router-dom";

export default function MissionsCreatedSection({ demandeId }) {
  return (
    <section className="flex w-full flex-col gap-4">
      {/* Titre + actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-bold leading-7 text-sky-950">
            Missions créées
          </h2>

          <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-bold text-slate-700">
            1 sur 2 demandées
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-red-700 px-5 py-2.5 text-sm font-semibold text-red-700"
          >
            <X className="mr-2 size-4" />
            Annuler la demande
          </button>

          <Link
            to={`/transporteur/demandes-chargement/${demandeId}/mission`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Créer une mission
          </Link>
        </div>
      </div>

      {/* Missions */}
      <div className="flex w-full flex-col gap-3">
        <MissionCreatedCard />

        <PendingMissionCard />
      </div>
    </section>
  );
}
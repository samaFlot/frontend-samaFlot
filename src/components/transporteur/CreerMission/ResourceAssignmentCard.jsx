import {
  ClipboardList,
  Truck,
  User,
} from "lucide-react";

import ResourceSelect from "./ResourceSelect";
import AdditionalInformation from "./AdditionalInformation";

export default function ResourceAssignmentCard({
  vehiculeSelectionne,
  setVehiculeSelectionne,
  agentSelectionne,
  setAgentSelectionne,
  ressourcesDisponibles,
  loading,
}) {
  // ============================================================
  // RÉCUPÉRER LES RESSOURCES DISPONIBLES
  // ============================================================

  const vehiculesDisponibles =
    ressourcesDisponibles?.vehicules || [];

  const agentsDisponibles =
    ressourcesDisponibles?.agents || [];

  // ============================================================
  // SAVOIR S'IL N'Y A AUCUNE RESSOURCE
  // ============================================================

  const aucunVehiculeDisponible =
    !loading &&
    ressourcesDisponibles &&
    vehiculesDisponibles.length === 0;

  const aucunAgentDisponible =
    !loading &&
    ressourcesDisponibles &&
    agentsDisponibles.length === 0;

  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">

      {/* ======================================================
          EN-TÊTE
          ====================================================== */}

      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100">
          <ClipboardList className="size-4 text-cyan-800" />
        </div>

        <h2 className="text-lg font-bold leading-7 text-sky-950">
          Affectation des ressources
        </h2>
      </div>

      {/* ======================================================
          SÉLECTION DES RESSOURCES
          ====================================================== */}

      <div className="grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-2">

        {/* ----------------------------------------------------
            VÉHICULE
            ---------------------------------------------------- */}

        <div>
          <ResourceSelect
            icon={
              <Truck className="size-4 text-slate-400" />
            }
            label="Sélectionner un véhicule"
            value={vehiculeSelectionne}
            onChange={setVehiculeSelectionne}
            type="vehicle"
            disabled={false}
            options={vehiculesDisponibles}
          />

          {aucunVehiculeDisponible && (
            <p className="mt-3 text-sm font-medium text-red-500">
              Pas de véhicule disponible pour cette mission.
            </p>
          )}
        </div>

        {/* ----------------------------------------------------
            AGENT
            ---------------------------------------------------- */}

        <div>
          <ResourceSelect
            icon={
              <User className="size-4 text-slate-400" />
            }
            label="Sélectionner un agent"
            value={agentSelectionne}
            onChange={setAgentSelectionne}
            type="agent"
            disabled={false}
            options={agentsDisponibles}
          />

          {aucunAgentDisponible && (
            <p className="mt-3 text-sm font-medium text-red-500">
              Pas d'agent disponible pour cette mission.
            </p>
          )}
        </div>
      </div>

      {/* ======================================================
          RECHERCHE EN COURS
          ====================================================== */}

      {loading && (
        <p className="pt-4 text-sm text-slate-500">
          Recherche des ressources disponibles...
        </p>
      )}

      {/* ======================================================
          INFORMATION SUPPLÉMENTAIRE
          ====================================================== */}

      <div className="mt-10">
        <AdditionalInformation />
      </div>

    </section>
  );
}

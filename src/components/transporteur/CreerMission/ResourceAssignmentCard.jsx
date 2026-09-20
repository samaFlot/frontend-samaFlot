import {
  ClipboardList,
  Truck,
  User,
  CalendarDays,
  Clock3,
} from "lucide-react";

import ResourceSelect from "./ResourceSelect";
import AdditionalInformation from "./AdditionalInformation";

export default function ResourceAssignmentCard({
  dateFinPrevue,
  heureFinPrevue,
  setDateFinPrevue,
  setHeureFinPrevue,
  vehiculeSelectionne,
  setVehiculeSelectionne,
  agentSelectionne,
  setAgentSelectionne,
  ressourcesDisponibles,
  loading,
  validationDate,
}) {
  // ============================================================
  // 1. VÉRIFIER SI LA DATE ET L'HEURE SONT COMPLÈTES
  // ============================================================

  // On considère que la date de fin est complète uniquement
  // lorsque la date ET l'heure ont été saisies.
  //
  // false :
  // date = ""
  // heure = ""
  //
  // true :
  // date = "2026-09-21"
  // heure = "18:00"
  const dateComplete = Boolean(
    dateFinPrevue && heureFinPrevue
  );


  // ============================================================
  // 2. RÉCUPÉRER LES RESSOURCES DISPONIBLES
  // ============================================================

  // Avant la saisie de la date de fin, on ne veut afficher
  // aucune ressource.
  //
  // Donc :
  //
  // dateComplete = false
  //      ↓
  // []
  //
  // Après la recherche :
  //
  // dateComplete = true
  //      ↓
  // ressourcesDisponibles.vehicules
  const vehiculesDisponibles = dateComplete
    ? ressourcesDisponibles?.vehicules || []
    : [];


  // Même logique pour les agents.
  const agentsDisponibles = dateComplete
    ? ressourcesDisponibles?.agents || []
    : [];


  // ============================================================
  // 3. SAVOIR SI LA RECHERCHE EST TERMINÉE
  // ============================================================

  // loading = true  → Django est encore en train de répondre.
  // loading = false → la recherche est terminée.
  //
  // On utilise cette information pour ne pas afficher trop tôt :
  // "Pas de véhicule disponible".
  const rechercheTerminee =
    dateComplete && !loading && !validationDate;


  // ============================================================
  // 4. SAVOIR S'IL N'Y A AUCUN VÉHICULE
  // ============================================================

  // Ce message apparaît uniquement lorsque :
  //
  // - la date est complète
  // - la date est valide
  // - la recherche est terminée
  // - l'API nous a retourné une liste vide
  const aucunVehiculeDisponible =
    rechercheTerminee &&
    vehiculesDisponibles.length === 0;


  // ============================================================
  // 5. SAVOIR S'IL N'Y A AUCUN AGENT
  // ============================================================

  const aucunAgentDisponible =
    rechercheTerminee &&
    agentsDisponibles.length === 0;


  // ============================================================
  // 6. DÉSACTIVER LE SELECT VÉHICULE
  // ============================================================

  // Le select véhicule est désactivé dans 3 situations :
  //
  // 1. la date n'est pas complète
  // 2. la recherche est encore en cours
  // 3. aucun véhicule n'est disponible
  const vehiculeDesactive =
    !dateComplete ||
    Boolean(validationDate) ||
    loading ||
    aucunVehiculeDisponible;


  // ============================================================
  // 7. DÉSACTIVER LE SELECT AGENT
  // ============================================================

  const agentDesactive =
    !dateComplete ||
    Boolean(validationDate) ||
    loading ||
    aucunAgentDisponible;


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
          DATE ET HEURE DE FIN PRÉVUE
          ====================================================== */}

      <div className="grid w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-2">

        {/* Date de fin */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarDays className="size-4 text-orange-500" />

            Date de fin prévue
          </label>

          <input
            type="date"
            value={dateFinPrevue}
            onChange={(e) => setDateFinPrevue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-950"
          />
        </div>


        {/* Heure de fin */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Clock3 className="size-4 text-orange-500" />

            Heure de fin prévue
          </label>

          <input
            type="time"
            value={heureFinPrevue}
            onChange={(e) => setHeureFinPrevue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-950"
          />
        </div>
      </div>


      {/* ======================================================
          ERREUR DE DATE
          ====================================================== */}

      {validationDate && (
        <p className="pt-4 text-sm font-medium text-red-500">
          {validationDate}
        </p>
      )}


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

            // Le select est bloqué si la recherche n'est
            // pas encore possible ou si aucun véhicule
            // n'est disponible.
            disabled={vehiculeDesactive}

            options={vehiculesDisponibles}
          />

          {/* Message si aucun véhicule n'est disponible */}
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

            // Même logique que pour le véhicule.
            disabled={agentDesactive}

            options={agentsDisponibles}
          />

          {/* Message si aucun agent n'est disponible */}
          {aucunAgentDisponible && (
            <p className="mt-3 text-sm font-medium text-red-500">
              Pas d'agent disponible pour cette mission.
            </p>
          )}
        </div>
      </div>


      {/* ======================================================
          MESSAGE AVANT LA RECHERCHE
          ====================================================== */}

      {!dateComplete && (
        <p className="pt-4 text-sm text-slate-400">
          Saisissez la date et l'heure de fin prévue pour
          rechercher les ressources disponibles.
        </p>
      )}


      {/* ======================================================
          RECHERCHE EN COURS
          ====================================================== */}

      {dateComplete && loading && (
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
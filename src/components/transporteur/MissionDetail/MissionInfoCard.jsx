import {
  Building2,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Truck,
} from "lucide-react";

import { Link } from "react-router-dom";

import MissionResourceCard from "./MissionResourceCard";

export default function MissionInfoCard({ mission }) {
  // Si la mission n'est pas encore chargée,
  // on n'affiche pas la carte.
  if (!mission) {
    return null;
  }

  // Récupérer les objets imbriqués de la réponse API
  const demande = mission.demande_chargement;
  const vehicule = mission.vehicule;
  const agent = mission.agent;

  // ----------------------------------------------------------
  // Informations de la demande
  // ----------------------------------------------------------

  const demandeur = demande?.demandeur || "";

  const pointDepart =
    demande?.point_depart || "";

  const destination =
    demande?.destination || "";

  // ----------------------------------------------------------
  // Date de chargement
  // ----------------------------------------------------------

  let dateChargement = "";

  if (demande?.date_chargement) {
    const date = new Date(
      `${demande.date_chargement}T00:00:00`
    );

    if (!Number.isNaN(date.getTime())) {
      dateChargement = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  }

  // ----------------------------------------------------------
  // Heure de chargement
  // ----------------------------------------------------------

  const heureChargement =
    demande?.heure_chargement
      ? demande.heure_chargement.slice(0, 5)
      : "—";

  // ----------------------------------------------------------
  // Véhicule
  // ----------------------------------------------------------

  const immatriculation =
    vehicule?.immatriculation || "";

  // ----------------------------------------------------------
  // Agent
  // ----------------------------------------------------------

  const nomAgent = [
    agent?.prenom,
    agent?.nom,
  ]
    .filter(Boolean)
    .join(" ");

  const agentNom = nomAgent || "";

  const agentPhoto =
    agent?.photo || "https://placehold.co/48x48";

  // ----------------------------------------------------------
  // ID de la demande liée
  // ----------------------------------------------------------

  const demandeChargementId =
    demande?.id;

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
            <Truck className="size-5 text-cyan-800" />
          </div>

          <h2 className="text-lg font-bold leading-7 tracking-tight text-sky-950">
            Informations de la mission
          </h2>
        </div>

        {/* Lien vers la demande de chargement liée */}
        {demandeChargementId ? (
          <Link
            to={`/transporteur/demandes-chargement/${demandeChargementId}`}
            className="flex items-center gap-2 text-sm font-bold leading-5 text-cyan-800"
          >
            <span>
              Voir la demande liée
            </span>

            <ExternalLink className="size-3" />
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-sm font-bold leading-5 text-slate-400">
            <span>
              Voir la demande de chargement liée
            </span>

            <ExternalLink className="size-3" />
          </span>
        )}
      </div>

      {/* Informations générales */}
      <div className="flex flex-col gap-10 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Demandeur */}
          <MissionField
            label="Demandeur"
            icon={
              <Building2 className="size-3.5 text-cyan-800/60" />
            }
            value={demandeur}
          />

          {/* Point de départ */}
          <MissionField
            label="Point de départ"
            icon={
              <MapPin className="size-3.5 text-red-500/70" />
            }
            value={pointDepart}
          />

          {/* Destination */}
          <MissionField
            label="Destination"
            icon={
              <MapPin className="size-3.5 text-emerald-500" />
            }
            value={destination}
          />

          {/* Date de chargement */}
          <MissionField
            label="Date de chargement"
            icon={
              <CalendarDays className="size-3.5 text-cyan-800/60" />
            }
            value={dateChargement}
          />

          {/* Heure de chargement */}
          <MissionField
            label="Heure de chargement"
            icon={
              <Clock3 className="size-3.5 text-cyan-800/60" />
            }
            value={heureChargement}
          />
        </div>

        <div className="h-px w-full bg-slate-100" />

        {/* Ressources */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Véhicule affecté */}
          <MissionResourceCard
            type="vehicle"
            label="Véhicule affecté"
            name={immatriculation}
          />

          {/* Agent affecté */}
          <MissionResourceCard
            type="agent"
            label="Agent affecté"
            name={agentNom}
            image={agentPhoto}
          />
        </div>
      </div>
    </section>
  );
}

function MissionField({ label, icon, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase leading-4 tracking-wide text-slate-400">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {icon}

        <span className="text-base font-semibold leading-6 tracking-tight text-sky-950">
          {value}
        </span>
      </div>
    </div>
  );
}


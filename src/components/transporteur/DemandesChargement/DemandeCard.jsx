import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_STYLES = {
  PREVU: "bg-indigo-50 text-sky-700",
  TRAITE: "bg-green-100 text-green-600",
  ANNULEE: "bg-gray-200 text-gray-600",
};

const STATUS_LABELS = {
  PREVU: "Prévu",
  TRAITE: "Traité",
  ANNULEE: "Annulée",
};

export default function DemandeCard({ demande }) {
  const {
    id,
    demandeur,
    nombre_vehicules_demandes,
    date_chargement,
    heure_chargement,
    point_depart,
    destination,
    description,
    statut,
  } = demande;

  // Formater la date pour l'affichage
  const dateFormatee = new Date(date_chargement).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  // Afficher uniquement heures et minutes
  const heureFormatee = heure_chargement
    ? heure_chargement.slice(0, 5)
    : "-";

  return (
    <article className="flex w-full flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">

      {/* Client + statut */}
      <div className="flex items-start justify-between gap-4 pb-4">
        <h2 className="min-w-0 truncate pr-2 text-base font-bold tracking-tight text-gray-900">
          {demandeur}
        </h2>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase leading-4 tracking-wide ${
            STATUS_STYLES[statut]
          }`}
        >
          {STATUS_LABELS[statut]}
        </span>
      </div>

      {/* Trajet */}
      <div className="flex items-center pb-4 text-sm font-semibold leading-5 tracking-tight text-sky-950">
        <span>{point_depart}</span>

        <ArrowRight className="mx-3 size-3.5 shrink-0 text-gray-400" />

        <span>{destination}</span>
      </div>

      {/* Date + heure */}
      <div className="flex flex-wrap items-center pb-5 text-sm leading-5 text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5" />
          <span>{dateFormatee}</span>
        </div>

        <div className="ml-4 border-l border-gray-200 pl-4">
          <div className="flex items-center gap-2">
            <Clock3 className="size-3.5" />
            <span>{heureFormatee}</span>
          </div>
        </div>
      </div>

      {/* Véhicules */}
      <div className="pb-4">
        <span className="inline-flex rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-bold leading-4 tracking-tight text-slate-500">
          {nombre_vehicules_demandes}{" "}
          {nombre_vehicules_demandes > 1
            ? "VÉHICULES DEMANDÉS"
            : "VÉHICULE DEMANDÉ"}
        </span>
      </div>

      {/* Description */}
      <p className="line-clamp-2 pb-6 text-sm leading-5 text-gray-600">
        {description || "Aucune description"}
      </p>

      {/* Voir détail */}
      <Link
        to={`/transporteur/demandes-chargement/${id}`}
        className="w-full rounded-lg border border-sky-950 py-2 text-center text-sm font-semibold tracking-tight text-sky-950 hover:bg-sky-50"
      >
        Voir détail
      </Link>
    </article>
  );
}
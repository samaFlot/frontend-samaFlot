import { ArrowRight } from "lucide-react";

export default function MissionRequestSummary({ demande }) {
  if (!demande) {
    return null;
  }

  const {
    demandeur,
    point_depart,
    destination,
    date_chargement,
    heure_chargement,
  } = demande;

  const dateFormatee = new Date(
    `${date_chargement}T00:00:00`
  ).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const heureFormatee = heure_chargement
    ? heure_chargement.slice(0, 5)
    : "-";

  return (
    <section className="w-full rounded-xl bg-cyan-800/5 p-6">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">

        {/* Demandeur */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Demandeur
          </span>

          <span className="text-sm font-bold leading-5 text-sky-950">
            {demandeur}
          </span>
        </div>

        {/* Trajet */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Trajet
          </span>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold leading-5 tracking-tight text-sky-950">
              {point_depart}
            </span>

            <ArrowRight className="size-3.5 text-slate-400" />

            <span className="text-sm font-bold leading-5 tracking-tight text-sky-950">
              {destination}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Date prévue
          </span>

          <span className="text-sm font-bold leading-5 text-sky-950">
            {dateFormatee}, {heureFormatee}
          </span>
        </div>
      </div>
    </section>
  );
}
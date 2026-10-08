import { CheckCircle, ShieldCheck } from "lucide-react";

export default function EtatVehicule({ vehicule }) {
  return (
    <section className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

        <div className="flex items-center gap-2">

          <ShieldCheck
            size={18}
            className="text-orange-500"
          />

          <h2 className="text-base font-bold text-slate-800">
            État du véhicule
          </h2>

        </div>

      </div>

      <div className="p-5 sm:p-6 space-y-6">

        <Etat
          type="operationnel"
          titre="Statut opérationnel"
          description="Le véhicule peut être affecté à une mission"
          valeur={vehicule.statut}
        />

        <Etat
          type="technique"
          titre="État technique"
          description="État actuel du véhicule"
          valeur={vehicule.etat_technique}
        />

      </div>

    </section>
  );
}

function Etat({
  type,
  titre,
  description,
  valeur,
}) {
  const operationnel = type === "operationnel";

  // Couleurs selon l'état technique
  let classeEtat = "bg-slate-100 text-slate-600";

  if (operationnel) {
    classeEtat = "bg-green-500 text-white";
  } else if (valeur === "Bon état") {
    classeEtat =
      "bg-green-100 text-green-700 border border-green-200";
  } else if (valeur === "À vérifier") {
    classeEtat =
      "bg-orange-100 text-orange-600 border border-orange-200";
  } else if (valeur === "En panne") {
    classeEtat =
      "bg-red-100 text-red-600 border border-red-200";
  }

  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-4">

      <div className="flex items-center min-w-0">

        <div
          className={`
            w-10 h-10 shrink-0 rounded-full flex items-center justify-center
            ${
              operationnel
                ? "bg-green-100"
                : "bg-blue-100"
            }
          `}
        >

          <CheckCircle
            size={20}
            className={
              operationnel
                ? "text-green-600"
                : "text-blue-600"
            }
          />

        </div>

        <div className="ml-4 min-w-0">

          <h3 className="text-sm font-bold text-slate-800">
            {titre}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>

        </div>

      </div>

      <span
        className={`
          shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold
          ${classeEtat}
        `}
      >
        {valeur || "-"}
      </span>

    </div>
  );
}

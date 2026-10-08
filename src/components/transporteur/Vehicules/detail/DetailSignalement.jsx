import {
  ArrowLeft,
  AlertTriangle,
  Truck,
  ClipboardList,
  Wrench,
  Image as ImageIcon,
  Check,
  ShieldCheck,
} from "lucide-react";

const styleStatutSignalement = {
  A_TRAITER: "bg-orange-100 text-orange-500",
  TRAITE: "bg-green-100 text-green-700",
  IGNORE: "bg-slate-100 text-slate-500",
};

const libellesStatut = {
  A_TRAITER: "À traiter",
  TRAITE: "Traité",
  IGNORE: "Ignoré",
};

const styleEtat = {
  "Bon état": "bg-green-100 text-green-700",
  "À vérifier": "bg-orange-100 text-orange-500",
  "En panne": "bg-red-100 text-red-600",
};

const styleStatutMission = {
  PREVU: "bg-slate-100 text-slate-600",
  EN_COURS: "bg-blue-100 text-blue-700",
  TERMINEE: "bg-green-100 text-green-700",
  ANNULEE: "bg-red-100 text-red-600",
};

const libellesStatutMission = {
  PREVU: "Prévu",
  EN_COURS: "En cours",
  TERMINEE: "Terminée",
  ANNULEE: "Annulée",
};

const classeLabel =
  "text-xs font-bold text-slate-400 uppercase tracking-wide";

export default function DetailSignalement({
  signalement,
  vehicule,
  onRetour,
  onIgnorer,
  onTraiter,
  onRemettreEnBonEtat,
  chargement,
  erreur,
}) {
  const photo = signalement.photo;

  // Mission liée au signalement
  const mission = signalement.mission;

  // Agent lié à la mission
  const agent = mission?.agent;

  /*
   * Logique métier :
   *
   * 1. Signalement A_TRAITER + véhicule Bon état
   *    → Prendre en compte / Ignorer
   *
   * 2. Signalement A_TRAITER + véhicule À vérifier
   *    → Remettre en bon état
   *
   * 3. Signalement TRAITE
   *    → Signalement terminé
   *
   * 4. Signalement IGNORE
   *    → Signalement ignoré
   */

  const signalementEnCours =
    signalement.statut === "A_TRAITER";

  const vehiculeAReparer =
    vehicule.etat_technique === "A_VERIFIER";

  return (
    <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">

      {/* En-tête */}
      <header className="h-20 px-4 sm:px-8 bg-white border-b border-slate-200 flex items-center gap-4 sm:gap-6">

        <button
          type="button"
          onClick={onRetour}
          className="flex items-center gap-2 font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        <div className="w-px h-6 bg-slate-200" />

        <h1 className="text-lg sm:text-xl font-bold text-slate-800">
          Signalement #{signalement.id}
        </h1>

      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ================================
              COLONNE GAUCHE
          ================================= */}

          <div className="lg:col-span-2 min-w-0 flex flex-col gap-8">

            {/* Détails du signalement */}
            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

              <div className="p-6 border-b border-slate-50 flex items-center justify-between gap-4">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 shrink-0 bg-orange-50 rounded-2xl flex items-center justify-center">

                    <AlertTriangle
                      size={20}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <h2 className="text-base font-bold text-slate-800">
                      Détails du signalement
                    </h2>

                    {/*<p className="text-sm text-slate-400">
                      ID: {signalement.id}
                    </p>*/}

                  </div>

                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ${
                    styleStatutSignalement[signalement.statut]
                  }`}
                >
                  {libellesStatut[signalement.statut] ||
                    signalement.statut}
                </span>

              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-8">

                <div className="flex flex-col gap-6">

                <div className="flex gap-40">

                  {/* Type */}
                  <div>

                    <p className={classeLabel}>
                      Type de problème
                    </p>

                    <p className="mt-2 text-lg font-semibold text-slate-800">
                      {signalement.type_probleme || "-"}
                    </p>

                  </div>

                  {/* Date */}
                  <div>

                    <p className={classeLabel}>
                      Date du signalement
                    </p>

                    <p className="mt-2 font-medium text-slate-800">

                      {signalement.date_creation
                        ? new Date(
                            signalement.date_creation
                          ).toLocaleString("fr-FR")
                        : "-"}

                    </p>

                  </div>
                  </div>

                  {/* Description */}
                  <div>

                    <p className={classeLabel}>
                      Description
                    </p>

                    <p className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
                      &quot;{signalement.description || "-"}&quot;
                    </p>

                  </div>

                </div>

                {/* Photo */}
                <div>

                  <p className={classeLabel}>
                    Photo du constat
                  </p>

                  <div >

                    {photo ? (
                      <div className="h-48 bg-slate-100 rounded-2xl border border-slate-100 overflow-hidden">

                        <img
                          src={`http://127.0.0.1:8000${photo}`}
                          alt="Constat"
                          className="w-full h-full object-cover"
                        />

                      </div>
                    ) : (
                      <div className="h-48 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400">

                        <ImageIcon size={28} />

                        <span className="text-xs font-medium">
                          Aucune photo
                        </span>

                      </div>
                    )}

                  </div>

                </div>

              </div>

            </section>

            {/* Véhicule + Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Véhicule */}
              <Carte
                icone={<Truck size={18} />}
                titre="Véhicule concerné"
              >

                <div className="flex items-center gap-4">

                  <div className="w-20 h-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">

                    <Truck
                      size={24}
                      className="text-slate-400"
                    />

                  </div>

                  <div>

                    <p className="text-lg font-bold text-slate-800">
                      {vehicule.immatriculation}
                    </p>

                    <p className="text-xs font-medium text-slate-400 uppercase">
                      {vehicule.type_vehicule}
                    </p>

                  </div>

                </div>

                <div>

                  <Ligne label="Statut" bordure>

                    <Badge classe="bg-green-100 text-green-700">
                      {vehicule.statut}
                    </Badge>

                  </Ligne>

                  <Ligne label="État technique">

                    <Badge
                      classe={
                        styleEtat[vehicule.etat_technique]
                      }
                    >
                      {vehicule.etat_technique || "-"}
                    </Badge>

                  </Ligne>

                </div>

              </Carte>

              {/* Mission */}
              <Carte
                icone={<ClipboardList size={18} />}
                titre="Mission concernée"
              >

                {mission ? (
                  <>

                    <div>

                      <p className="text-sm text-slate-400">
                        Identifiant mission
                      </p>

                      <p className="text-lg font-bold text-slate-800">
                        #{mission.id}
                      </p>

                    </div>

                    <div>

                      <Ligne label="Statut" bordure>

                        <Badge
                          classe={
                            styleStatutMission[mission.statut]
                          }
                        >
                          {libellesStatutMission[mission.statut] ||
                            mission.statut}
                        </Badge>

                      </Ligne>

                      <Ligne label="Fin prévue">

                        <span className="text-xs font-bold text-slate-700">

                          {mission.date_fin_prevue
                            ? new Date(
                                mission.date_fin_prevue
                              ).toLocaleString("fr-FR")
                            : "-"}

                        </span>

                      </Ligne>

                    </div>

                  </>
                ) : (
                  <p className="text-sm text-slate-400">
                    Aucune mission liée à ce signalement.
                  </p>
                )}

              </Carte>

            </div>

          </div>

          {/* ================================
              COLONNE DROITE
          ================================= */}

          <div className="min-w-0 flex flex-col gap-8">

            {/* Agent rapporteur */}
            <section className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">

              <h2 className="text-base font-bold text-slate-800">
                Agent rapporteur
              </h2>

              {agent ? (
                <>

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center text-xl font-bold text-slate-500">

                      {agent.photo ? (
                        <img
                          src={`http://127.0.0.1:8000${agent.photo}`}
                          alt={`${agent.prenom} ${agent.nom}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        agent.prenom?.charAt(0) ||
                        agent.nom?.charAt(0) ||
                        "A"
                      )}

                    </div>

                    <div className="min-w-0">

                      <p className="text-lg font-bold text-slate-800">
                        {agent.prenom} {agent.nom}
                      </p>

                    </div>

                  </div>

                  {agent.disponible && (
                    <div className="px-4 py-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 bg-green-500 rounded-full" />

                        <span className="text-sm font-bold text-green-700">
                          Disponible
                        </span>

                      </div>

                      <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">

                        <Check size={14} />

                      </div>

                    </div>
                  )}

                  {agent.telephone && (
                    <div>

                      <span className={classeLabel}>
                        Téléphone:
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {" "}
                        {agent.telephone}
                      </span>

                    </div>
                  )}

                </>
              ) : (
                <p className="text-sm text-slate-400">
                  Aucun agent lié à cette mission.
                </p>
              )}

            </section>

            {/* Traitement */}
            <section className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-100 shadow-lg flex flex-col gap-8">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 shrink-0 bg-sky-950 rounded-xl flex items-center justify-center text-white">

                  <Wrench size={18} />

                </div>

                <h2 className="text-base font-bold text-slate-800">
                  Traitement
                </h2>

              </div>

              {/* Erreur */}
              {erreur && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                  {typeof erreur === "string"
                    ? erreur
                    : "Une erreur est survenue lors du traitement."}
                </div>
              )}

              {/* ================================
                  SIGNALÉ À TRAITER
              ================================= */}

              {signalementEnCours &&
                !vehiculeAReparer && (
                  <div className="flex flex-col gap-4">

                    <p className="text-sm text-slate-500">
                      Ce signalement n&apos;a pas encore été pris en compte.
                    </p>

                    <button
                      type="button"
                      onClick={onTraiter}
                      disabled={chargement}
                      className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                    >

                      <Wrench size={17} />

                      {chargement
                        ? "Traitement..."
                        : "Prendre en compte"}

                    </button>

                    <button
                      type="button"
                      onClick={onIgnorer}
                      disabled={chargement}
                      className="w-full py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50"
                    >
                      Ignorer ce signalement
                    </button>

                  </div>
                )}

              {/* ================================
                  VÉHICULE À VÉRIFIER
              ================================= */}

              {signalementEnCours &&
                vehiculeAReparer && (
                  <div className="flex flex-col gap-4">

                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">

                      <div className="flex items-center gap-2">

                        <AlertTriangle
                          size={18}
                          className="text-orange-500"
                        />

                        <span className="text-sm font-bold text-orange-600">
                          Véhicule à vérifier
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-orange-600/80">
                        Le signalement a été pris en compte.
                        Le véhicule doit maintenant être vérifié.
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={onRemettreEnBonEtat}
                      disabled={chargement}
                      className="w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold shadow-md shadow-green-500/20 flex items-center justify-center gap-2"
                    >

                      <ShieldCheck size={17} />

                      {chargement
                        ? "Mise à jour..."
                        : "Remettre en bon état"}

                    </button>

                  </div>
                )}

              {/* ================================
                  SIGNALÉMENT TRAITÉ
              ================================= */}

              {signalement.statut === "TRAITE" && (
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">

                  <div className="flex items-center gap-2">

                    <ShieldCheck
                      size={17}
                      className="text-green-600"
                    />

                    <span className="text-sm font-bold text-green-700">
                      Signalement traité
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-green-600/80">
                    Le véhicule a été remis en bon état et le signalement
                    est maintenant terminé.
                  </p>

                </div>
              )}

              {/* ================================
                  SIGNALÉMENT IGNORÉ
              ================================= */}

              {signalement.statut === "IGNORE" && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">

                  <div className="flex items-center gap-2">

                    <AlertTriangle
                      size={17}
                      className="text-slate-400"
                    />

                    <span className="text-sm font-bold text-slate-600">
                      Signalement ignoré
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Ce signalement ne nécessite plus de traitement.
                  </p>

                </div>
              )}

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

// ================================
// Carte
// ================================

function Carte({ icone, titre, children }) {
  return (
    <section className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
          {icone}
        </div>

        <h2 className="text-base font-bold text-slate-800">
          {titre}
        </h2>

      </div>

      {children}

    </section>
  );
}

// ================================
// Ligne
// ================================

function Ligne({ label, bordure = false, children }) {
  return (
    <div
      className={`py-3 flex items-center justify-between gap-4 ${
        bordure
          ? "border-b border-slate-50"
          : ""
      }`}
    >

      <span className="text-sm text-slate-500">
        {label}
      </span>

      {children}

    </div>
  );
}

// ================================
// Badge
// ================================

function Badge({ classe, children }) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${classe}`}
    >
      {children}
    </span>
  );
}

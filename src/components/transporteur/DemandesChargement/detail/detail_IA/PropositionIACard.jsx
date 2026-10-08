function Critere({ texte, valide }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          valide
            ? "bg-emerald-100 text-emerald-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {valide ? "✓" : "!"}
      </div>

      <span className="text-sm text-slate-600">
        {texte}
      </span>
    </div>
  );
}

export default function PropositionIACard({
  proposition,
  numero,
  recommandee = false,
  onValider,
  onRefuser,
}) {
  const { vehicule, agent, criteres } = proposition;

  return (
    <article
      className={`w-full rounded-3xl border bg-white p-6 shadow-sm ${
        recommandee
          ? "border-emerald-200"
          : "border-slate-200"
      }`}
    >
      {/* En-tête */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          {/*<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🚚
          </div>*/}

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Proposition {String(numero).padStart(2, "0")}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#0F2A4A]">
                {recommandee ? "Recommandée" : "Alternative"}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-orange-50 px-4 py-2">
          <span className="text-sm font-bold text-[#F5821F]">
            Score IA : {proposition.score}%
          </span>
        </div>
      </div>

      {/* Véhicule + agent */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Véhicule proposé
          </p>

          <div className="mt-4">
            <p className="text-lg font-extrabold text-[#0F2A4A]">
              {vehicule.immatriculation}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {vehicule.type_vehicule}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Agent proposé
            </p>

            <div className="mt-4 flex items-center gap-4">
                {agent.photo ? (
                <img
                    src={`http://127.0.0.1:8000${agent.photo}`}
                    alt={`${agent.prenom} ${agent.nom}`}
                    className="h-14 w-14 rounded-full object-cover"
                />
                ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0F2A4A] text-lg font-bold text-white">
                    {agent.prenom?.charAt(0)}
                    {agent.nom?.charAt(0)}
                </div>
                )}

                <div className="min-w-0">
                <p className="text-lg font-extrabold text-[#0F2A4A]">
                    {agent.prenom} {agent.nom}
                </p>

                {agent.telephone && (
                    <p className="mt-1 text-sm text-slate-500">
                    {agent.telephone}
                    </p>
                )}

                {/*{agent.categorie_permis && (
                    <p className="mt-1 text-sm text-slate-500">
                    Permis : {agent.categorie_permis}
                    </p>
                )}*/}
                </div>
            </div>
            </div>
        </div>

      {/* Pourquoi cette proposition 
      <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#F5821F]">
          Pourquoi cette proposition ?
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {proposition.raison}
        </p>
      </div>*/}

      {/* Critères vérifiés */}
      <div className="mt-6">
        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Critères vérifiés
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Critere
            texte="Véhicule disponible"
            valide={criteres.vehicule_disponible}
          />

          <Critere
            texte="Agent disponible"
            valide={criteres.agent_disponible}
          />

          <Critere
            texte="Bon état technique"
            valide={criteres.bon_etat_technique}
          />

          <Critere
            texte="Permis valide"
            valide={criteres.permis_valide}
          />

          <Critere
            texte="Documents valides"
            valide={criteres.documents_valides}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        {/*<button
          type="button"
          onClick={onRefuser}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Refuser
        </button>*/}

        <button
          type="button"
          onClick={onValider}
          className="rounded-xl bg-[#0F2A4A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b213a]"
        >
          Valider la mission
        </button>
      </div>
    </article>
  );
}
export default function LoadingRequestsCard({
  demandes,
  loading,
}) {
  // Affiche uniquement les demandes encore en attente.
  const demandesEnAttente = demandes.filter(
    (demande) => demande.statut === "PREVU"
  );

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-bold leading-6 text-sky-950">
          Demandes de chargement récentes
        </h2>

        <button
          type="button"
          className="text-sm font-semibold leading-5 text-orange-500"
        >
          Voir tout →
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[1fr_1.3fr_0.8fr] bg-slate-50">
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Expéditeur
            </div>

            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Trajet
            </div>

            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Statut
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-center text-sm text-slate-400">
              Chargement des demandes...
            </div>
          ) : demandesEnAttente.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-slate-400">
              Aucune demande en attente.
            </div>
          ) : (
            demandesEnAttente.map((demande, index) => (
              <div
                key={demande.id}
                className={`grid grid-cols-[1fr_1.3fr_0.8fr] items-center ${
                  index > 0
                    ? "border-t border-slate-100"
                    : ""
                }`}
              >
                <div className="px-6 py-4 text-sm font-medium tracking-tight text-gray-900">
                  {demande.demandeur}
                </div>

                <div className="px-6 py-4 text-sm text-slate-600">
                  {demande.point_depart}
                  {" → "}
                  {demande.destination}
                </div>

                <div className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-cyan-800/10 px-3 py-1 text-xs font-bold text-cyan-800">
                    Prévu
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
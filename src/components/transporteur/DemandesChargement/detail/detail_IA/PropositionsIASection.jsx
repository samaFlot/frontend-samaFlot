import PropositionIACard from "./PropositionIACard";

export default function PropositionsIASection({
  propositions,
  loading,
  error,
  message,
  onValider,
}) {
  return (
    <section className="w-full">
      {/* Titre */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-1 text-2xl font-extrabold text-[#0F2A4A]">
            Propositions de l’IA
          </h2>
        </div>

        {/*{!loading && !error && propositions.length > 0 && (
          <div className="w-fit rounded-full bg-orange-50 px-4 py-2">
            <span className="text-xs font-bold text-[#F5821F]">
              {propositions.length} proposition
              {propositions.length > 1 ? "s" : ""}
            </span>
          </div>
        )}*/}
      </div>

      {/* Message explicatif */}
      {!loading && !error && message && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
              ℹ
            </div>

            <p className="text-sm leading-6 text-amber-800">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Chargement */}
      {loading && (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#F5821F]" />

          <p className="mt-4 text-sm text-slate-500">
            L’IA analyse les ressources disponibles...
          </p>
        </div>
      )}

      {/* Erreur */}
      {!loading && error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <p className="font-bold text-red-600">
            Impossible de récupérer les propositions.
          </p>

          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        </div>
      )}

      {/* Aucune proposition
      {!loading &&
        !error &&
        propositions.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">🤖</div>

            <h3 className="mt-4 font-bold text-[#0F2A4A]">
              Aucune proposition disponible
            </h3>

            {!message && (
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                L’IA n’a trouvé aucune proposition pour cette demande.
              </p>
            )}
          </div>
        )}*/}

      {/* Propositions */}
      {!loading &&
        !error &&
        propositions.length > 0 && (
          <div className="flex w-full flex-col gap-6">
            {propositions.map((proposition, index) => (
              <PropositionIACard
                key={`${proposition.vehicule.id}-${proposition.agent.id}`}
                proposition={proposition}
                numero={index + 1}
                recommandee={index === 0}
                onValider={() =>
                  onValider(proposition)
                }
              />
            ))}
          </div>
        )}
    </section>
  );
}

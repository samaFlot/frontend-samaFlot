export default function DemandeProgressionCard({
  missionsCreees,
  missionsDemandees,
}) {
  const pourcentage =
    missionsDemandees > 0
      ? Math.min(
          100,
          Math.round(
            (missionsCreees / missionsDemandees) * 100
          )
        )
      : 0;

  return (
    <section className="w-full rounded-xl bg-sky-950 p-4 text-white shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>

          <h3 className="text-xl font-extrabold">
            Affectation des véhicules
          </h3>

          <p className="mt-1 text-sm text-slate-300">
            {missionsCreees} mission
            {missionsCreees > 1 ? "s" : ""} créée
            {missionsCreees > 1 ? "s" : ""} sur{" "}
            {missionsDemandees}
          </p>
        </div>

        <div>
          <span className="text-3xl font-black text-[#F5821F]">
            {pourcentage}%
          </span>
        </div>
      </div>

      <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#F5821F] transition-all duration-500"
          style={{
            width: `${pourcentage}%`,
          }}
        />
      </div>
    </section>
  );
}
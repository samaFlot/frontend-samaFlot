const MISSIONS = [
  {
    requester: "SODEFITEX",
    destination: "Kaolack",
    status: "En cours",
  },
  {
    requester: "Suneor",
    destination: "Diourbel",
    status: "En cours",
  },
  {
    requester: "Eiffage Sénégal",
    destination: "Dakar - Diamniadio",
    status: "En cours",
  },
  {
    requester: "ICS Mbao",
    destination: "Mbour",
    status: "En cours",
  },
];

export default function MissionsCard() {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-bold leading-6 tracking-tight text-sky-950">
          Missions en cours
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
          <div className="grid grid-cols-[1.2fr_1.4fr_0.9fr] bg-slate-50">
            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Demandeur
            </div>

            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Destination
            </div>

            <div className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Statut
            </div>
          </div>

          {MISSIONS.map((mission, index) => (
            <div
              key={mission.requester}
              className={`grid grid-cols-[1.2fr_1.4fr_0.9fr] items-center ${
                index > 0 ? "border-t border-slate-100" : ""
              }`}
            >
              <div className="px-6 py-4 text-sm font-medium tracking-tight text-gray-900">
                {mission.requester}
              </div>

              <div className="px-6 py-4 text-sm tracking-tight text-slate-600">
                {mission.destination}
              </div>

              <div className="px-6 py-4">
                <span className="inline-flex rounded-full bg-cyan-800/10 px-3 py-1 text-xs font-bold text-cyan-800">
                  {mission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function OngletsVehicule({
  ongletActif,
  setOngletActif,
}) {
  const onglets = [
    {
      id: "informations",
      label: "Informations",
    },
    {
      id: "documents",
      label: "Documents",
    },
    {
      id: "signalements",
      label: "Signalements",
    },
  ];

  return (
    <div className="w-full border-b border-slate-200">
      <div className="flex items-center gap-8 overflow-x-auto">
        {onglets.map((onglet) => {
          const actif = ongletActif === onglet.id;

          return (
            <button
              key={onglet.id}
              onClick={() => setOngletActif(onglet.id)}
              className={`
                shrink-0 pb-4 text-sm font-medium transition-colors
                ${
                  actif
                    ? "text-orange-500 font-bold border-b-2 border-orange-500"
                    : "text-slate-500 hover:text-slate-700"
                }
              `}
            >
              {onglet.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
import { Eye, Pencil } from "lucide-react";

const AGENTS = [
  {
    id: 1,
    firstName: "Modou",
    lastName: "Fall",
    role: "Chauffeur Senior",
    phone: "+221 77 123 45 67",
    email: "modou.fall@samaflot.sn",
    status: "Disponible",
  },
  {
    id: 2,
    firstName: "Ibrahima",
    lastName: "Ndiaye",
    role: "Chauffeur Poids Lourd",
    phone: "+221 77 555 12 34",
    email: "i.ndiaye@samaflot.sn",
    status: "Indisponible",
  },
  {
    id: 3,
    firstName: "Awa",
    lastName: "Gueye",
    role: "Logistique",
    phone: "+221 76 888 44 22",
    email: "awa.gueye@samaflot.sn",
    status: "Disponible",
  },
  {
    id: 4,
    firstName: "Babacar",
    lastName: "Sy",
    role: "Chauffeur Citerne",
    phone: "+221 70 999 00 11",
    email: "babacar.sy@samaflot.sn",
    status: "Disponible",
  },
  {
    id: 5,
    firstName: "Fatou",
    lastName: "Sow",
    role: "Gestionnaire de Stock",
    phone: "+221 77 444 33 22",
    email: "fatou.sow@samaflot.sn",
    status: "Disponible",
  },
  {
    id: 6,
    firstName: "Cheikh",
    lastName: "Tidiane",
    role: "Chauffeur Plateau",
    phone: "+221 78 222 99 88",
    email: "c.tidiane@samaflot.sn",
    status: "Indisponible",
  },
  {
    id: 7,
    firstName: "Mariama",
    lastName: "Bâ",
    role: "Planificatrice",
    phone: "+221 77 111 00 00",
    email: "m.ba@samaflot.sn",
    status: "Disponible",
  },
  {
    id: 8,
    firstName: "Ousmane",
    lastName: "Diallo",
    role: "Superviseur Fleet",
    phone: "+221 76 333 44 55",
    email: "o.diallo@samaflot.sn",
    status: "Disponible",
  },
];

// Colonnes fractionnelles avec un plancher (minmax) plutôt que des
// pixels fixes : elles se répartissent l'espace disponible et ne
// forcent plus la grille à dépasser la largeur du conteneur.
const GRID_COLS =
  "grid-cols-[minmax(220px,2fr)_minmax(140px,1fr)_minmax(180px,1.3fr)_minmax(110px,0.8fr)_minmax(96px,0.6fr)]";

export default function AgentsTable() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="w-full overflow-x-auto">
        {/* Header */}
        <div className={`grid ${GRID_COLS} border-b border-slate-100 bg-slate-50`}>
          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Agent
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Téléphone
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Email
          </div>

          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
            Statut
          </div>

          <div className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
            Actions
          </div>
        </div>

        {/* Lignes */}
        {AGENTS.map((agent) => {
          const isAvailable = agent.status === "Disponible";

          return (
            <div
              key={agent.id}
              className={`grid ${GRID_COLS} items-center border-b border-slate-100 last:border-b-0`}
            >
              {/* Agent */}
              <div className="flex min-w-0 items-center gap-3 px-6 py-5">
                <img
                  src="https://placehold.co/40x40"
                  alt={`${agent.firstName} ${agent.lastName}`}
                  className="size-10 shrink-0 rounded-full"
                />

                <div className="min-w-0">
                  <p className="truncate text-base font-bold tracking-tight text-sky-950">
                    {agent.firstName} {agent.lastName}
                  </p>

                  <p className="truncate text-xs font-semibold uppercase tracking-tight text-slate-400">
                    {agent.role}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="min-w-0 truncate px-6 py-5 text-sm text-slate-600">
                {agent.phone}
              </div>

              {/* Email */}
              <div className="min-w-0 truncate px-6 py-5 text-sm text-slate-500">
                {agent.email}
              </div>

              {/* Statut */}
              <div className="min-w-0 px-6 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-tight ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-500"
                      : "bg-slate-100 text-cyan-800"
                  }`}
                >
                  {agent.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 px-6 py-5">
                <button
                  type="button"
                  className="text-slate-400 transition hover:text-sky-950"
                  aria-label={`Voir ${agent.firstName} ${agent.lastName}`}
                >
                  <Eye className="size-4" />
                </button>

                <button
                  type="button"
                  className="text-slate-400 transition hover:text-sky-950"
                  aria-label={`Modifier ${agent.firstName} ${agent.lastName}`}
                >
                  <Pencil className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
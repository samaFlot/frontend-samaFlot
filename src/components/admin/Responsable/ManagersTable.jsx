import { Link } from "react-router-dom";

export default function ManagersTable({ companies, onViewDetail }) {
  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
      <div className="w-full overflow-x-auto">
        {/* Le wrapper min-w-[960px] a été retiré : les colonnes fr
            ci-dessous suffisent à répartir l'espace, il n'y a plus
            besoin d'imposer une largeur totale minimale. overflow-x-auto
            reste en filet de sécurité pour les très petits écrans. */}
        <div className="min-w-0">
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.8fr] gap-4 border-b border-gray-100 bg-gray-50/50 px-8 py-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Nom de l'entreprise
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Nom du Responsable
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Téléphone ou email
            </span>
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
              Statut
            </span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
              Date de création
            </span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
              Actions
            </span>
          </div>

          {companies.map((c, i) => (
            <div
              key={c.company}
              className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_0.8fr] items-center gap-4 px-8 py-4 ${
                i > 0 ? "border-t border-gray-50" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-950/5 text-xs font-bold tracking-tight text-sky-950">
                  {c.initials}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-base font-semibold tracking-tight text-sky-950">
                    {c.company}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {c.city}
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <img
                  className="size-8 shrink-0 rounded-full border border-gray-100"
                  src={c.avatar}
                  alt={c.manager}
                />
                <span className="truncate text-sm font-medium tracking-tight text-gray-900">
                  {c.manager}
                </span>
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm text-gray-900">
                  {c.phone}
                </span>
                <span className="truncate text-xs text-gray-400">
                  {c.email}
                </span>
              </div>

              <div className="flex min-w-0 justify-center">
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-tight ${
                    c.status === "Actif"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-red-700/10 text-red-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <span className="truncate text-right text-sm font-medium text-gray-500">
                {c.date}
              </span>

              <div className="flex min-w-0 justify-end">
                <Link
                  to={`/admin/responsables/${c.id}`}
                  className="whitespace-nowrap text-sm font-semibold tracking-tight text-cyan-800 hover:underline"
                >
                  Voir détail
                </Link>
              </div>
            </div>
          ))}

          {companies.length === 0 && (
            <div className="px-8 py-12 text-center text-sm text-gray-400">
              Aucun responsable ne correspond à votre recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
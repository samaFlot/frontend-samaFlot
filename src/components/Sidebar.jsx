import { NavLink } from "react-router-dom";

function Sidebar({ items }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col justify-between bg-sky-950">
      <div className="flex w-full items-center gap-3 p-8">
        <img
          className="h-14 w-auto"
          src="https://placehold.co/180x53?text=SamaFlot"
          alt="SamaFlot"
        />
      </div>

      <nav className="flex w-full flex-1 flex-col gap-2 px-4 pt-4">
        {items.map(({ icon: Icon, label, path, end }) => (
          <NavLink
            key={label}
            to={path}
            //Sans end, React Router considère que /admin est toujours actif meme si on est sur /admin/responsables
            // donc on lui dit: considère ce lien actif seulement si on est arrivé exactement à cette route.
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? "bg-cyan-900 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />

                <span className="text-base font-medium tracking-tight">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="w-full border-t border-white/10 p-6">
        <div className="flex items-center gap-3 rounded-2xl p-3">
          <img
            className="size-10 shrink-0 rounded-full border-2 border-cyan-800"
            src="https://placehold.co/40x40"
            alt="Moussa Diop"
          />

          <span className="truncate text-sm font-semibold tracking-tight text-white">
            Moussa Diop
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
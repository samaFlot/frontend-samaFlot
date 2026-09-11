import { ChevronRight } from "lucide-react";

const ACCOUNTS = [
  { initials: "SL", company: "Senegal Logistics S.A.", city: "Dakar, Sénégal", manager: "Awa Ndiaye", avatar: "https://placehold.co/32x32", status: "Actif", date: "14 Oct 2023" },
  { initials: "GF", company: "Global Freight SARL", city: "Saint-Louis, Sénégal", manager: "Oumar Sy", avatar: "https://placehold.co/32x32", status: "Actif", date: "12 Oct 2023" },
  { initials: "OT", company: "Ocean Transport Group", city: "Thiès, Sénégal", manager: "Modou Fall", avatar: "https://placehold.co/32x32", status: "Désactivé", date: "10 Oct 2023" },
  { initials: "TS", company: "Teranga Shipping", city: "Dakar Port, Sénégal", manager: "Fatou Sow", avatar: "https://placehold.co/32x32", status: "Actif", date: "08 Oct 2023" },
  { initials: "BC", company: "Baobab Cargo Services", city: "Ziguinchor, Sénégal", manager: "Aminata Diallo", avatar: "https://placehold.co/32x32", status: "Actif", date: "05 Oct 2023" },
];

export default function AccountsTable() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
      <div className="flex items-center justify-between border-b border-gray-50 p-8">
        <h2 className="text-xl font-bold tracking-tight text-sky-950">
          Derniers comptes créés
        </h2>
        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-cyan-800">
          Voir tous les Responsables
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-4 border-b border-gray-50 px-8 py-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nom de l'entreprise</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Nom du Responsable</span>
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400">Statut</span>
            <span className="text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Date de création</span>
          </div>

          {ACCOUNTS.map((acc, i) => (
            <div
              key={acc.company}
              className={`grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 px-8 py-4 ${
                i > 0 ? "border-t border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold tracking-tight text-sky-950">
                  {acc.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-sky-950">{acc.company}</span>
                  <span className="text-xs text-gray-400">{acc.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img className="size-8 shrink-0 rounded-full" src={acc.avatar} alt={acc.manager} />
                <span className="text-sm font-medium tracking-tight text-gray-900">{acc.manager}</span>
              </div>

              <div className="flex justify-center">
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-tight ${
                    acc.status === "Actif"
                      ? "bg-green-600/10 text-green-600"
                      : "bg-red-700/10 text-red-700"
                  }`}
                >
                  {acc.status}
                </span>
              </div>

              <span className="text-right text-sm font-medium text-gray-500">{acc.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center bg-gray-50 px-6 pb-6 pt-7">
        <button className="text-sm font-semibold text-cyan-800">
          Afficher les 137 autres responsables
        </button>
      </div>
    </div>
  );
}
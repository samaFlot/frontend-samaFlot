import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MissionsPagination from "./MissionsPagination";

const MISSIONS = [
  {
    id: 1,
    demandeur: "Grands Moulins",
    depart: "Dakar",
    destination: "Thiès",
    date: "24 Oct 2023, 08:00",
    vehicule: "DK-1234-AB",
    type: "35 Tonnes",
    agent: "Modou Fall",
    status: "En cours",
  },
  {
    id: 2,
    demandeur: "Cimenterie du Sahel",
    depart: "Kirène",
    destination: "Saint-Louis",
    date: "24 Oct 2023, 07:30",
    vehicule: "DK-8892-CD",
    type: "20 Tonnes",
    agent: "Alioune Sow",
    status: "Terminée",
  },
  {
    id: 3,
    demandeur: "SENELEC",
    depart: "Dakar Port",
    destination: "Kaolack",
    date: "23 Oct 2023, 09:00",
    vehicule: "DK-4451-BC",
    type: "Porte-char",
    agent: "Omar Ndiaye",
    status: "En cours",
  },
  {
    id: 4,
    demandeur: "Orange SN",
    depart: "Dakar VDN",
    destination: "Touba",
    date: "23 Oct 2023, 14:00",
    vehicule: "DK-1122-Z",
    type: "Fourgonnette",
    agent: "Cheikh Gueye",
    status: "Terminée",
  },
  {
    id: 5,
    demandeur: "ICS Taïba",
    depart: "Darou",
    destination: "Mbao",
    date: "22 Oct 2023, 06:45",
    vehicule: "DK-9908-XY",
    type: "Citerne",
    agent: "Ibrahima Faye",
    status: "Terminée",
  },
  {
    id: 6,
    demandeur: "Kirène SARL",
    depart: "Diass",
    destination: "Dakar Plateau",
    date: "22 Oct 2023, 11:15",
    vehicule: "DK-5566-EF",
    type: "10 Tonnes",
    agent: "Modou Fall",
    status: "En cours",
  },
  {
    id: 7,
    demandeur: "PetroSen",
    depart: "Dakar",
    destination: "Tambacounda",
    date: "21 Oct 2023, 05:00",
    vehicule: "DK-7733-GH",
    type: "Citerne",
    agent: "Alioune Sow",
    status: "En cours",
  },
  {
    id: 8,
    demandeur: "Sococim",
    depart: "Rufisque",
    destination: "Mbour",
    date: "20 Oct 2023, 16:30",
    vehicule: "DK-0011-IJ",
    type: "35 Tonnes",
    agent: "Omar Ndiaye",
    status: "Terminée",
  },
];

export default function MissionsTable() {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="w-full overflow-x-auto">
        {/* table-auto + w-full : les colonnes se dimensionnent selon
            leur contenu et l'espace disponible, sans largeur minimale
            imposée. overflow-x-auto reste en filet de sécurité pour
            les très petits écrans, plutôt qu'une contrainte systématique. */}
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Demandeur
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Trajet
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Date Chargement
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Véhicule
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Agent
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                Statut
              </th>

              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {MISSIONS.map((mission) => (
              <MissionRow key={mission.id} mission={mission} />
            ))}
          </tbody>
        </table>
      </div>

      <MissionsPagination />
    </section>
  );
}

function MissionRow({ mission }) {
  const isCompleted = mission.status === "Terminée";

  return (
    <tr className="border-b border-slate-50 last:border-b-0">
      {/* Demandeur */}
      <td className="max-w-[180px] px-6 py-6">
        <span className="block truncate text-sm font-bold tracking-tight text-sky-950">
          {mission.demandeur}
        </span>
      </td>

      {/* Trajet */}
      <td className="px-6 py-6">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-semibold text-slate-600">
            {mission.depart}
          </span>

          <ArrowRight className="size-3.5 shrink-0 text-slate-300" />

          <span className="text-xs font-semibold text-slate-600">
            {mission.destination}
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-6">
        <span className="whitespace-nowrap text-xs text-slate-500">
          {mission.date}
        </span>
      </td>

      {/* Véhicule */}
      <td className="px-6 py-6">
        <div>
          <p className="whitespace-nowrap text-xs font-bold text-slate-700">
            {mission.vehicule}
          </p>

          <p className="whitespace-nowrap text-[10px] uppercase leading-4 text-slate-400">
            {mission.type}
          </p>
        </div>
      </td>

      {/* Agent */}
      <td className="px-6 py-6">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <img
            src="https://placehold.co/24x24"
            alt={mission.agent}
            className="size-6 shrink-0 rounded-full"
          />

          <span className="text-xs font-medium text-slate-700">
            {mission.agent}
          </span>
        </div>
      </td>

      {/* Statut */}
      <td className="px-6 py-6">
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
            isCompleted
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
              : "border-cyan-800/20 bg-cyan-800/10 text-cyan-800"
          }`}
        >
          {mission.status}
        </span>
      </td>

      {/* Action */}
      <td className="whitespace-nowrap px-6 py-6 text-right">
        <Link
          to={`/transporteur/missions/${mission.id}`}
          className="text-xs font-bold text-cyan-800 hover:underline"
        >
          Voir détail
        </Link>
      </td>
    </tr>
  );
}
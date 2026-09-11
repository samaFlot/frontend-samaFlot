import StatCard from "../../components/admin/dashboard/StatCard";
import AccountsTable from "../../components/admin/dashboard/AccountsTable";

import {
    ArrowUpRight,
  CalendarDays,
  Clock,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import Topbar from "../../components/admin/dashboard/Topbar";

const STATS = [
  {
    label: "Responsables actifs",
    value: "128",
    valueColor: "text-green-600",
    iconBg: "bg-green-600/10",
    icon: UserCheck,
    iconColor: "text-green-600",
    footerText: "+12% depuis le mois dernier",
    footerIcon: ArrowUpRight,
    footerColor: "text-green-600",
  },
  {
    label: "Responsables désactivés",
    value: "14",
    valueColor: "text-red-700",
    iconBg: "bg-red-700/10",
    icon: UserX,
    iconColor: "text-red-700",
    footerText: "Dernière action il y a 2h",
    footerIcon: Clock,
    footerColor: "text-gray-400",
  },
  {
    label: "Total des comptes créés",
    value: "142",
    valueColor: "text-sky-950",
    iconBg: "bg-sky-950/10",
    icon: Users,
    iconColor: "text-sky-950",
    footerText: "Depuis le lancement",
    footerIcon: CalendarDays,
    footerColor: "text-gray-400",
  },
];


export default function Dashboard() {
  return (
    <>
      <Topbar title="Tableau de bord" />

      <div className="flex w-full flex-col gap-8 p-6 sm:p-10">
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <AccountsTable />
      </div>
    </>
  );
}
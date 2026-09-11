import TransporteurTopbar from "../../components/transporteur/dashboard/TransporteurTopbar";
import DashboardStatCard from "../../components/transporteur/dashboard/DashboardStatCard";
import MissionsCard from "../../components/transporteur/dashboard/MissionsCard";
import LoadingRequestsCard from "../../components/transporteur/dashboard/LoadingRequestsCard";
import FleetMapCard from "../../components/transporteur/dashboard/FleetMapCard";

const STATS = [
  {
    label: "Véhicules disponibles",
    value: "12",
  },
  {
    label: "Véhicules en mission",
    value: "8",
  },
  {
    label: "Agents disponibles",
    value: "15",
  },
  {
    label: "Demandes en attente",
    value: "3",
    valueColor: "text-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <TransporteurTopbar />

      <div className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        {/* Statistiques */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <DashboardStatCard key={stat.label} {...stat} />
          ))}
        </div>


        <MissionsCard />
        
        <LoadingRequestsCard />
       

        {/* Carte */}
        <FleetMapCard />
      </div>
    </div>
  );
}
import TransporteurTopbar from "../../components/transporteur/dashboard/TransporteurTopbar";
import DashboardStatCard from "../../components/transporteur/dashboard/DashboardStatCard";
import MissionsCard from "../../components/transporteur/dashboard/MissionsCard";
import LoadingRequestsCard from "../../components/transporteur/dashboard/LoadingRequestsCard";
import FleetMapCard from "../../components/transporteur/dashboard/FleetMapCard";

import { useVehicules } from "../../hooks/useVehicules";
import { useAgents } from "../../hooks/useAgents";
import { useDemandesChargement } from "../../hooks/useDemandesChargement";
import { useMissions } from "../../hooks/useMissions";
import { useSuiviGeolocalisation } from "../../hooks/useSuiviGeolocalisation";

export default function DashboardPage() {
  // Récupère les véhicules du Responsable.
  const {
    vehicules,
    loading: loadingVehicules,
  } = useVehicules();

  // Récupère les agents du Responsable.
  const {
    agents,
    loading: loadingAgents,
  } = useAgents();

  // Récupère les demandes de chargement.
  const {
    demandesChargement,
    loading: loadingDemandes,
  } = useDemandesChargement();

  // Récupère les missions.
  const {
    missions,
    loading: loadingMissions,
  } = useMissions();

  // Récupère les dernières positions des véhicules.
  const {
    positions,
    loading: loadingPositions,
  } = useSuiviGeolocalisation();
  console.log("position",positions);
  

  // Nombre de véhicules disponibles.
  const nombreVehiculesDisponibles =
    vehicules.filter(
      (vehicule) =>
        vehicule.statut === "DISPONIBLE"
    ).length;

  // Nombre de véhicules actuellement en mission.
  const nombreVehiculesEnMission =
    vehicules.filter(
      (vehicule) =>
        vehicule.statut === "EN_MISSION"
    ).length;

  // Nombre d'agents disponibles.
  const nombreAgentsDisponibles =
    agents.filter(
      (agent) => agent.disponible === true
    ).length;

  // Nombre de demandes en attente.
  const nombreDemandesEnAttente =
    demandesChargement.filter(
      (demande) =>
        demande.statut === "PREVU"
    ).length;

  const STATS = [
    {
      label: "Véhicules disponibles",
      value: nombreVehiculesDisponibles,
    },
    {
      label: "Véhicules en mission",
      value: nombreVehiculesEnMission,
    },
    {
      label: "Agents disponibles",
      value: nombreAgentsDisponibles,
    },
    {
      label: "Demandes en attente",
      value: nombreDemandesEnAttente,
      valueColor: "text-orange-500",
    },
  ];

  const chargement =
    loadingVehicules ||
    loadingAgents ||
    loadingDemandes ||
    loadingMissions ||
    loadingPositions;

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <TransporteurTopbar />

      <div className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        {/* Statistiques */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <DashboardStatCard
              key={stat.label}
              {...stat}
            />
          ))}
        </div>

        {/* Missions */}
        <MissionsCard
          missions={missions}
          loading={loadingMissions}
        />

        {/* Demandes de chargement */}
        <LoadingRequestsCard
          demandes={demandesChargement}
          loading={loadingDemandes}
        />

        {/* Suivi des véhicules */}
        <FleetMapCard
          positions={positions}
          loading={loadingPositions}
        />
      </div>
    </div>
  );
}
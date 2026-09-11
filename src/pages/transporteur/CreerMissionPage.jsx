import MissionPageFooter from "../../components/transporteur/CreerMission/MissionPageFooter";
import MissionPageHeader from "../../components/transporteur/CreerMission/MissionPageHeader";
import MissionRequestSummary from "../../components/transporteur/CreerMission/MissionRequestSummary";
import ResourceAssignmentCard from "../../components/transporteur/CreerMission/ResourceAssignmentCard";



export default function CreerMissionPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <MissionPageHeader />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        <MissionRequestSummary />

        <ResourceAssignmentCard />
      </main>

      <MissionPageFooter />
    </div>
  );
}
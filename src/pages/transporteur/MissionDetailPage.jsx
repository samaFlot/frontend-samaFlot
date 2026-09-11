import MissionDetailHeader from "../../components/transporteur/MissionDetail/MissionDetailHeader";
import MissionInfoCard from "../../components/transporteur/MissionDetail/MissionInfoCard";

export default function MissionDetailPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <MissionDetailHeader />

      <main className="flex w-full flex-1 flex-col gap-6 overflow-y-auto p-6 sm:p-8">
        <MissionInfoCard />
      </main>
    </div>
  );
}
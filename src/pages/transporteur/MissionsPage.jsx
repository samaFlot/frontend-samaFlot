import MissionsPageHeader from "../../components/transporteur/Missions/MissionsPageHeader";
import MissionsFilters from "../../components/transporteur/Missions/MissionsFilters";
import MissionsTable from "../../components/transporteur/Missions/MissionsTable";

export default function MissionsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <MissionsPageHeader />

      <main className="flex w-full flex-1 flex-col gap-6 p-6 sm:p-8">
        <MissionsFilters />
        <MissionsTable />
      </main>
    </div>
  );
}
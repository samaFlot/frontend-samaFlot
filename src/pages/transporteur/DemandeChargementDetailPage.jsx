import DemandeDetailHeader from "../../components/transporteur/DemandesChargement/detail/DemandeDetailHeader";
import DemandeInfoCard from "../../components/transporteur/DemandesChargement/detail/DemandeInfoCard";
import MissionsCreatedSection from "../../components/transporteur/DemandesChargement/detail/MissionsCreatedSection";
import { useParams } from "react-router-dom";

export default function DemandeChargementDetailPage() {
    const { id } = useParams();
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <DemandeDetailHeader />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        <DemandeInfoCard />

        <MissionsCreatedSection demandeId={id} />
      </main>
    </div>
  );
}
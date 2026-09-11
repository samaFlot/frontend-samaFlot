import CtaSection from "../../components/public/CtaSection";
import MissionsManagementSection from "../../components/public/solution/MissionsManagementSection";
import PageHero from "../../components/public/solution/PageHero";
import RealTimeTrackingSection from "../../components/public/solution/RealTimeTrackingSection";
import SecuritySection from "../../components/public/solution/SecuritySection";
import VehiclesManagementSection from "../../components/public/solution/VehiclesManagementSection";

export default function Solutions() {
  return (
    <div className="flex w-full flex-col bg-gray-50">
      <PageHero />
      <VehiclesManagementSection />
      <RealTimeTrackingSection />
      <MissionsManagementSection />
      <SecuritySection />
      <CtaSection />
    </div>
  );
}

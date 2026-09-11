import ProfilHeader from "../../components/transporteur/Profil/ProfilHeader";
import SuccessMessage from "../../components/transporteur/Profil/SuccessMessage";
import PersonalInfoCard from "../../components/transporteur/Profil/PersonalInfoCard";
import CompanyInfoCard from "../../components/transporteur/Profil/CompanyInfoCard";
import SecurityCard from "../../components/transporteur/Profil/SecurityCard";
import LogoutButton from "../../components/transporteur/Profil/LogoutButton";

export default function ProfilPageTransporteur() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <ProfilHeader />

      <main className="flex w-full flex-1 flex-col items-center gap-6 overflow-y-auto p-6 sm:p-8">
        <SuccessMessage />

        <div className="flex w-full max-w-3xl flex-col gap-6 pb-12">
          <PersonalInfoCard />
          <CompanyInfoCard />
          <SecurityCard />
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}
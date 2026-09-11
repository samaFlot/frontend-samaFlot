import ProfilPageHeader from "../../components/admin/Profil/ProfilPageHeader";
import PersonalInfoCard from "../../components/admin/Profil/PersonalInfoCard";
import SecurityCard from "../../components/admin/Profil/SecurityCard";
import LogoutButton from "../../components/admin/Profil/LogoutButton";

export default function ProfilPage() {
  return (
    <div>
      <ProfilPageHeader />

      <div className="flex flex-1 justify-center px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex max-w-5xl flex-col gap-10">
          <PersonalInfoCard />
          <SecurityCard />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
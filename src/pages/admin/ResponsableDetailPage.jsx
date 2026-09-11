import AccountActionsCard from "../../components/admin/DetailResponsable/AccountActionsCard";
import ResponsableDetailHeader from "../../components/admin/DetailResponsable/ResponsableDetailHeader";
import ResponsableInfoCard from "../../components/admin/DetailResponsable/ResponsableInfoCard";


const RESPONSABLE = {
  company: "Sénégal Transports",
  status: "Actif",
  firstName: "Babacar",
  lastName: "Gueye",
  fullName: "Babacar Gueye",
  role: "Directeur des Opérations",
  phone: "+221 77 123 45 67",
  email: "b.gueye@sentrans.sn",
  avatar: "https://placehold.co/80x80",
};

export default function ResponsableDetailPage() {
  return (
    <>
      <ResponsableDetailHeader
        company={RESPONSABLE.company}
        status={RESPONSABLE.status}
      />

      <div className="flex w-full flex-1 gap-8 p-6 sm:p-8 lg:p-10">
        <ResponsableInfoCard
          firstName={RESPONSABLE.firstName}
          lastName={RESPONSABLE.lastName}
          fullName={RESPONSABLE.fullName}
          role={RESPONSABLE.role}
          phone={RESPONSABLE.phone}
          email={RESPONSABLE.email}
          avatar={RESPONSABLE.avatar}
        />

        <AccountActionsCard status={RESPONSABLE.status} />
      </div>
    </>
  );
}
import { useMemo, useState } from "react";
import ManagersFilters from "../../components/admin/Responsable/ManagersFilters";
import ManagersTable from "../../components/admin/Responsable/ManagersTable";
import Pagination from "../../components/admin/Responsable/Pagination";
import ResponsablePageHeader from "../../components/admin/Responsable/ResponsablesPageHeader";
import CreateResponsableDrawer from "../../components/admin/Responsable/CreateResponsableDrawer";

const COMPANIES = [
  {
    initials: "ST",
    company: "Sénégal Transports",
    city: "Dakar, Sénégal",
    manager: "Babacar Gueye",
    avatar: "https://placehold.co/32x32",
    phone: "+221 77 123 45 67",
    email: "b.gueye@sentrans.sn",
    status: "Actif",
    date: "15 Jan 2024",
  },
  {
    initials: "DL",
    company: "Dakar Logistique",
    city: "Pikine, Sénégal",
    manager: "Fatoumata Kane",
    avatar: "https://placehold.co/32x32",
    phone: "+221 78 544 32 10",
    email: "fkane@dakarlog.com",
    status: "Actif",
    date: "08 Jan 2024",
  },
  {
    initials: "TF",
    company: "Touba Fret S.A.",
    city: "Touba, Sénégal",
    manager: "Modou Mbacké",
    avatar: "https://placehold.co/32x32",
    phone: "+221 70 889 44 22",
    email: "mbacke@toubafret.sn",
    status: "Désactivé",
    date: "28 Dec 2023",
  },
  {
    initials: "SS",
    company: "Sahel Shipping",
    city: "Saint-Louis, Sénégal",
    manager: "Astou Faye",
    avatar: "https://placehold.co/32x32",
    phone: "+221 77 900 11 22",
    email: "afaye@sahelship.sn",
    status: "Actif",
    date: "20 Dec 2023",
  },
  {
    initials: "TC",
    company: "Teranga Cargo",
    city: "Thiès, Sénégal",
    manager: "Amadou Sow",
    avatar: "https://placehold.co/32x32",
    phone: "+221 76 455 11 00",
    email: "a.sow@teranga.sn",
    status: "Actif",
    date: "12 Dec 2023",
  },
  {
    initials: "NM",
    company: "Ndambane Messagerie",
    city: "Kaolack, Sénégal",
    manager: "Omar Tall",
    avatar: "https://placehold.co/32x32",
    phone: "+221 77 332 21 10",
    email: "omar.tall@ndambane.sn",
    status: "Désactivé",
    date: "05 Dec 2023",
  },
  {
    initials: "CS",
    company: "Casamance Shipping",
    city: "Ziguinchor, Sénégal",
    manager: "Safiétou Diallo",
    avatar: "https://placehold.co/32x32",
    phone: "+221 78 111 00 22",
    email: "sdiallo@casamance.sn",
    status: "Actif",
    date: "28 Nov 2023",
  },
  {
    initials: "GL",
    company: "Galsen Logistics",
    city: "Diamniadio, Sénégal",
    manager: "Ibrahima Ndiaye",
    avatar: "https://placehold.co/32x32",
    phone: "+221 77 665 44 33",
    email: "i.ndiaye@galsen.sn",
    status: "Actif",
    date: "15 Nov 2023",
  },
];

export default function ManagersPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous les statuts");
  const [page, setPage] = useState(1);

  const filteredCompanies = useMemo(() => {
    return COMPANIES.filter((c) => {
      const matchesSearch =
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.manager.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "Tous les statuts" || c.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const handleViewDetail = (company) => {
    console.log("Voir détail:", company);
  };

  return (
    <>
      <ResponsablePageHeader
        onCreateClick={() => setIsDrawerOpen(true)}
      />

      <div className="flex w-full flex-col gap-8 bg-gray-50 p-6 sm:p-10">
        <ManagersFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
          <ManagersTable
            companies={filteredCompanies}
            onViewDetail={handleViewDetail}
          />

          <Pagination
            currentPage={page}
            totalPages={3}
            onPageChange={setPage}
            rangeLabel="Affichage de 1 à 8 sur 142 responsables"
          />
        </div>
      </div>

      <CreateResponsableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
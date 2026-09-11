import { useMemo, useState } from "react";
import VehiclePageHeader from "../../components/transporteur/Vehicules/VehiclePageHeader";
import VehicleFilters from "../../components/transporteur/Vehicules/VehicleFilters";
import VehiclesTable from "../../components/transporteur/Vehicules/VehiclesTable";
import Pagination from "../../components/transporteur/Vehicules/Pagination";
import EditVehicleDrawer from "../../components/transporteur/Vehicules/EditVehicleDrawer";

const VEHICLES = [
  {
    id: 1,
    registration: "DK-1234-AB",
    type: "Semi-remorque",
    characteristics: "35t / 4m / 2.5m",
    status: "Disponible",
    weight: "35",
    height: "4",
    width: "2.5",
  },
  {
    id: 2,
    registration: "TH-8842-C",
    type: "Plateau",
    characteristics: "20t / 3.5m / 2.4m",
    status: "En mission",
    weight: "20",
    height: "3.5",
    width: "2.4",
  },
  {
    id: 3,
    registration: "SL-5512-B",
    type: "Porteur",
    characteristics: "12t / 3.2m / 2.2m",
    status: "Disponible",
    weight: "12",
    height: "3.2",
    width: "2.2",
  },
  {
    id: 4,
    registration: "DK-9901-XY",
    type: "Citerne",
    characteristics: "30k L / 3.8m / 2.5m",
    status: "En panne",
    weight: "30",
    height: "3.8",
    width: "2.5",
  },
  {
    id: 5,
    registration: "KL-2045-A",
    type: "Semi-remorque",
    characteristics: "35t / 4m / 2.5m",
    status: "En mission",
    weight: "35",
    height: "4",
    width: "2.5",
  },
  {
    id: 6,
    registration: "LG-7712-Z",
    type: "Plateau",
    characteristics: "25t / 3.8m / 2.4m",
    status: "Disponible",
    weight: "25",
    height: "3.8",
    width: "2.4",
  },
  {
    id: 7,
    registration: "DK-4456-EF",
    type: "Frigorifique",
    characteristics: "15t / 3.5m / 2.4m",
    status: "En mission",
    weight: "15",
    height: "3.5",
    width: "2.4",
  },
  {
    id: 8,
    registration: "DB-3321-K",
    type: "Citerne",
    characteristics: "28k L / 3.8m / 2.5m",
    status: "En panne",
    weight: "28",
    height: "3.8",
    width: "2.5",
  },
];

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous les statuts");
  const [type, setType] = useState("Tous les types");
  const [page, setPage] = useState(1);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      const matchesSearch = vehicle.registration
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "Tous les statuts" || vehicle.status === status;

      const matchesType =
        type === "Tous les types" || vehicle.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, status, type]);

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditDrawerOpen(true);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("Tous les statuts");
    setType("Tous les types");
    setPage(1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <VehiclePageHeader onAddVehicle={() => setIsEditDrawerOpen(true)} />

      <div className="flex w-full flex-1 flex-col gap-6 p-6 sm:p-8">
        <VehicleFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          type={type}
          onTypeChange={setType}
          onClear={handleClearFilters}
        />

        <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          <VehiclesTable
            vehicles={filteredVehicles}
            onEdit={handleEdit}
          />
        </div>

        <Pagination
          currentPage={page}
          totalPages={3}
          onPageChange={setPage}
          rangeLabel={`Affichage de 1 à ${Math.min(
            filteredVehicles.length,
            8
          )} sur 22 véhicules`}
        />
      </div>

      <EditVehicleDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
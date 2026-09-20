import { useState } from "react";

import VehiclePageHeader from "../../components/transporteur/Vehicules/VehiclePageHeader";
import VehicleFilters from "../../components/transporteur/Vehicules/VehicleFilters";
import VehiclesTable from "../../components/transporteur/Vehicules/VehiclesTable";
import EditVehicleDrawer from "../../components/transporteur/Vehicules/EditVehicleDrawer";

import { useVehicules } from "../../hooks/useVehicules";
import { usePagination } from "../../hooks/usePagination";

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous les statuts");
  const [type, setType] = useState("Tous les types");

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const {
    vehicules,
    loading,
    error,
    ajouterVehicule,
    mettreAJourVehicule,
    retirerVehicule,
  } = useVehicules();

  // Filtrage des véhicules.
  const filteredVehicles = vehicules.filter((vehicle) => {
    const matchesSearch = vehicle.immatriculation
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "Tous les statuts" ||
      vehicle.statut === status;

    return matchesSearch && matchesStatus
  });


  // Pagination : 8 véhicules par page, retour à la page 1
  // quand la recherche ou un filtre change
  const pagination = usePagination(
    filteredVehicles,
    8,
    `${search}|${status}|${type}`
  );

  // Ouvre le drawer en mode ajout.
  const handleAdd = () => {
    setSelectedVehicle(null);
    setIsEditDrawerOpen(true);
  };

  // Ouvre le drawer en mode modification.
  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditDrawerOpen(true);
  };

  // Ajoute un véhicule.
  const handleAddVehicle = async (donnees) => {
    const nouveauVehicule = await ajouterVehicule(donnees);

    if (nouveauVehicule) {
      setIsEditDrawerOpen(false);
    }
  };

  // Modifie un véhicule.
  const handleUpdateVehicle = async (vehicleId, donnees) => {
    const vehiculeModifie = await mettreAJourVehicule(
      vehicleId,
      donnees
    );

    if (vehiculeModifie) {
      setIsEditDrawerOpen(false);
      setSelectedVehicle(null);
    }
  };

  // Supprime un véhicule.
  const handleDelete = async (vehicleId) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce véhicule ?"
    );

    if (!confirmation) {
      return;
    }

    await retirerVehicule(vehicleId);
  };

  // Efface les filtres.
  const handleClearFilters = () => {
    setSearch("");
    setStatus("Tous les statuts");
    setType("Tous les types");
    setPage(1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <VehiclePageHeader onAddVehicle={handleAdd} />

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

        {loading && (
          <p className="text-sm text-slate-500">
            Chargement des véhicules...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          <VehiclesTable
            vehicles={pagination.pageItems}
            pagination={pagination}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <EditVehicleDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false);
          setSelectedVehicle(null);
        }}
        vehicle={selectedVehicle}
        onAdd={handleAddVehicle}
        onUpdate={handleUpdateVehicle}
      />
    </div>
  );
}
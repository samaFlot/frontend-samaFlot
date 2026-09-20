import { useState } from "react";

import DemandesPageHeader from "../../components/transporteur/DemandesChargement/DemandesPageHeader";
import DemandesFilters from "../../components/transporteur/DemandesChargement/DemandesFilters";
import DemandeCard from "../../components/transporteur/DemandesChargement/DemandeCard";
import CreateDemandeDrawer from "../../components/transporteur/DemandesChargement/CreateDemandeDrawer";

import { useDemandesChargement } from "../../hooks/useDemandesChargement";

export default function DemandesChargementPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous les statuts");

  const {
    demandesChargement,
    loading,
    error,
    ajouterDemande,
    annulerDemande,
  } = useDemandesChargement();

  // Ajouter une demande
  const handleAdd = async (donnees) => {
    const nouvelleDemande = await ajouterDemande(donnees);

    if (nouvelleDemande) {
      setIsDrawerOpen(false);
    }

    return nouvelleDemande;
  };

  // Filtrer les demandes
  const filteredDemandes = demandesChargement.filter((demande) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      demande.demandeur?.toLowerCase().includes(searchLower) ||
      demande.point_depart?.toLowerCase().includes(searchLower) ||
      demande.destination?.toLowerCase().includes(searchLower);

    const matchesStatus =
      status === "Tous les statuts" ||
      demande.statut === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <DemandesPageHeader onNewRequest={() => setIsDrawerOpen(true)} />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        <DemandesFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onClear={() => {
            setSearch("");
            setStatus("Tous les statuts");
          }}
        />

        {loading && (
          <p className="text-sm text-slate-500">
            Chargement des demandes...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredDemandes.map((demande) => (
            <DemandeCard
              key={demande.id}
              demande={demande}
              onCancel={annulerDemande}
            />
          ))}
        </section>
      </main>

      <CreateDemandeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
import { useState } from "react";

import ManagersFilters from "../../components/admin/Responsable/ManagersFilters";
import ManagersTable from "../../components/admin/Responsable/ManagersTable";
import Pagination from "../../components/admin/Responsable/Pagination";
import ResponsablePageHeader from "../../components/admin/Responsable/ResponsablesPageHeader";
import CreateResponsableDrawer from "../../components/admin/Responsable/CreateResponsableDrawer";

import { useResponsables } from "../../hooks/useResponsables";
import { usePagination } from "../../hooks/usePagination";

export default function ManagersPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Responsable choisi pour la modification (null = on crée un nouveau responsable)
  const [selectedResponsable, setSelectedResponsable] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous les statuts");

  // Les données viennent de l'API
  const {
    responsables,
    loading,
    error,
    ajouterResponsable,
    mettreAJourResponsable,
  } = useResponsables();

  // ----------------------------------------------------------
  // Recherche et filtre
  // ----------------------------------------------------------

  const filteredResponsables = responsables.filter((responsable) => {
    const texte = search.toLowerCase();

    // Recherche dans le nom de l'entreprise et le nom du responsable
    const correspondRecherche =
      responsable.nom_entreprise?.toLowerCase().includes(texte) ||
      responsable.prenom?.toLowerCase().includes(texte) ||
      responsable.nom?.toLowerCase().includes(texte);

    // Filtre sur le statut (la valeur du filtre est celle de la base)
    const correspondStatut =
      status === "Tous les statuts" ||
      responsable.statut_compte === status;

    return correspondRecherche && correspondStatut;
  });

  // ----------------------------------------------------------
  // Pagination : 8 responsables par page
  // ----------------------------------------------------------

  const pagination = usePagination(
    filteredResponsables,
    8,
    `${search}|${status}`
  );

  // ----------------------------------------------------------
  // Ouvrir et fermer le tiroir
  // ----------------------------------------------------------

  // Bouton « Créer » : tiroir vide
  const handleCreate = () => {
    setSelectedResponsable(null);
    setIsDrawerOpen(true);
  };

  // Crayon du tableau : tiroir rempli avec le responsable choisi
  const handleEdit = (responsable) => {
    setSelectedResponsable(responsable);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedResponsable(null);
  };

  // ----------------------------------------------------------
  // Enregistrer : créer ou modifier
  // ----------------------------------------------------------

  const handleAddResponsable = async (donnees) => {
    await ajouterResponsable(donnees);

    // Fermer le tiroir une fois le compte créé
    handleCloseDrawer();
  };

  const handleUpdateResponsable = async (id, donnees) => {
    await mettreAJourResponsable(id, donnees);

    // Fermer le tiroir une fois le compte modifié
    handleCloseDrawer();
  };

  return (
    <>
      <ResponsablePageHeader
        onCreateClick={handleCreate}
      />

      <div className="flex w-full flex-col gap-8 bg-gray-50 p-6 sm:p-10">
        <ManagersFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {loading && (
          <p className="text-sm text-gray-500">
            Chargement des responsables...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100">
          <ManagersTable
            responsables={pagination.pageItems}
            onEdit={handleEdit}
          />

          {/* La pagination n'apparaît que s'il y a des résultats */}
          {pagination.totalItems > 0 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              debut={pagination.debut}
              fin={pagination.fin}
              onPageChange={pagination.onPageChange}
              libelle="Responsables"
            />
          )}
        </div>
      </div>

      <CreateResponsableDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        responsable={selectedResponsable}
        onAdd={handleAddResponsable}
        onUpdate={handleUpdateResponsable}
      />
    </>
  );
}
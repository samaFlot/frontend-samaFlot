import { useState } from "react";

import DemandesPageHeader from "../../components/transporteur/DemandesChargement/DemandesPageHeader";
import DemandesFilters from "../../components/transporteur/DemandesChargement/DemandesFilters";
import DemandeCard from "../../components/transporteur/DemandesChargement/DemandeCard";
import DemandesPagination from "../../components/transporteur/DemandesChargement/DemandesPagination";
import CreateDemandeDrawer from "../../components/transporteur/DemandesChargement/CreateDemandeDrawer";

const DEMANDES = [
  {
    id: 1,
    client: "Amadou Kane",
    status: "Prévu",
    origin: "Dakar",
    destination: "Saint-Louis",
    date: "12 Oct. 2023",
    time: "08:30",
    vehicles: "2 VÉHICULES DEMANDÉS",
    description:
      "Transport de denrées périssables nécessitant un contrôle de température strict durant le…",
  },
  {
    id: 2,
    client: "Sokhna Mbaye",
    status: "Traité",
    origin: "Thiès",
    destination: "Mbour",
    date: "11 Oct. 2023",
    time: "14:15",
    vehicles: "1 VÉHICULE DEMANDÉ",
    description:
      "Livraison express de matériaux de construction pour le chantier de la nouvelle…",
  },
  {
    id: 3,
    client: "Ibrahima Fall",
    status: "Annulée",
    origin: "Dakar",
    destination: "Touba",
    date: "10 Oct. 2023",
    time: "10:00",
    vehicles: "3 VÉHICULES DEMANDÉS",
    description:
      "Demande annulée par le client en raison d’un report de la date de livraison des produits en…",
  },
  {
    id: 4,
    client: "Fatou Sow",
    status: "Prévu",
    origin: "Ziguinchor",
    destination: "Dakar",
    date: "15 Oct. 2023",
    time: "07:00",
    vehicles: "1 VÉHICULE DEMANDÉ",
    description:
      "Transfert de stocks saisonniers vers le hub central. Chargement à prévoir tôt le matin…",
  },
  {
    id: 5,
    client: "Omar Gueye",
    status: "Traité",
    origin: "Kaolack",
    destination: "Dakar",
    date: "09 Oct. 2023",
    time: "16:45",
    vehicles: "2 VÉHICULES DEMANDÉS",
    description:
      "Collecte de produits agricoles auprès des coopératives locales. Mission terminée avec…",
  },
  {
    id: 6,
    client: "Khadim Seck",
    status: "Prévu",
    origin: "Dakar",
    destination: "Louga",
    date: "14 Oct. 2023",
    time: "11:00",
    vehicles: "1 VÉHICULE DEMANDÉ",
    description:
      "Transport de mobilier de bureau pour la nouvelle agence régionale. Requiert une…",
  },
];

export default function DemandesChargementPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <DemandesPageHeader
      />

      <main className="flex w-full flex-1 flex-col gap-8 p-6 sm:p-8">
        <DemandesFilters onNewRequest={() => setIsDrawerOpen(true)} />

        <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {DEMANDES.map((demande) => (
            <DemandeCard
              key={demande.id}
              demande={demande}
            />
          ))}
        </section>

        <DemandesPagination />
      </main>

      <CreateDemandeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
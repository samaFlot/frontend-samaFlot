import { useState } from "react";

import RechercheVehicule from "./RechercheVehicule";
import FiltresVehicules from "./FiltresVehicules";

export default function PanneauVehicules({
  vehicules = [],
  loading = false,
  error = null,
}) {
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState("tous");

  const vehiculesFiltres = vehicules.filter((vehicule) => {
    const correspondRecherche =
      vehicule.immatriculation
        ?.toLowerCase()
        .includes(recherche.toLowerCase());

    const correspondFiltre =
      filtre === "tous" ||
      vehicule.statut === "EN_MISSION";

    return correspondRecherche && correspondFiltre;
  });

  const nombreEnMission = vehicules.filter(
    (vehicule) => vehicule.statut === "EN_MISSION"
  ).length;

  return (
    <div className="absolute left-4 top-4 z-[1000] w-[360px] overflow-hidden rounded-2xl bg-white shadow-xl">

      {/* En-tête */}
      <div className="border-b border-gray-200 p-5">
        <h1 className="text-xl font-semibold text-[#0F2A4A]">
          Véhicules
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Suivi en temps réel de votre flotte
        </p>
      </div>

      {/* Recherche */}
      <div className="p-4">
        <RechercheVehicule
          valeur={recherche}
          onChange={setRecherche}
        />
      </div>

      {/* Filtres */}
      <div className="px-4 pb-4">
        <FiltresVehicules
          filtre={filtre}
          onChange={setFiltre}
          nombreTotal={vehicules.length}
          nombreEnMission={nombreEnMission}
        />
      </div>

      {/* Liste des véhicules */}
      <div className="max-h-[calc(100vh-230px)] overflow-y-auto border-t border-gray-100">

        {loading && (
          <p className="p-4 text-sm text-gray-500">
            Chargement des véhicules...
          </p>
        )}

        {error && !loading && (
          <p className="p-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && vehiculesFiltres.length === 0 && (
          <p className="p-4 text-sm text-gray-500">
            Aucun véhicule est en mission.
          </p>
        )}

        {!loading &&
          !error &&
          vehiculesFiltres.map((vehicule) => (
            <div
              key={vehicule.id}
              className="cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#0F2A4A]">
                  {vehicule.immatriculation}
                </span>

                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                  {vehicule.statut}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
//React Leaflet + OpenStreetMap
//Leaflet est une bibliothèque JavaScript qui sert à créer des cartes interactives sur une page web.
//il permet:
//afficher une carte
// placer les véhicules
// zoomer / dézoomer
// déplacer la carte
// afficher les informations d'un véhicule

//OpenStreetMap fournit le fond de la carte : les routes, villes, rues, etc.
//Leaflet a besoin d'un fond de carte pour montrer les routes


import camion from "../../../assets/camion.svg";

import {
  LocateFixed,
} from "lucide-react";

import {
  // Conteneur principal qui crée et affiche la carte.
  MapContainer,

  // Permet d'afficher une petite fenêtre d'information
  // lorsqu'on clique sur un marqueur.
  Popup,

  // Affiche le fond de carte OpenStreetMap.
  TileLayer,

  // Permet d'accéder et de contrôler la carte Leaflet
  // depuis un composant situé dans le MapContainer.
  useMap,

  // Permet d'afficher un marqueur (ex : camion)
  // à une position précise sur la carte.
  Marker,

  Tooltip,
} from "react-leaflet";

// Charge les styles CSS nécessaires au fonctionnement et à l'affichage de Leaflet.
import "leaflet/dist/leaflet.css";
//objet principal de Leaflet pour pouvoir utiliser ses fonctionnalités
//par exemple pour créer une icône personnalisée avec L.icon()
import L from "leaflet";


// Centre initial de la carte sur Dakar.
const CENTRE_DAKAR = [
  14.7167,
  -17.4677,
];

  const iconeVehicule = L.icon({
  iconUrl: camion,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});


// le bouton qui permet de déplacer/recentrer la carte.
function BoutonRecentrer({ positions }) {
  //vient de React Leaflet et il sert à récupérer l'objet représentant la carte Leaflet actuellement affichée
  const map = useMap();

  const recentrer = () => {
    // S'il n'y a aucune position,
    // on revient simplement sur Dakar.
    if (!positions.length) {
      map.setView(CENTRE_DAKAR, 9);
      return;
    }

    // Crée une liste de coordonnées valides.
    const coordonnees = positions
      .filter(
        (position) =>
          position.latitude !== null &&
          position.longitude !== null
      )
      .map((position) => [
        Number(position.latitude),
        Number(position.longitude),
      ]);

    // S'il n'y a aucune coordonnée valide,
    // on revient sur Dakar.
    if (!coordonnees.length) {
      //setView sert simplement à déplacer la carte
      //Et le 9 est simplement le niveau de zoom
      map.setView(CENTRE_DAKAR, 9);
      return;
    }

    // Si plusieurs véhicules existent,
    // on adapte automatiquement la vue.
    if (coordonnees.length === 1) {
      map.setView(coordonnees[0], 12);
      return;
    }

    // Affiche tous les véhicules dans la carte.
    const bounds = coordonnees;

    //fitBounds() sert a ajuster la carte pour que tous ces points soient visibles
    map.fitBounds(bounds, {
      //Leaflet laisse environ 40 pixels de marge autour des points(position des vehicules)
      padding: [40, 40],
    });
  };

  return (
    <button
      type="button"
      aria-label="Centrer la carte"
      onClick={recentrer}
      className="flex size-10 items-center justify-center rounded-lg bg-white shadow-md"
    >
      <LocateFixed className="h-4 w-4 text-sky-950" />
    </button>
  );
}


export default function FleetMapCard({
  positions = [],
  loading = false,
}) {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      
      {/* En-tête */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-bold leading-6 text-sky-950">
          Aperçu de la flotte sur la carte
        </h2>

        <button
          type="button"
          className="text-sm font-semibold leading-5 text-orange-500"
        >
          Voir la carte complète →
        </button>
      </div>


      {/* Carte */}
      <div className="relative min-h-72 w-full overflow-hidden">
        <MapContainer
          center={CENTRE_DAKAR}
          zoom={9}
          //contrôle le zoom de la carte
          scrollWheelZoom={true}
          //Afficher les boutons + et − de zoom sur la carte
          zoomControl={true}
          className="h-[420px] w-full"
        >

          {/* Fond OpenStreetMap */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* Véhicules */}
          {!loading &&
            positions.map((position) => {
              const latitude = Number(
                position.latitude
              );

              const longitude = Number(
                position.longitude
              );

              // Ignore les positions invalides.
              if (
                Number.isNaN(latitude) ||
                Number.isNaN(longitude)
              ) {
                return null;
              }

              // Détermine la couleur selon le statut.
             // let couleur = "#0F2A4A";

              //if (
                //position.statut === "DISPONIBLE"
              //) {
                //couleur = "#10B981";
              //}

              //if (
                //position.statut === "EN_PANNE"
              //) {
               // couleur = "#F5821F";
              //}

              return (
                <Marker
                  key={position.id}
                  position={[
                    latitude,
                    longitude,
                  ]}
                  icon={iconeVehicule}
                >

                  <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -20]}
                  >
                    {position.immatriculation}
                  </Tooltip>
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-bold text-sky-950">
                        {position.immatriculation}
                      </p>

                      <p className="text-sm text-gray-600">
                        Statut :{" "}
                        {position.statut}
                      </p>

                      <p className="text-sm text-gray-600">
                        Latitude :{" "}
                        {latitude}
                      </p>

                      <p className="text-sm text-gray-600">
                        Longitude :{" "}
                        {longitude}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}


          {/* Bouton pour afficher tous les véhicules */}
          <div className="absolute right-4 top-4 z-[1000]">
            <BoutonRecentrer
              positions={positions}
            />
          </div>

        </MapContainer>


        {/* Chargement */}
        {loading && (
          <div className="absolute inset-0 z-[900] flex items-center justify-center bg-white/70">
            <p className="text-sm font-medium text-slate-500">
              Chargement des positions...
            </p>
          </div>
        )}


        {/* Aucun véhicule */}
        {!loading &&
          positions.length === 0 && (
            <div className="absolute left-1/2 top-1/2 z-[900] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-500 shadow-md">
              Aucune position disponible.
            </div>
          )}


        {/* Légende 
        <div className="absolute bottom-6 left-6 z-[1000] flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 bg-white p-3 shadow-md">

          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-slate-600">
              Disponible
            </span>
          </div>


          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-sky-950" />

            <span className="text-xs font-semibold text-slate-600">
              En mission
            </span>
          </div>


          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-orange-500" />

            <span className="text-xs font-semibold text-slate-600">
              En panne
            </span>
          </div>

        </div>*/}
      </div>
    </section>
  );
}
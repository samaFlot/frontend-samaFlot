import { LocateFixed, MapPin } from "lucide-react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import camion from "../../../../assets/camion.svg";


// Centre par défaut sur Dakar
const CENTRE_DAKAR = [
  14.7167,
  -17.4677,
];


// Icône du véhicule
const iconeVehicule = L.icon({
  iconUrl: camion,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});


// Bouton pour recentrer la carte
function BoutonRecentrer({ position }) {
  const map = useMap();

  const recentrer = () => {
    if (!position) {
      map.setView(CENTRE_DAKAR, 9);
      return;
    }

    const latitude = Number(position.latitude);
    const longitude = Number(position.longitude);

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      map.setView(CENTRE_DAKAR, 9);
      return;
    }

    map.setView(
      [latitude, longitude],
      14
    );
  };

  return (
    <button
      type="button"
      aria-label="Centrer le véhicule"
      onClick={recentrer}
      className="flex size-10 items-center justify-center rounded-lg bg-white shadow-md"
    >
      <LocateFixed className="h-4 w-4 text-sky-950" />
    </button>
  );
}


export default function EmplacementVehicule({
  emplacement,
}) {
  // Vérifier si une position existe
  const positionValide =
    emplacement &&
    emplacement.latitude !== null &&
    emplacement.latitude !== undefined &&
    emplacement.longitude !== null &&
    emplacement.longitude !== undefined;

  const latitude = positionValide
    ? Number(emplacement.latitude)
    : null;

  const longitude = positionValide
    ? Number(emplacement.longitude)
    : null;

  const coordonneesValides =
    positionValide &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);


  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

      {/* En-tête */}
      <div className="px-5 py-5 sm:px-6">
        <h2 className="text-base font-bold text-slate-800">
          Emplacement actuel
        </h2>
      </div>


      {/* Carte */}
      <div className="relative h-64 w-full overflow-hidden">

        <MapContainer
          center={
            coordonneesValides
              ? [latitude, longitude]
              : CENTRE_DAKAR
          }
          zoom={
            coordonneesValides
              ? 14
              : 9
          }
          scrollWheelZoom={true}
          zoomControl={true}
          className="h-full w-full"
        >

          {/* Fond OpenStreetMap */}
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* Véhicule */}
          {coordonneesValides && (
            <Marker
              position={[
                latitude,
                longitude,
              ]}
              icon={iconeVehicule}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-bold text-sky-950">
                    Position du véhicule
                  </p>

                  <p className="text-sm text-gray-600">
                    Latitude : {latitude}
                  </p>

                  <p className="text-sm text-gray-600">
                    Longitude : {longitude}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}


          {/* Bouton recentrer */}
          <div className="absolute right-4 top-4 z-[1000]">
            <BoutonRecentrer
              position={
                coordonneesValides
                  ? emplacement
                  : null
              }
            />
          </div>

        </MapContainer>


        {/* Aucune position */}
        {!coordonneesValides && (
          <div className="absolute inset-0 z-[900] flex items-center justify-center bg-white/70">
            <div className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-500 shadow-md">
              Aucune position disponible
            </div>
          </div>
        )}

      </div>


      {/* Informations de position */}
      <div className="p-5 sm:p-6">

        <div className="flex items-start gap-3">

          <MapPin
            size={18}
            className={`mt-1 shrink-0 ${
              coordonneesValides
                ? "text-orange-500"
                : "text-slate-400"
            }`}
          />

          <div>

            {coordonneesValides ? (
              <>

                {emplacement.date_envoi && (
                  <p className="mt-1 text-xs text-slate-500">
                    Dernière mise à jour :{" "}
                    {new Date(
                      emplacement.date_envoi
                    ).toLocaleString("fr-FR")}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-slate-800">
                  Position inconnue
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Aucune position GPS reçue pour ce véhicule.
                </p>
              </>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

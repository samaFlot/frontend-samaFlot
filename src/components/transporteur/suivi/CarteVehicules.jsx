import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import MarqueursVehicules from "./MarqueursVehicules";

const CENTRE_DAKAR = [14.7167, -17.4677];

export default function CarteVehicules({
  positions = [],
  loading = false,
}) {
  return (
    <MapContainer
      center={CENTRE_DAKAR}
      zoom={9}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarqueursVehicules
        positions={positions}
        loading={loading}
      />
    </MapContainer>
  );
}
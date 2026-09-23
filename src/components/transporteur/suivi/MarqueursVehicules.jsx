import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

import camion from "../../../assets/camion.svg";

import PopupVehicule from "./PopupVehicule";

const iconeVehicule = L.icon({
  iconUrl: camion,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

export default function MarqueursVehicules({
  positions = [],
  loading = false,
}) {
  if (loading) {
    return null;
  }

  return (
    <>
      {positions.map((position) => {
        const latitude = Number(position.latitude);
        const longitude = Number(position.longitude);

        if (
          Number.isNaN(latitude) ||
          Number.isNaN(longitude)
        ) {
          return null;
        }

        return (
          <Marker
            key={position.id}
            position={[latitude, longitude]}
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
              <PopupVehicule vehicule={position} />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
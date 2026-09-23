import CarteVehicules from "../../components/transporteur/suivi/CarteVehicules";
import PanneauVehicules from "../../components/transporteur/suivi/PanneauVehicules";
import { useSuiviGeolocalisation } from "../../hooks/useSuiviGeolocalisation";
import { useVehicules } from "../../hooks/useVehicules";


export default function SuiviVehicules() {
  const {
    vehicules,
    loading: chargementVehicules,
    error: erreurVehicules,
  } = useVehicules();

  const {
    positions,
    loading: chargementPositions,
    error: erreurPositions,
  } = useSuiviGeolocalisation();

  return (
    <div className="relative h-screen w-full">

      <CarteVehicules
        positions={positions}
        loading={chargementPositions}
      />

      <PanneauVehicules
        vehicules={vehicules}
        loading={chargementVehicules}
        error={erreurVehicules}
      />

    </div>
  );
}
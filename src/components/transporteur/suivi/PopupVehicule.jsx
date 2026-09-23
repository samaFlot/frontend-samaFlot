import { useNavigate } from "react-router-dom";

export default function PopupVehicule({ vehicule }) {
    const navigate = useNavigate();
  return (
    <div className="min-w-[220px]">
      <h3 className="font-semibold text-[#0F2A4A]">
        {vehicule.immatriculation}
      </h3>

      <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
        {vehicule.statut}
      </span>

      {vehicule.mission && (
        <>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>
              <strong>Agent :</strong>{" "}
              {vehicule.agent?.nom || "Aucun agent"}
            </p>

            <p>
              <strong>Mission :</strong>{" "}
              {vehicule.mission.depart} → {vehicule.mission.destination}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/transporteur/missions/${vehicule.mission.id}`)}
            className="mt-4 w-full rounded-lg bg-[#F5821F] px-3 py-2 text-sm font-medium text-white"
          >
            Voir la mission
          </button>
        </>
      )}
    </div>
  );
}
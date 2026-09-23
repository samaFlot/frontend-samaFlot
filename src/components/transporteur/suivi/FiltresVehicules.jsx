export default function FiltresVehicules({
  filtre,
  onChange,
  nombreTotal,
  nombreEnMission,
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("tous")}
        className={`rounded-full px-4 py-2 text-sm ${
          filtre === "tous"
            ? "bg-[#0F2A4A] text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        Tous ({nombreTotal})
      </button>

      <button
        type="button"
        onClick={() => onChange("en_mission")}
        className={`rounded-full px-4 py-2 text-sm ${
          filtre === "en_mission"
            ? "bg-[#0F2A4A] text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        En mission ({nombreEnMission})
      </button>
    </div>
  );
}
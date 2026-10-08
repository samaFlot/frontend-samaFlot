import { Info, Pencil } from "lucide-react";

export default function InformationsVehicule({ vehicule }) {
  return (
    <section className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info size={18} className="text-orange-500" />
          <h2 className="text-base font-bold text-slate-800">
            Informations du véhicule
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600">
          <Pencil size={15} />
          Modifier
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {/* Informations : 2 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          <Information
            label="Immatriculation"
            valeur={vehicule.immatriculation}
          />

          <Information
            label="Type de véhicule"
            valeur={vehicule.type_vehicule}
          />

          <Information
            label="Poids (Charge utile)"
            valeur={`${vehicule.poids} kg`}
          />

          <Information
            label="Kilométrage"
            valeur={`${vehicule.kilometrage ?? 0} km`}
          />
        </div>

        {/* Dimensions */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
            Dimensions
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Dimension
              label="Hauteur"
              valeur={`${vehicule.hauteur} m`}
            />

            <Dimension
              label="Largeur"
              valeur={`${vehicule.largeur} m`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Information({ label, valeur }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
        {label}
      </p>

      <p className="mt-1 text-base font-semibold text-slate-800">
        {valeur}
      </p>
    </div>
  );
}

function Dimension({ label, valeur }) {
  return (
    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-700">
        {valeur}
      </p>
    </div>
  );
}

import { Truck } from "lucide-react";

export default function ResumeVehicule({ vehicule }) {
  return (
    <section className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center min-w-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
            <Truck size={42} className="text-slate-400" />
          </div>

          <div className="ml-6 sm:ml-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Statut:
              </span>

              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {vehicule.statut}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                État technique:
              </span>

              <span className="px-3 py-1 bg-green-100 border border-green-200 text-green-700 rounded-full text-xs font-bold">
                {vehicule.etat_technique}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-8">

          <div className="lg:text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Kilométrage actuel
            </p>

            <p className="mt-1 text-base sm:text-lg font-bold text-slate-800">
              {vehicule.kilometrage ?? 0} km
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

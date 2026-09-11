import { ArrowRight } from "lucide-react";

export default function MissionRequestSummary() {
  return (
    <section className="w-full rounded-xl border-l-4 border-orange-500 bg-cyan-800/5 p-6">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        
        {/* Demandeur */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Demandeur
          </span>

          <span className="text-sm font-bold leading-5 text-sky-950">
            Grands Moulins de Dakar
          </span>
        </div>

        {/* Trajet */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Trajet
          </span>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold leading-5 tracking-tight text-sky-950">
              Dakar
            </span>

            <ArrowRight className="size-3.5 text-slate-400" />

            <span className="text-sm font-bold leading-5 tracking-tight text-sky-950">
              Thiès
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase leading-4 tracking-wide text-cyan-800">
            Date prévue
          </span>

          <span className="text-sm font-bold leading-5 text-sky-950">
            24 Oct 2023, 08:00
          </span>
        </div>
      </div>
    </section>
  );
}
import {
  Truck,
} from "lucide-react";

export default function MissionCreatedCard() {
  return (
    <article className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Icône */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Truck className="size-5 text-cyan-800" />
        </div>

        {/* Mission */}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
            Mission #MS-2023-084
          </p>

          <p className="text-sm font-bold text-sky-950">
            Véhicule DK-1234-AB
          </p>
        </div>

        <div className="hidden h-10 w-px bg-slate-100 sm:block" />

        {/* Agent */}
        <div className="flex items-center gap-3">
          <img
            src="https://placehold.co/32x32"
            alt="Modou Fall"
            className="size-8 rounded-full"
          />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
              Agent
            </p>

            <p className="text-sm font-semibold text-slate-700">
              Modou Fall
            </p>
          </div>
        </div>
      </div>

      {/* Statut */}
      <span className="w-fit shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-cyan-800">
        Prévu
      </span>
    </article>
  );
}
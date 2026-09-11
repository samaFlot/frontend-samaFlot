import { Truck } from "lucide-react";

export default function PendingMissionCard() {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-6 text-center">
      <Truck className="size-8 text-slate-400 opacity-50" />

      <p className="text-sm font-medium text-slate-400">
        Deuxième véhicule en attente de mission
      </p>

      <button
        type="button"
        className="text-xs font-bold tracking-tight text-orange-500"
      >
        Assigner maintenant
      </button>
    </article>
  );
}
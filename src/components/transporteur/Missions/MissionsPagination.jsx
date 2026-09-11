import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MissionsPagination() {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-slate-500">
        Affichage de 1 à 8 sur 124 missions
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white"
          aria-label="Page précédente"
        >
          <ChevronLeft className="size-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg bg-cyan-800 text-xs font-bold text-white"
        >
          1
        </button>

        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600"
        >
          2
        </button>

        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600"
        >
          3
        </button>

        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white"
          aria-label="Page suivante"
        >
          <ChevronRight className="size-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
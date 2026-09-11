import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium tracking-tight text-slate-500">
        Affichage de 1 à 8 sur 45 agents
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
          aria-label="Page précédente"
        >
          <ChevronLeft className="size-4" />
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg bg-sky-950 text-base font-bold text-white"
        >
          1
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-base text-slate-600"
        >
          2
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-base text-slate-600"
        >
          3
        </button>

        <span className="px-1 text-base text-slate-400">...</span>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-base text-slate-600"
        >
          6
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
          aria-label="Page suivante"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
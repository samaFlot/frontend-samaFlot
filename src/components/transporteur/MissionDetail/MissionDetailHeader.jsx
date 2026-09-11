import {
  ArrowLeft,
  Bell,
} from "lucide-react";

export default function MissionDetailHeader() {
  return (
    <header className="flex min-h-20 w-full items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-8">
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <h1 className="truncate text-xl font-bold leading-8 text-sky-950 sm:text-2xl">
            Grands Moulins de Dakar
          </h1>

          <span className="shrink-0 rounded-full border border-cyan-800/20 bg-cyan-800/10 px-3 py-1 text-xs font-bold uppercase tracking-tight text-cyan-800">
            Prévu
          </span>
        </div>
      </div>

      <div className="hidden items-center gap-6 lg:flex">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold tracking-tight text-slate-600"
          >
            Modifier
          </button>

          <button
            type="button"
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold tracking-tight text-white"
          >
            Annuler la mission
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">
            Moussa Diop
          </span>

          <img
            className="size-9 rounded-full border border-slate-200"
            src="https://placehold.co/36x36"
            alt="Moussa Diop"
          />
        </div>
      </div>
    </header>
  );
}
import {
  ArrowLeft,
  Bell,
} from "lucide-react";

export default function MissionPageHeader() {
  return (
    <header className="flex w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200"
          aria-label="Retour"
        >
          <ArrowLeft className="size-4 text-slate-600" />
        </button>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-8 text-sky-950">
            Créer une mission
          </h1>

          <p className="text-xs font-medium leading-4 text-slate-500">
            Affectation des ressources pour le transport
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <Bell className="size-5 text-slate-400" />

          <span className="size-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </div>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">
          <span className="hidden text-right text-xs font-bold text-slate-700 sm:block">
            Moussa Diop
          </span>

          <img
            src="https://placehold.co/36x36"
            alt="Moussa Diop"
            className="size-9 rounded-full border border-slate-200"
          />
        </div>
      </div>
    </header>
  );
}
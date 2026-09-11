import { ClipboardCheck } from "lucide-react";

export default function MissionPageFooter() {
  return (
    <footer className="flex w-full flex-col gap-3 border-t border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-end sm:px-12">
      <button
        type="button"
        className="px-8 py-3.5 text-sm font-bold tracking-tight text-slate-600"
      >
        Annuler
      </button>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-10 py-3.5 text-sm font-bold tracking-tight text-white shadow-sm"
      >
        <ClipboardCheck className="size-3.5" />

        Créer la mission
      </button>
    </footer>
  );
}
import { ClipboardCheck } from "lucide-react";

export default function MissionPageFooter({
  onCancel,
  onCreate,
  disabled,
  saving,
}) {
  return (
    <footer className="flex w-full flex-col gap-3 border-t border-slate-200 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-end sm:px-12">

      {/* Bouton Annuler */}
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="px-8 py-3.5 text-sm font-bold tracking-tight text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Annuler
      </button>

      {/* Bouton Créer la mission */}
      <button
        type="button"
        onClick={onCreate}
        disabled={disabled || saving}
        className={`inline-flex items-center justify-center gap-3 rounded-xl px-10 py-3.5 text-sm font-bold tracking-tight text-white shadow-sm ${
          disabled || saving
            ? "cursor-not-allowed bg-slate-300"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        <ClipboardCheck className="size-3.5" />

        {/* Pendant la requête, on informe l'utilisateur */}
        {saving ? "Création..." : "Créer la mission"}
      </button>
    </footer>
  );
}
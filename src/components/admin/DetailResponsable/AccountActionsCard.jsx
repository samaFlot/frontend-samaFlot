import {
  KeyRound,
  ShieldAlert,
  Trash2,
} from "lucide-react";

export default function AccountActionsCard({ status }) {
  const isDisabled = status === "Désactivé";

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-sky-950/5 p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-950">
          <ShieldAlert className="h-4 w-4 text-white" />
        </div>

        <h2 className="text-base font-bold leading-6 text-sky-950">
          Actions du compte
        </h2>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 p-6">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-medium leading-5 text-gray-500">
            Gérez les droits d'accès et le statut opérationnel de ce compte
            partenaire. Les modifications sont immédiates.
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-cyan-800 px-6 py-4 text-base font-bold leading-6 text-cyan-800 transition-colors hover:bg-cyan-800/5"
        >
          <KeyRound className="h-4 w-4" />
          Réinitialiser l'accès
        </button>

        <button
          type="button"
          disabled={isDisabled}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-red-700 px-6 py-4 text-base font-bold leading-6 text-red-700 transition-colors hover:bg-red-700/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShieldAlert className="h-4 w-4" />
          {isDisabled ? "Compte désactivé" : "Désactiver le compte"}
        </button>

        <div className="border-t border-gray-100 pt-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3 text-base font-semibold leading-6 text-gray-400 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer définitivement
          </button>
        </div>
      </div>
    </section>
  );
}
import {
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

// Icône et couleurs selon le type de popup
const VARIANTES = {
  danger: {
    icon: ShieldAlert,
    iconBg: "bg-red-700/10",
    iconColor: "text-red-700",
    button: "bg-red-700 hover:bg-red-800",
  },
  activate: {
    icon: ShieldCheck,
    iconBg: "bg-green-600/10",
    iconColor: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
  },
  reset: {
    icon: KeyRound,
    iconBg: "bg-cyan-800/10",
    iconColor: "text-cyan-800",
    button: "bg-cyan-800 hover:bg-cyan-900",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-green-600/10",
    iconColor: "text-green-600",
    button: "bg-sky-950 hover:bg-sky-900",
  },
  error: {
    icon: XCircle,
    iconBg: "bg-red-700/10",
    iconColor: "text-red-700",
    button: "bg-sky-950 hover:bg-sky-900",
  },
};

export default function ActionPopup({
  // Contenu du popup (null = popup fermé)
  popup,

  // Action en cours : les boutons sont bloqués
  loading = false,

  // Fermer le popup
  onClose,
}) {
  if (!popup) {
    return null;
  }

  const variante = VARIANTES[popup.variant] || VARIANTES.success;
  const Icon = variante.icon;

  // Un popup avec onConfirm demande une confirmation (2 boutons).
  // Sans onConfirm, c'est juste un message (1 bouton "Compris").
  const avecConfirmation = Boolean(popup.onConfirm);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fond sombre : un clic ferme le popup */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/50 backdrop-blur-sm"
      />

      {/* Carte */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
        {/* Icône */}
        <div
          className={`mx-auto flex size-16 items-center justify-center rounded-full ${variante.iconBg}`}
        >
          <Icon className={`size-8 ${variante.iconColor}`} />
        </div>

        {/* Titre et message */}
        <h3 className="mt-6 text-xl font-bold text-sky-950">
          {popup.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {popup.message}
        </p>

        {/* Boutons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
          {avecConfirmation ? (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={popup.onConfirm}
                disabled={loading}
                className={`flex-1 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variante.button}`}
              >
                {loading ? "Traitement..." : popup.confirmLabel}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors ${variante.button}`}
            >
              Compris
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
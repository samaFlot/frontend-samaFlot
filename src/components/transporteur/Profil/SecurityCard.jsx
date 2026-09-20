import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function SecurityCard({ onChangePassword }) {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Faire disparaître le message de succès après quelques secondes
  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccess("");
    }, 4000); // 4000 ms = 4 secondes

    // Annuler le minuteur si le composant est démonté
    // ou si un nouveau message arrive avant la fin
    return () => clearTimeout(timer);
  }, [success]);

  // Envoyer le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérifier les champs obligatoires
    if (!ancienMotDePasse || !nouveauMotDePasse || !confirmation) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Vérifier la confirmation avant d'appeler l'API
    if (nouveauMotDePasse !== confirmation) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      setSaving(true);

      await onChangePassword({
        ancien_mot_de_passe: ancienMotDePasse,
        nouveau_mot_de_passe: nouveauMotDePasse,
        confirmation,
      });

      setSuccess("Votre mot de passe a été modifié.");
      setAncienMotDePasse("");
      setNouveauMotDePasse("");
      setConfirmation("");
    } catch (err) {
      const data = err?.response?.data;

      let message = "Impossible de modifier le mot de passe.";

      if (data?.detail) {
        message = data.detail;
      } else if (data && typeof data === "object") {
        // Ex: { ancien_mot_de_passe: ["L'ancien mot de passe est incorrect."] }
        message = Object.values(data)
          .map((erreurs) =>
            Array.isArray(erreurs) ? erreurs.join(" ") : erreurs
          )
          .join(" ");
      }

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-8"
    >
      <h2 className="text-lg font-bold leading-7 text-sky-950">
        Sécurité
      </h2>

      {/* Messages */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <PasswordField
          label="Mot de passe actuel"
          value={ancienMotDePasse}
          onChange={setAncienMotDePasse}
          autoComplete="current-password"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PasswordField
            label="Nouveau mot de passe"
            value={nouveauMotDePasse}
            onChange={setNouveauMotDePasse}
            autoComplete="new-password"
          />

          <PasswordField
            label="Confirmer le nouveau mot de passe"
            value={confirmation}
            onChange={setConfirmation}
            autoComplete="new-password"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold leading-5 tracking-tight text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Modifier le mot de passe"}
        </button>
      </div>
    </form>
  );
}

function PasswordField({ label, value, onChange, autoComplete }) {
  // Afficher ou masquer le mot de passe
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
        {label}
      </label>

      <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-3">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-gray-900 outline-none"
        />

        <button
          type="button"
          onClick={() => setVisible((precedent) => !precedent)}
          className="ml-2 shrink-0 text-gray-400 transition hover:text-sky-950"
          aria-label={
            visible
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
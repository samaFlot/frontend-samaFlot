import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Save } from "lucide-react";

export default function SecurityCard({ onChangePassword }) {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Afficher ou masquer le mot de passe actuel
  const [voirAncien, setVoirAncien] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Faire disparaître le message de succès après 4 secondes
  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccess("");
    }, 4000);

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

      // Les noms des champs sont ceux attendus par Django
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
    <section className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-50 p-6 sm:p-8">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-950/10">
          <Lock className="h-5 w-5 text-sky-950" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold leading-7 tracking-tight text-sky-950">
            Sécurité
          </h2>

          <p className="text-sm leading-5 text-gray-400">
            Sécurisez votre compte.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 p-6 sm:p-8"
      >
        {/* Messages */}
        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            {success}
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Mot de passe actuel */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-semibold leading-5 text-gray-600"
            >
              Mot de passe actuel
            </label>

            <div className="relative">
              <input
                id="currentPassword"
                type={voirAncien ? "text" : "password"}
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 pr-12 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() => setVoirAncien((precedent) => !precedent)}
                aria-label={
                  voirAncien
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-sky-950"
              >
                {voirAncien ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Nouveau + confirmation */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold leading-5 text-gray-600"
              >
                Nouveau mot de passe
              </label>

              <input
                id="newPassword"
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                autoComplete="new-password"
                placeholder="Min. 8 caractères"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold leading-5 text-gray-600"
              >
                Confirmation du nouveau mot de passe
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirmez votre mot de passe"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-950 px-8 py-3 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement..." : "Modifier le mot de passe"}
          </button>
        </div>
      </form>
    </section>
  );
}
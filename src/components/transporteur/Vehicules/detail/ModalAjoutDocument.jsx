import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";

const typesDocument = [
  "Carte grise",
  "Assurance",
  "Visite technique",
];

const classeChamp =
  "w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

const classeLabel =
  "block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wide";

export default function ModalAjoutDocument({
  onFermer,
  onAjouter,
  document = null,
}) {
  const [formulaire, setFormulaire] = useState({
    type: document?.nom || "",
    numero: document?.numero || "",
    dateEmission: document?.dateEmissionISO || "",
    dateExpiration: document?.dateExpirationISO || "",
  });

  const [fichier, setFichier] = useState(null);
  const [survol, setSurvol] = useState(false);

  function modifierChamp(e) {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value,
    });
  }

  function choisirFichier(e) {
    setFichier(e.target.files[0] || null);
  }

  function deposerFichier(e) {
    e.preventDefault();

    setSurvol(false);

    setFichier(e.dataTransfer.files[0] || null);
  }

  function soumettre(e) {
    e.preventDefault();

    onAjouter({
      ...formulaire,
      fichier,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-sky-950/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onFermer}
    >
      <form
        role="dialog"
        aria-modal="true"
        onSubmit={soumettre}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* En-tête */}
        <div className="px-6 sm:px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {document ? "Modifier le document" : "Ajouter un document"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {document
                ? "Modifiez les informations du document administratif."
                : "Renseignez les détails du nouveau document administratif."}
            </p>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Champs */}
        <div className="px-6 sm:px-8 py-6 flex flex-col gap-5 overflow-y-auto">
          {/* Type */}
          <div>
            <label className={classeLabel}>
              Type de document
            </label>

            <select
              name="type"
              value={formulaire.type}
              onChange={modifierChamp}
              required
              className={classeChamp}
            >
              <option value="">
                Choisir un type...
              </option>

              {typesDocument.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Numéro */}
          <div>
            <label className={classeLabel}>
              Numéro du document
            </label>

            <input
              type="text"
              name="numero"
              value={formulaire.numero}
              onChange={modifierChamp}
              placeholder="Ex: CG-2023-001"
              className={classeChamp}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={classeLabel}>
                Date d&apos;émission
              </label>

              <input
                type="date"
                name="dateEmission"
                value={formulaire.dateEmission}
                onChange={modifierChamp}
                required
                className={classeChamp}
              />
            </div>

            <div>
              <label className={classeLabel}>
                Date d&apos;expiration
              </label>

              <input
                type="date"
                name="dateExpiration"
                value={formulaire.dateExpiration}
                onChange={modifierChamp}
                min={formulaire.dateEmission}
                required
                className={classeChamp}
              />
            </div>
          </div>

          {/* Fichier */}
          <div>
            <label className={classeLabel}>
              Document numérisé (PDF, JPG)
            </label>

            <label
              onDragOver={(e) => {
                e.preventDefault();
                setSurvol(true);
              }}
              onDragLeave={() => setSurvol(false)}
              onDrop={deposerFichier}
              className={`flex flex-col items-center gap-1 px-8 py-8 rounded-2xl border-2 border-dashed cursor-pointer text-center ${
                survol
                  ? "border-orange-500 bg-orange-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={choisirFichier}
                className="hidden"
                required={!document}
              />

              {fichier ? (
                <>
                  <FileText
                    size={32}
                    className="text-red-500"
                  />

                  <p className="text-sm font-semibold text-slate-700 break-all">
                    {fichier.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    Cliquez pour changer de fichier
                  </p>
                </>
              ) : document?.fichier ? (
                <>
                  <FileText
                    size={32}
                    className="text-red-500"
                  />

                  <p className="text-sm font-semibold text-slate-700 break-all">
                    {document.fichier}
                  </p>

                  <p className="text-xs text-slate-400">
                    Fichier actuel. Sélectionnez-en un autre pour le remplacer.
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    size={32}
                    className="text-slate-300"
                  />

                  <p className="text-sm font-semibold text-slate-600">
                    Glissez-déposez le fichier ici
                  </p>

                  <p className="text-xs text-slate-400">
                    ou cliquez pour parcourir vos fichiers
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Boutons */}
        <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onFermer}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20"
          >
            {document ? "Enregistrer les modifications" : "Ajouter le document"}
          </button>
        </div>
      </form>
    </div>
  );
}
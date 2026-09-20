import { Camera, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateAgentDrawer({
  isOpen,
  onClose,
  agent,
  onAdd,
  onUpdate,
}) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [numeroPermis, setNumeroPermis] = useState("");
  const [categoriePermis, setCategoriePermis] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = agent !== null;

  // Remplir le formulaire quand on modifie un agent
  useEffect(() => {
  if (agent) {
    setNom(agent.nom || "");
    setPrenom(agent.prenom || "");
    setTelephone(agent.telephone || "");
    setAdresse(agent.adresse || "");
    setEmail(agent.email || "");
    setNumeroPermis(agent.numero_permis || "");
    setCategoriePermis(agent.categorie_permis || "");
    setPhoto(null);
    setPhotoPreview(agent.photo || "");
  } else {
    setNom("");
    setPrenom("");
    setTelephone("");
    setAdresse("");
    setEmail("");
    setNumeroPermis("");
    setCategoriePermis("");
    setPhoto(null);
    setPhotoPreview("");
  }

  setError("");
}, [agent, isOpen]);

  // Sélection de la photo
  const handlePhotoChange = (e) => {
  const fichier = e.target.files?.[0];

  if (!fichier) {
    return;
  }

  if (photoPreview) {
    URL.revokeObjectURL(photoPreview);
  }

  setPhoto(fichier);
  setPhotoPreview(URL.createObjectURL(fichier));
};

  // Envoyer le formulaire
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Vérifier les champs obligatoires
  if (
    !nom.trim() ||
    !prenom.trim() ||
    !telephone.trim() ||
    !adresse.trim() ||
    !email.trim()
  ) {
    setError("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // FormData au lieu d'un objet JSON pour pouvoir envoyer le fichier
  const donnees = new FormData();
  donnees.append("nom", nom.trim());
  donnees.append("prenom", prenom.trim());
  donnees.append("telephone", telephone.trim());
  donnees.append("adresse", adresse.trim());
  donnees.append("email", email.trim());
  donnees.append("numero_permis", numeroPermis.trim());
  donnees.append("categorie_permis", categoriePermis.trim());

  // La photo n'est ajoutée que si l'utilisateur en a choisi une
  if (photo) {
    donnees.append("photo", photo); // "photo" = nom du champ côté Django
  }

  try {
    setSaving(true);

    if (isEdit) {
      await onUpdate(agent.id, donnees);
    } else {
      await onAdd(donnees);
    }
  } catch (err) {
    setError(
      err?.response?.data?.detail ||
        "Une erreur est survenue lors de l'enregistrement."
    );
  } finally {
    setSaving(false);
  }
};

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/60"
        aria-label="Fermer"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            {isEdit ? "Modifier un agent" : "Ajouter un agent"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Fermer"
          >
            <X className="size-5 text-slate-400" />
          </button>
        </div>

        {/* Corps */}
        <form
          id="agent-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8"
        >
          <div className="flex flex-col gap-8">
            {/* Erreur */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Identité */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Identité
                </h3>
              </div>

              {/* Photo */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-2 ring-slate-300">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Aperçu de la photo"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Camera className="mb-2 size-6 text-slate-300" />

                        <span className="text-[10px] font-medium text-slate-400">
                          Photo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Input fichier caché */}
                  <input
                    id="photo-agent"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />

                  {/* Bouton photo */}
                  <label
                    htmlFor="photo-agent"
                    className="absolute bottom-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-sky-950 ring-2 ring-white"
                    aria-label="Ajouter une photo"
                  >
                    <Camera className="size-3.5 text-white" />
                  </label>
                </div>
              </div>

              {/* Nom / Prénom */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Nom */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Nom *
                  </label>

                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Fall"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Prénom *
                  </label>

                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Ex: Modou"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>
              </div>
            </section>

            {/* Coordonnées */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Coordonnées
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {/* Téléphone */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Téléphone *
                  </label>

                  <div className="relative">
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="77 000 00 00"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-16 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                    />

                    <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                      <Phone className="size-4 text-slate-400" />

                      <span className="text-sm font-medium text-slate-400">
                        +221
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Email professionnel *
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m.fall@samaflot.sn"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>

                {/* Adresse */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Adresse *
                  </label>

                  <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    placeholder="Ex: Dakar"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>
              </div>
            </section>

            {/* Permis */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-500" />

                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Permis
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Numéro de permis */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Numéro de permis
                  </label>

                  <input
                    type="text"
                    value={numeroPermis}
                    onChange={(e) => setNumeroPermis(e.target.value)}
                    placeholder="Ex: SN123456"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>

                {/* Catégorie du permis */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Catégorie du permis
                  </label>

                  <input
                    type="text"
                    value={categoriePermis}
                    onChange={(e) => setCategoriePermis(e.target.value)}
                    placeholder="Ex: C"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-sky-900"
                  />
                </div>
              </div>
            </section>

            {/* Information accès */}
            {!isEdit && (
              <section className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs leading-5 text-slate-500">
                  Le mot de passe est généré automatiquement lors de la
                  création du compte et envoyé à l'agent par email.
                </p>
              </section>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              form="agent-form"
              disabled={saving}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Enregistrement..."
                : isEdit
                  ? "Enregistrer les modifications"
                  : "Enregistrer l'agent"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
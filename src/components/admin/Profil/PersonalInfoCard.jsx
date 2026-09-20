import { useEffect, useState } from "react";
import { Camera, Pencil, Save, UserRound } from "lucide-react";

// Champ modifiable (mode modification)
function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold leading-5 text-gray-600">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-base font-medium text-sky-950 outline-none transition-colors focus:border-orange-500 focus:bg-white"
      />
    </div>
  );
}

// Information affichée en lecture seule (mode consultation)
function InfoLine({ label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold leading-5 text-gray-600">
        {label}
      </span>

      <div className="w-full rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 text-base font-medium text-sky-950">
        {value || "—"}
      </div>
    </div>
  );
}

export default function PersonalInfoCard({ profil, onSave }) {
  // false = consultation, true = modification
  const [editing, setEditing] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  // photo = le fichier choisi, photoPreview = l'image affichée
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Remplir le formulaire avec les données du profil
  const remplirFormulaire = () => {
    setNom(profil?.last_name || "");
    setPrenom(profil?.first_name || "");
    setTelephone(profil?.telephone || "");
    setEmail(profil?.email || "");
    setPhoto(null);
    setPhotoPreview(profil?.photo || "");
  };

  useEffect(() => {
    if (profil) {
      remplirFormulaire();
    }
  }, [profil]);

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

  // Ouvrir le mode modification
  const handleEdit = () => {
    setSuccess("");
    setEditing(true);
  };

  // Annuler : remettre les valeurs d'origine et revenir à la consultation
  const handleCancel = () => {
    remplirFormulaire();
    setError("");
    setEditing(false);
  };

  // Choisir une photo
  const handlePhotoChange = (e) => {
    const fichier = e.target.files?.[0];

    if (!fichier) {
      return;
    }

    setPhoto(fichier);
    setPhotoPreview(URL.createObjectURL(fichier));
  };

  // Enregistrer les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérifier les champs obligatoires
    if (!nom.trim() || !prenom.trim() || !email.trim()) {
      setError("Le nom, le prénom et l'email sont obligatoires.");
      return;
    }

    // FormData : nécessaire pour envoyer une photo
    // Les noms des champs sont ceux attendus par Django
    const donnees = new FormData();
    donnees.append("last_name", nom.trim());
    donnees.append("first_name", prenom.trim());
    donnees.append("telephone", telephone.trim());
    donnees.append("email", email.trim());

    // La photo n'est envoyée que si l'utilisateur en a choisi une
    if (photo) {
      donnees.append("photo", photo);
    }

    try {
      setSaving(true);

      await onSave(donnees);

      // Retour à la consultation avec un message de succès
      setEditing(false);
      setSuccess("Vos informations ont été modifiées.");
    } catch (err) {
      const data = err?.response?.data;

      let message = "Impossible de modifier vos informations.";

      if (data?.detail) {
        message = data.detail;
      } else if (data && typeof data === "object") {
        // Ex: { email: ["Cet email est déjà utilisé."] }
        message = Object.entries(data)
          .map(([champ, erreurs]) =>
            `${champ} : ${Array.isArray(erreurs) ? erreurs.join(" ") : erreurs}`
          )
          .join(" | ");
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
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
          <UserRound className="h-5 w-5 text-orange-500" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            Informations personnelles
          </h2>

          <p className="text-sm leading-5 text-gray-400">
            Gérez les détails de votre identité et vos coordonnées.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-6 sm:p-8">
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

        {/* ------------------------------------------------------
            MODE CONSULTATION
            ------------------------------------------------------ */}
        {!editing && (
          <>
            {/* Photo de profil */}
            <div className="flex justify-center">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-full bg-gray-50 ring-2 ring-gray-200">
                {profil?.photo ? (
                  <img
                    src={profil.photo}
                    alt="Photo de profil"
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound className="size-10 text-gray-300" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <InfoLine label="Nom" value={profil?.last_name} />
              <InfoLine label="Prénom" value={profil?.first_name} />
              <InfoLine label="Téléphone" value={profil?.telephone} />
              <InfoLine label="Email" value={profil?.email} />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600 sm:w-auto"
              >
                <Pencil className="h-4 w-4" />
                Modifier mes informations
              </button>
            </div>
          </>
        )}

        {/* ------------------------------------------------------
            MODE MODIFICATION
            ------------------------------------------------------ */}
        {editing && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Photo de profil */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex size-28 items-center justify-center overflow-hidden rounded-full bg-gray-50 ring-2 ring-gray-200">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Photo de profil"
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-10 text-gray-300" />
                  )}
                </div>

                {/* Champ fichier caché : le bouton appareil photo l'ouvre */}
                <input
                  id="photo-profil-admin"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                <label
                  htmlFor="photo-profil-admin"
                  className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-orange-500 ring-2 ring-white transition-colors hover:bg-orange-600"
                  aria-label="Changer la photo"
                >
                  <Camera className="size-4 text-white" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Field label="Nom" value={nom} onChange={setNom} />

              <Field label="Prénom" value={prenom} onChange={setPrenom} />

              <Field
                label="Téléphone"
                type="tel"
                value={telephone}
                onChange={setTelephone}
              />

              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="w-full rounded-xl border border-gray-200 px-8 py-3 text-base font-bold leading-6 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 text-base font-bold leading-6 text-white shadow-sm transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <Save className="h-4 w-4" />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
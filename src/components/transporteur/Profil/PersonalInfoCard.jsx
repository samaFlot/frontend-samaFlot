import { useEffect, useState } from "react";

export default function PersonalInfoCard({ profil, onSave }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Remplir le formulaire avec les données du profil
  useEffect(() => {
    if (!profil) {
      return;
    }

    setNom(profil.last_name || "");
    setPrenom(profil.first_name || "");
    setTelephone(profil.telephone || "");
    setPhoto(null);
    setPhotoPreview(profil.photo || "");
  }, [profil]);

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

  // Si le profil n'est pas encore chargé, ne rien afficher.
  if (!profil) {
    return null;
  }

  // Photo de profil.
  const photoProfil =
    photoPreview || "https://placehold.co/88x88";

  // Sélection de la photo
  const handlePhotoChange = (e) => {
    const fichier = e.target.files?.[0];

    if (!fichier) {
      return;
    }

    // Libérer l'ancien aperçu s'il venait d'un fichier local
    if (photo && photoPreview) {
      URL.revokeObjectURL(photoPreview);
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
    if (!nom.trim() || !prenom.trim()) {
      setError("Le nom et le prénom sont obligatoires.");
      return;
    }

    // FormData pour pouvoir envoyer la photo
    const donnees = new FormData();
    donnees.append("last_name", nom.trim());
    donnees.append("first_name", prenom.trim());
    donnees.append("telephone", telephone.trim());

    // La photo n'est envoyée que si l'utilisateur en a choisi une
    if (photo) {
      donnees.append("photo", photo);
    }

    try {
      setSaving(true);

      await onSave(donnees);

      setSuccess("Vos informations ont été modifiées.");
    } catch (err) {
      const data = err?.response?.data;

      let message = "Impossible de modifier vos informations.";

      if (data?.detail) {
        message = data.detail;
      } else if (data && typeof data === "object") {
        // Ex: { telephone: ["Ce champ est obligatoire."] }
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-8 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold leading-7 text-sky-950">
          Informations personnelles
        </h2>

        {/* Photo de profil */}
        <div>
          <input
            id="photo-profil"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          <label
            htmlFor="photo-profil"
            className="group relative flex size-24 cursor-pointer overflow-hidden rounded-full border-4 border-gray-50"
          >
            <img
              className="size-full object-cover"
              src={photoProfil}
              alt="Photo de profil"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[10px] font-bold uppercase tracking-wide text-white">
                Changer
              </span>
            </span>
          </label>
        </div>
      </div>

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

      <div className="flex flex-col gap-5">
        {/* Nom */}
        <ProfileField
          label="Nom"
          value={nom}
          onChange={setNom}
        />

        {/* Prénom */}
        <ProfileField
          label="Prénom"
          value={prenom}
          onChange={setPrenom}
        />

        {/* Téléphone */}
        <ProfileField
          label="Téléphone"
          value={telephone}
          onChange={setTelephone}
        />

        {/* Email (non modifiable) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
            Email
          </label>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <input
              type="email"
              value={profil.email || ""}
              readOnly
              className="w-full cursor-not-allowed bg-transparent text-sm leading-5 text-gray-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold leading-5 tracking-tight text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

function ProfileField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
        {label}
      </label>

      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm leading-5 text-gray-900 outline-none"
        />
      </div>
    </div>
  );
}
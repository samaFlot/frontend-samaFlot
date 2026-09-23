import { useEffect, useState } from "react";
import {
  AlertCircle,
  Truck,
  X,
} from "lucide-react";

export default function EditVehicleDrawer({
  isOpen,
  onClose,
  vehicle,
  onAdd,
  onUpdate,
}) {
  const [immatriculation, setImmatriculation] = useState("");
  const [typeVehicule, setTypeVehicule] = useState("");
  const [poids, setPoids] = useState("");
  const [hauteur, setHauteur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [status, setStatus] = useState("DISPONIBLE");

  const [error, setError] = useState("");

  // true = modification
  // false = ajout
  const isEdit = vehicle !== null;

  // Remplit le formulaire lorsqu'on ouvre le drawer.
  useEffect(() => {
    if (vehicle) {
      setImmatriculation(
        vehicle.immatriculation || ""
      );

      setTypeVehicule(
        vehicle.type_vehicule || ""
      );

      setPoids(
        vehicle.poids || ""
      );

      setHauteur(
        vehicle.hauteur || ""
      );

      setLargeur(
        vehicle.largeur || ""
      );

      setStatus(
        vehicle.statut || "DISPONIBLE"
      );
    } else {
      // Formulaire vide pour un ajout.
      setImmatriculation("");
      setTypeVehicule("");
      setPoids("");
      setHauteur("");
      setLargeur("");
      setStatus("DISPONIBLE");
    }

    setError("");
  }, [vehicle, isOpen]);

  // Envoie le formulaire.
  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  const immatriculationVehicule = immatriculation.trim();
  const typeVehiculeSaisi = typeVehicule.trim();

  if (!immatriculationVehicule) {
    setError("Veuillez saisir l'immatriculation.");
    return;
  }

  if (!typeVehiculeSaisi) {
    setError("Veuillez saisir le type de véhicule.");
    return;
  }

  if (!poids) {
    setError("Veuillez saisir le poids.");
    return;
  }

  if (!hauteur) {
    setError("Veuillez saisir la hauteur.");
    return;
  }

  if (!largeur) {
    setError("Veuillez saisir la largeur.");
    return;
  }

  if (typeVehiculeSaisi.length < 2) {
    setError(
      "Le type de véhicule doit contenir au moins 2 caractères."
    );
    return;
  }

  const poidsNombre = Number(poids);
  const hauteurNombre = Number(hauteur);
  const largeurNombre = Number(largeur);

  if (poidsNombre <= 0) {
    setError("Le poids doit être un nombre supérieur à 0.");
    return;
  }

  if (hauteurNombre <= 0) {
    setError("La hauteur doit être un nombre supérieur à 0.");
    return;
  }

  if (largeurNombre <= 0) {
    setError("La largeur doit être un nombre supérieur à 0.");
    return;
  }

  const donnees = {
    immatriculation: immatriculationVehicule,
    type_vehicule: typeVehiculeSaisi,
    poids: poids,
    hauteur: hauteur,
    largeur: largeur,
  };

  if (isEdit) {
    donnees.statut = status;

    const resultat = await onUpdate(
      vehicle.id,
      donnees
    );

    if (resultat) {
      onClose();
    }
  } else {
    const resultat = await onAdd(donnees);

    if (resultat) {
      onClose();
    }
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
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-sky-950/60 backdrop-blur-[0.5px]"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <h2 className="text-xl font-bold leading-7 text-sky-950">
              {isEdit
                ? "Modifier le véhicule"
                : "Ajouter un véhicule"}
            </h2>

            <p className="mt-1 text-xs font-medium leading-4 tracking-tight text-slate-400">
              {isEdit
                ? `Référence : ${
                    vehicle?.immatriculation || ""
                  }`
                : "Ajouter un nouveau véhicule à votre flotte"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-50"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Contenu */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-10">

            {/* Erreur */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                <p className="text-sm font-medium leading-5 text-red-500">
                  {error}
                </p>
              </div>
            )}

            {/* Identification */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                  Identification
                </h3>
              </div>

              <div className="flex flex-col gap-6">

                {/* Immatriculation */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="registration"
                    className="text-xs font-semibold leading-5 tracking-tight text-slate-600"
                  >
                    Immatriculation
                  </label>

                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                    <Truck className="ml-4 h-4 w-4 shrink-0 text-slate-400" />

                    <input
                      id="registration"
                      type="text"
                      value={immatriculation}
                      onChange={(event) =>
                        setImmatriculation(
                          event.target.value
                        )
                      }
                      placeholder="DK-1234-AB"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base font-medium leading-6 text-sky-950 outline-none"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="vehicleType"
                    className="text-xs font-semibold leading-5 tracking-tight text-slate-600"
                  >
                    Type de véhicule
                  </label>

                  <div className="relative">
                    <Truck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      id="vehicleType"
                      type="text"
                      value={typeVehicule}
                      onChange={(event) =>
                        setTypeVehicule(
                          event.target.value
                        )
                      }
                      placeholder="Camion 35T"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-base font-medium leading-6 text-sky-950 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Caractéristiques */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                  Caractéristiques
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/* Poids */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="weight"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Poids (kg)
                  </label>

                  <input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={poids}
                    onChange={(event) =>
                      setPoids(event.target.value)
                    }
                    placeholder="12000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>

                {/* Hauteur */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="height"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Hauteur (m)
                  </label>

                  <input
                    id="height"
                    type="number"
                    min="0"
                    step="0.01"
                    value={hauteur}
                    onChange={(event) =>
                      setHauteur(event.target.value)
                    }
                    placeholder="3.50"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>

                {/* Largeur */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="width"
                    className="text-xs font-semibold leading-5 text-slate-600"
                  >
                    Largeur (m)
                  </label>

                  <input
                    id="width"
                    type="number"
                    min="0"
                    step="0.01"
                    value={largeur}
                    onChange={(event) =>
                      setLargeur(event.target.value)
                    }
                    placeholder="2.50"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-sky-950 outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </section>

            {/* Statut actuel */}
            {isEdit && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-1.5 shrink-0 rounded-full bg-orange-500" />

                  <h3 className="text-sm font-bold uppercase leading-5 tracking-wider text-slate-400">
                    Statut actuel
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Disponible */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                      status === "DISPONIBLE"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="DISPONIBLE"
                      checked={
                        status === "DISPONIBLE"
                      }
                      onChange={(event) =>
                        setStatus(
                          event.target.value
                        )
                      }
                      className="sr-only"
                    />

                    <span
                      className={`flex size-4 items-center justify-center rounded-full border-2 ${
                        status === "DISPONIBLE"
                          ? "border-emerald-500"
                          : "border-slate-300"
                      }`}
                    >
                      {status === "DISPONIBLE" && (
                        <span className="size-2 rounded-full bg-emerald-500" />
                      )}
                    </span>

                    <span
                      className={`text-base font-bold leading-6 ${
                        status === "DISPONIBLE"
                          ? "text-slate-600"
                          : "text-slate-400"
                      }`}
                    >
                      Disponible
                    </span>
                  </label>

                  {/* En panne */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                      status === "EN_PANNE"
                        ? "border-red-500 bg-red-50"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="EN_PANNE"
                      checked={
                        status === "EN_PANNE"
                      }
                      onChange={(event) =>
                        setStatus(
                          event.target.value
                        )
                      }
                      className="sr-only"
                    />

                    <span
                      className={`flex size-4 items-center justify-center rounded-full border-2 ${
                        status === "EN_PANNE"
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    >
                      {status === "EN_PANNE" && (
                        <span className="size-2 rounded-full bg-red-500" />
                      )}
                    </span>

                    <span
                      className={`text-base font-bold leading-6 ${
                        status === "EN_PANNE"
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      En panne
                    </span>
                  </label>
                </div>

                {/* Information */}
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                  <p className="text-xs font-medium leading-5 text-slate-500">
                    Si le véhicule est assigné à un trajet,
                    son statut passera automatiquement à{" "}
                    <span className="font-bold text-cyan-800">
                      En mission
                    </span>
                    .
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8">

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit
              ? "Enregistrer les modifications"
              : "Ajouter le véhicule"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </aside>
    </div>
  );
}
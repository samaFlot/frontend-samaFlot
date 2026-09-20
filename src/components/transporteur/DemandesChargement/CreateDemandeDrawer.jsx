import { useEffect, useState } from "react";
import {
  X,
  User,
  Truck,
  CalendarDays,
  Clock3,
  MapPin,
  ArrowDown,
  FileText,
} from "lucide-react";

export default function CreateDemandeDrawer({
  isOpen,
  onClose,
  onAdd,
}) {
  const [demandeur, setDemandeur] = useState("");
  const [nombreVehicules, setNombreVehicules] = useState("");
  const [dateChargement, setDateChargement] = useState("");
  const [heureChargement, setHeureChargement] = useState("");
  const [pointDepart, setPointDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Réinitialiser le formulaire à chaque ouverture
  useEffect(() => {
    if (isOpen) {
      setDemandeur("");
      setNombreVehicules("");
      setDateChargement("");
      setHeureChargement("");
      setPointDepart("");
      setDestination("");
      setDescription("");
      setError("");
    }
  }, [isOpen]);

  // Créer la demande
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérification des champs obligatoires
    if (
      !demandeur.trim() ||
      !nombreVehicules ||
      !dateChargement ||
      !heureChargement ||
      !pointDepart.trim() ||
      !destination.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const donnees = {
      demandeur: demandeur.trim(),
      nombre_vehicules_demandes: Number(nombreVehicules),
      date_chargement: dateChargement,
      heure_chargement: heureChargement,
      point_depart: pointDepart.trim(),
      destination: destination.trim(),
      description: description.trim(),
    };

    try {
      setSaving(true);

      const nouvelleDemande = await onAdd(donnees);

      if (nouvelleDemande) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur création demande :", error);

      setError(
        error?.response?.data?.detail ||
          "Une erreur est survenue lors de la création de la demande."
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
        className="absolute inset-0 bg-sky-950/40"
        aria-label="Fermer"
      />

      {/* Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-6 sm:px-8">
          <h2 className="text-xl font-bold leading-7 text-sky-950">
            Créer une demande de chargement
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Fermer"
          >
            <X className="size-5 text-gray-400" />
          </button>
        </div>

        {/* Corps */}
        <form
          id="demande-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8"
        >
          <div className="flex flex-col gap-6">

            {/* Erreur */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Demandeur */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<User className="size-4 text-orange-500/80" />}
                label="Demandeur *"
              />

              <input
                type="text"
                value={demandeur}
                onChange={(e) => setDemandeur(e.target.value)}
                placeholder="Ex: SONATEL"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>

            {/* Nombre de véhicules */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<Truck className="size-4 text-orange-500/80" />}
                label="Nombre de véhicules *"
              />

              <input
                type="number"
                min="1"
                value={nombreVehicules}
                onChange={(e) => setNombreVehicules(e.target.value)}
                placeholder="Ex: 2"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>

            {/* Date + Heure */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={
                    <CalendarDays className="size-4 text-orange-500/80" />
                  }
                  label="Date de chargement *"
                />

                <input
                  type="date"
                  value={dateChargement}
                  onChange={(e) => setDateChargement(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-sky-950"
                />
              </div>

              {/* Heure */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={
                    <Clock3 className="size-4 text-orange-500/80" />
                  }
                  label="Heure *"
                />

                <input
                  type="time"
                  value={heureChargement}
                  onChange={(e) => setHeureChargement(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-sky-950"
                />
              </div>
            </div>

            {/* Trajet */}
            <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8">

              {/* Départ */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={<MapPin className="size-4 text-green-600" />}
                  label="Point de départ *"
                />

                <input
                  type="text"
                  value={pointDepart}
                  onChange={(e) => setPointDepart(e.target.value)}
                  placeholder="Ex: Port Autonome de Dakar"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
                />
              </div>

              {/* Séparateur */}
              <div className="flex items-center">
                <div className="h-px flex-1 bg-gray-200" />

                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <ArrowDown className="size-4 text-gray-400" />
                </div>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel
                  icon={<MapPin className="size-4 text-orange-500" />}
                  label="Destination *"
                />

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Ex: Thiès"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                icon={<FileText className="size-4 text-orange-500/80" />}
                label="Description & Instructions"
              />

              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails du chargement, contraintes particulières..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-4 border-t border-gray-100 bg-gray-50 px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-6 py-3 text-sm font-semibold tracking-tight text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            type="submit"
            form="demande-form"
            disabled={saving}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileText className="size-4" />
            {saving ? "Création..." : "Créer la demande"}
          </button>
        </div>
      </aside>
    </div>
  );
}

function FieldLabel({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      {icon}

      <label className="text-sm font-semibold leading-5 tracking-tight text-gray-700">
        {label}
      </label>
    </div>
  );
}
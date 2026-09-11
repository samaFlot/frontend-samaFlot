import { Bell, Plus } from "lucide-react";

export default function VehiclePageHeader({ onAddVehicle }) {
  return (
    <header className="flex min-h-20 w-full items-center justify-between gap-6 border-b border-slate-200 bg-white px-6 py-4 sm:px-8">
      <h1 className="text-2xl font-bold leading-8 tracking-tight text-sky-950">
        Véhicules
      </h1>

      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={onAddVehicle}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Ajouter un véhicule
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center"
        >
          <Bell className="h-5 w-5 text-slate-400" />

          <span className="absolute right-1 top-0 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <img
          src="https://placehold.co/36x36"
          alt="Profil"
          className="size-9 rounded-full"
        />
      </div>
    </header>
  );
}
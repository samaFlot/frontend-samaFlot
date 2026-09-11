import { UserPlus, Bell } from "lucide-react";

export default function ResponsablePageHeader({ onCreateClick }) {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-slate-200 bg-white px-8">
      <h1 className="text-2xl font-bold tracking-tight text-sky-950">Liste des Transporteurs</h1>
      <div className="flex items-center gap-6">
        <button 
        type="button"
        onClick={onCreateClick}
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-orange-600">
          <UserPlus className="h-4 w-4" />
          Créer un compte
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex items-center justify-center"
        >
          <Bell className="h-5 w-5 text-slate-400" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <img
          className="size-9 rounded-full"
          src="https://placehold.co/36x36"
          alt="Profil"
        />
      </div>
    </header>
  );
}
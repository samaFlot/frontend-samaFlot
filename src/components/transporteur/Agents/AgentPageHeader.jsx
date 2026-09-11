import { UserPlus, Bell } from "lucide-react";

export default function AgentPageHeader({ onAddClick }) {
  return (
    <header className="flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
      <h1 className="text-2xl font-bold leading-8 tracking-tight text-sky-950">
        Agents
      </h1>

      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 sm:px-5 sm:text-base"
        >
          <UserPlus className="h-4 w-4" />
          <span>Ajouter un agent</span>
        </button>

        <button
          type="button"
          className="relative flex size-9 items-center justify-center sm:size-10"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-slate-400" />

          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <img
          src="https://placehold.co/36x36"
          alt="Profil"
          className="size-9 rounded-full sm:size-10"
        />
      </div>
    </header>
  );
}
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-6 sm:px-10">
      <h1 className="text-2xl font-bold tracking-tight text-sky-950">
        Tableau de bord
      </h1>
      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-full bg-gray-50"
        >
          <Bell className="h-4 w-4 text-gray-500" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-orange-500" />
        </button>
        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
          <img
            className="size-10 rounded-full"
            src="https://placehold.co/40x40"
            alt="Profil"
          />
        </div>
      </div>
    </header>
  );
}
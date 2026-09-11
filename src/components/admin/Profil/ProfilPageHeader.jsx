import { Bell } from "lucide-react";

export default function ProfilPageHeader() {
  return (
    <header className="flex min-h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-6 py-4 sm:px-10">
      <h1 className="text-2xl font-bold leading-8 text-sky-950">
        Profil
      </h1>

      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-full bg-gray-50"
        >
          <Bell className="h-4 w-4 text-gray-500" />

          <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="h-8 w-px bg-gray-100" />

        <img
          src="https://placehold.co/40x40"
          alt="Profil"
          className="size-10 rounded-full"
        />
      </div>
    </header>
  );
}
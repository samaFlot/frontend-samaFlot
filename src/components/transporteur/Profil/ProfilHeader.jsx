import { Bell } from "lucide-react";

export default function ProfilHeader() {
  return (
    <header className="flex min-h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-6 sm:px-8">
      <h1 className="text-2xl font-bold leading-8 text-sky-950">
        Profil
      </h1>

      <div className="flex items-center gap-6">
        <div className="relative flex items-center py-1">
          <Bell className="size-5 text-gray-500" />

          <span className="absolute -right-0.5 -top-1 size-2 rounded-full border-2 border-white bg-orange-500" />
        </div>

        <img
          className="size-10 rounded-full"
          src="https://placehold.co/40x40"
          alt="Moussa Diop"
        />
      </div>
    </header>
  );
}
import { Bell } from "lucide-react";

export default function ResponsableDetailHeader({
  company,
  status,
}) {
  return (
    <header className="flex min-h-20 w-full items-center justify-between gap-6 border-b border-gray-100 bg-white px-6 py-4 sm:px-10">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
        <div className="hidden h-6 w-px bg-gray-200 sm:block" />

        <div className="flex min-w-0 items-center gap-4">
          <h1 className="truncate text-xl font-bold leading-7 text-sky-950 sm:text-2xl">
            {company}
          </h1>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-xs font-bold uppercase tracking-tight text-green-600">
            <span className="size-1.5 rounded-full bg-green-600" />
            {status}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-full bg-gray-50"
        >
          <Bell className="h-4 w-4 text-gray-500" />

          <span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <img
          className="size-10 rounded-full"
          src="https://placehold.co/40x40"
          alt="Profil"
        />
      </div>
    </header>
  );
}
import {
  ArrowLeft,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DemandeDetailHeader() {
  return (
    <header className="flex w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          to="/transporteur/demandes-chargement"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight text-slate-500 hover:bg-slate-50"
        >
          <ArrowLeft className="size-4" />
          <span>Retour aux demandes</span>
        </Link>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <h1 className="truncate text-2xl font-bold leading-8 text-sky-950">
          Grands Moulins de Dakar
        </h1>

        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-cyan-800 sm:inline-flex">
          <span className="size-1.5 rounded-full bg-cyan-800" />
          Prévu
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4 sm:gap-6">
        <button
          type="button"
          className="relative flex size-8 items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="size-5 text-slate-400" />

          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <img
          src="https://placehold.co/36x36"
          alt="Profil"
          className="size-9 rounded-full"
        />
      </div>
    </header>
  );
}
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DemandesPagination() {
  return (
    <div className="flex w-full flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
      
      <p className="text-sm leading-5 tracking-tight text-gray-500">
        Affichage de{" "}
        <span className="font-semibold text-sky-950">6</span>{" "}
        sur{" "}
        <span className="font-semibold text-sky-950">42</span>{" "}
        demandes
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400"
          aria-label="Page précédente"
        >
          <ChevronLeft className="size-4" />
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg bg-sky-950 text-base font-semibold text-white"
        >
          1
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-base text-gray-600 hover:bg-gray-100"
        >
          2
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-base text-gray-600 hover:bg-gray-100"
        >
          3
        </button>

        <span className="px-2 text-base text-gray-400">
          ...
        </span>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-base text-gray-600 hover:bg-gray-100"
        >
          7
        </button>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400"
          aria-label="Page suivante"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
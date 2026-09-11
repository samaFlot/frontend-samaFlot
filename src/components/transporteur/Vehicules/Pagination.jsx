import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rangeLabel,
}) {
  return (
    <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium leading-5 tracking-tight text-slate-500">
        {rangeLabel}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Page précédente"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 text-slate-400" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex size-10 items-center justify-center rounded-lg text-base font-bold ${
                currentPage === page
                  ? "bg-sky-950 text-white"
                  : "border border-slate-200 text-slate-600"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Page suivante"
          className="flex size-10 items-center justify-center rounded-lg border border-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
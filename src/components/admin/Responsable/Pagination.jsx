import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange, rangeLabel }) {
  const pages = [1, 2, 3];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row">
      <span className="text-sm font-medium text-gray-500">{rangeLabel}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex size-10 items-center justify-center rounded-lg bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 disabled:opacity-40"
        >
          <ChevronLeft className="h-3 w-3 text-gray-400" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex size-10 items-center justify-center rounded-lg text-sm font-bold ${
              p === currentPage
                ? "bg-cyan-800 text-white"
                : "bg-white text-gray-500 outline outline-1 outline-offset-[-1px] outline-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex size-10 items-center justify-center rounded-lg bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 disabled:opacity-40"
        >
          <ChevronRight className="h-3 w-3 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
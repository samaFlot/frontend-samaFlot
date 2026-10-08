import {
  ChevronRight,
  FileText,
} from "lucide-react";

export default function DocumentsActifs({
  documents = [],
}) {
  // On affiche uniquement les documents valides
  const documentsValides = documents.filter(
    (document) => document.statut === "VALIDE"
  );

  return (
    <section className="w-full bg-sky-950 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">
          Documents actifs
        </h2>

        <span className="px-2 py-0.5 bg-white/20 rounded-sm text-[10px] font-bold text-white uppercase">
          {documentsValides.length} valides
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {documentsValides.length > 0 ? (
          documentsValides.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center min-w-0">
                <div className="w-8 h-8 shrink-0 bg-white/10 rounded flex items-center justify-center">
                  <FileText
                    size={15}
                    className="text-white"
                  />
                </div>

                <div className="ml-3 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {document.type_document}
                  </p>

                  <p className="text-[10px] text-white/60 mt-1">
                    Expire le{" "}
                    {new Date(
                      document.date_expiration
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={15}
                className="text-white/30 shrink-0"
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-white/60">
            Aucun document valide.
          </p>
        )}
      </div>
    </section>
  );
}

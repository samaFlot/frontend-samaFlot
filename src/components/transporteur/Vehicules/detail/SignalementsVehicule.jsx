import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

const LIGNES_PAR_PAGE = 4;

const styleStatut = {
  "À traiter": "bg-orange-100 text-orange-500",
  "En cours": "bg-blue-100 text-blue-500",
  Résolu: "bg-green-100 text-green-700",

  // Au cas où ton API utilise ces valeurs
  A_TRAITER: "bg-orange-100 text-orange-500",
  EN_COURS: "bg-blue-100 text-blue-500",
  RESOLU: "bg-green-100 text-green-700",
};

const classeChamp =
  "w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

const classeLabel =
  "block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wide";

export default function SignalementsVehicule({
  signalements = [],
  onVoir,
}) {
  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  // Liste des types de problème envoyés par l'API
  const types = [
    ...new Set(
      signalements
        .map((s) => s.type_probleme)
        .filter(Boolean)
    ),
  ];

  // Recherche
  const texte = recherche.toLowerCase();

  const signalementsFiltres = signalements.filter((s) => {
    const typeProbleme = String(
      s.type_probleme || ""
    ).toLowerCase();

    const id = String(s.id || "").toLowerCase();

    const correspondRecherche =
      typeProbleme.includes(texte) ||
      id.includes(texte);

    const correspondStatut =
      statut === "" || s.statut === statut;

    const correspondType =
      type === "" || s.type_probleme === type;

    return (
      correspondRecherche &&
      correspondStatut &&
      correspondType
    );
  });

  // Pagination
  const total = signalementsFiltres.length;

  const nbPages = Math.max(
    1,
    Math.ceil(total / LIGNES_PAR_PAGE)
  );

  const debut =
    (page - 1) * LIGNES_PAR_PAGE;

  const signalementsAffiches =
    signalementsFiltres.slice(
      debut,
      debut + LIGNES_PAR_PAGE
    );

  // Quand un filtre change, revenir à la première page
  function changerFiltre(setter, valeur) {
    setter(valeur);
    setPage(1);
  }

  // Affichage lisible du statut
  function afficherStatut(valeur) {
    if (valeur === "A_TRAITER") return "À traiter";
    if (valeur === "EN_COURS") return "En cours";
    if (valeur === "RESOLU") return "Résolu";

    return valeur || "Inconnu";
  }

  return (
    <div className="w-full min-w-0 flex flex-col gap-6">

      {/* Filtres */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Recherche */}
          <div>
            <label className={classeLabel}>
              Rechercher
            </label>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={recherche}
                onChange={(e) =>
                  changerFiltre(
                    setRecherche,
                    e.target.value
                  )
                }
                placeholder="ID, Type de problème..."
                className={`${classeChamp} pl-11`}
              />
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className={classeLabel}>
              Statut
            </label>

            <div className="relative">
              <select
                value={statut}
                onChange={(e) =>
                  changerFiltre(
                    setStatut,
                    e.target.value
                  )
                }
                className={`${classeChamp} appearance-none pr-10`}
              >
                <option value="">
                  Tous les statuts
                </option>

                <option value="À traiter">
                  À traiter
                </option>

                <option value="En cours">
                  En cours
                </option>

                <option value="Résolu">
                  Résolu
                </option>
              </select>

              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className={classeLabel}>
              Type de problème
            </label>

            <div className="relative">
              <select
                value={type}
                onChange={(e) =>
                  changerFiltre(
                    setType,
                    e.target.value
                  )
                }
                className={`${classeChamp} appearance-none pr-10`}
              >
                <option value="">
                  Tous les types
                </option>

                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead className="bg-slate-50 border-b border-slate-100">

              <tr>
                <Th>ID</Th>
                <Th>Type de problème</Th>
                <Th>Date</Th>
                <Th>Statut</Th>
                <Th className="text-right">
                  Actions
                </Th>
              </tr>

            </thead>

            <tbody>

              {signalementsAffiches.map((s) => {

                const statutAffiche =
                  afficherStatut(s.statut);

                const classeStatut =
                  styleStatut[s.statut] ||
                  "bg-slate-100 text-slate-600";

                return (
                  <tr
                    key={s.id}
                    className="border-t border-slate-100"
                  >

                    {/* ID */}
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-700">
                        #{s.id}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {s.type_probleme || "-"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {s.date_creation
                        ? new Date(
                            s.date_creation
                          ).toLocaleDateString(
                            "fr-FR"
                          )
                        : "-"}
                    </td>

                    {/* Statut */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${classeStatut}`}
                      >
                        {statutAffiche}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() => onVoir(s)}
                          title="Voir le signalement"
                          aria-label="Voir le signalement"
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                        >
                          <Eye size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

              {/* Aucun résultat */}
              {signalementsAffiches.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Aucun signalement trouvé.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="px-6 py-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-sm text-slate-500">
            {total === 0
              ? "0 signalement"
              : `Affichage de ${debut + 1} à ${
                  debut +
                  signalementsAffiches.length
                } sur ${total} signalements`}
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                setPage(page - 1)
              }
              disabled={page === 1}
              aria-label="Page précédente"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from(
              { length: nbPages },
              (_, i) => i + 1
            ).map((numero) => (
              <button
                key={numero}
                type="button"
                onClick={() =>
                  setPage(numero)
                }
                className={`w-9 h-9 rounded-lg text-sm font-bold ${
                  numero === page
                    ? "bg-orange-500 text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {numero}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setPage(page + 1)
              }
              disabled={page === nbPages}
              aria-label="Page suivante"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}) {
  return (
    <th
      className={`px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wide ${className}`}
    >
      {children}
    </th>
  );
}

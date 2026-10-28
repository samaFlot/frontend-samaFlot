import { useState } from "react";

import {
  FileText,
  Pencil,
  Trash2,
  Download,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import ModalAjoutDocument from "./ModalAjoutDocument";
import { useDocuments } from "../../../../hooks/useDocuments";

// Style du badge selon le statut
const styleStatut = {
  Valide: {
    badge: "bg-green-100 text-green-700",
    point: "bg-green-500",
  },

  "Expire bientôt": {
    badge: "bg-orange-100 text-orange-700",
    point: "bg-orange-500",
  },

  Expiré: {
    badge: "bg-red-100 text-red-700",
    point: "bg-red-500",
  },
};

// Couleur de l'icône selon le type de document
const styleIcone = {
  "Carte grise": "bg-blue-50 text-blue-600",
  Assurance: "bg-indigo-50 text-indigo-600",
  "Visite technique": "bg-orange-50 text-orange-500",
};

// "2026-05-12" -> "12/05/2026"
function formaterDate(date) {
  if (!date) return "-";

  const [annee, mois, jour] = date.split("-");

  return `${jour}/${mois}/${annee}`;
}

// Statut backend -> statut affiché
function formaterStatut(statut) {
  if (statut === "VALIDE") {
    return "Valide";
  }

  if (statut === "EXPIRE_BIENTOT") {
    return "Expire bientôt";
  }

  if (statut === "EXPIRE") {
    return "Expiré";
  }

  return "-";
}

// Document backend -> format utilisé par le tableau
function adapterDocument(document) {
  return {
    id: document.id,

    nom: document.type_document,

    numero: document.numero_document,

    dateEmission: formaterDate(document.date_emission),

    dateExpiration: formaterDate(document.date_expiration),

    // On conserve les dates originales pour le formulaire de modification.
    dateEmissionISO: document.date_emission,

    dateExpirationISO: document.date_expiration,

    fichier: document.fichier
      ? document.fichier.split("/").pop()
      : "",

    statut: formaterStatut(document.statut),
  };
}

export default function DocumentsVehicule({
  documents = [],
  vehiculeId,
}) {
  const [liste, setListe] = useState(
    documents.map(adapterDocument)
  );

  const [modalOuvert, setModalOuvert] = useState(false);

  const [documentEnEdition, setDocumentEnEdition] = useState(null);

  const {
    loading,
    error,
    ajouterNouveauDocument,
    modifierDocumentExistant,
    supprimerDocumentExistant,
    telechargerDocumentExistant,
  } = useDocuments();

  // Ajouter un document
  async function ajouterDocument(donnees) {
    if (!vehiculeId) {
      console.error(
        "Impossible d'ajouter le document : vehiculeId manquant."
      );
      return;
    }

    if (!donnees.fichier) {
      console.error(
        "Impossible d'ajouter le document : fichier manquant."
      );
      return;
    }

    const nouveauDocument = await ajouterNouveauDocument(
      vehiculeId,
      {
        type_document: donnees.type,
        numero_document: donnees.numero,
        date_emission: donnees.dateEmission,
        date_expiration: donnees.dateExpiration,
        fichier: donnees.fichier,
      }
    );

    if (!nouveauDocument) {
      return;
    }

    const documentAdapte = adapterDocument(nouveauDocument);

    setListe((ancienneListe) => [
      ...ancienneListe,
      documentAdapte,
    ]);

    setModalOuvert(false);
  }

  // Modifier un document
  async function modifierDocument(donnees) {
    if (!documentEnEdition) {
      return;
    }

    const documentModifie = await modifierDocumentExistant(
      documentEnEdition.id,
      {
        type_document: donnees.type,
        numero_document: donnees.numero,
        date_emission: donnees.dateEmission,
        date_expiration: donnees.dateExpiration,
        fichier: donnees.fichier,
      }
    );

    if (!documentModifie) {
      return;
    }

    const documentAdapte = adapterDocument(documentModifie);

    setListe((ancienneListe) =>
      ancienneListe.map((document) =>
        document.id === documentAdapte.id
          ? documentAdapte
          : document
      )
    );

    setModalOuvert(false);
    setDocumentEnEdition(null);
  }

  // Ouvrir le formulaire de modification
  function ouvrirModification(document) {
    setDocumentEnEdition(document);
    setModalOuvert(true);
  }

  // Supprimer un document
  async function supprimerDocument(document) {
    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer le document "${document.nom}" ?`
    );

    if (!confirmation) {
      return;
    }

    const suppressionReussie = await supprimerDocumentExistant(
      document.id
    );

    if (!suppressionReussie) {
      return;
    }

    setListe((ancienneListe) =>
      ancienneListe.filter(
        (element) => element.id !== document.id
      )
    );
  }

  // Télécharger un document
  async function telechargerFichier(document) {
    const fichier = await telechargerDocumentExistant(document.id);

    if (!fichier) {
      return;
    }

    const url = window.URL.createObjectURL(fichier);
    const lien = window.document.createElement("a");

    lien.href = url;
    lien.download = document.fichier || `document-${document.id}`;

    window.document.body.appendChild(lien);
    lien.click();
    lien.remove();

    window.URL.revokeObjectURL(url);
  }

  // Fermer le formulaire
  function fermerModal() {
    setModalOuvert(false);
    setDocumentEnEdition(null);
  }

  // Statistiques
  const nbValides = liste.filter(
    (document) => document.statut === "Valide"
  ).length;

  const nbBientot = liste.filter(
    (document) => document.statut === "Expire bientôt"
  ).length;

  const nbExpires = liste.filter(
    (document) => document.statut === "Expiré"
  ).length;

  return (
    <div className="w-full min-w-0 flex flex-col gap-6">

      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Documents du véhicule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les pièces administratives et les certificats obligatoires.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDocumentEnEdition(null);
            setModalOuvert(true);
          }}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 disabled:opacity-50"
        >
          <Plus size={16} />

          {loading
            ? "Opération en cours..."
            : "Ajouter un document"}
        </button>
      </div>

      {/* Erreur */}
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">

            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <Th>Type de document</Th>
                <Th>Numéro</Th>
                <Th>Date d&apos;émission</Th>
                <Th>Date d&apos;expiration</Th>
                <Th>Fichier</Th>
                <Th>Statut</Th>
                <Th className="text-right">
                  Actions
                </Th>
              </tr>
            </thead>

            <tbody>
              {liste.length > 0 ? (
                liste.map((doc) => {
                  const statut = styleStatut[doc.statut] || {
                    badge: "bg-slate-100 text-slate-600",
                    point: "bg-slate-400",
                  };

                  const icone =
                    styleIcone[doc.nom] ||
                    "bg-slate-100 text-slate-500";

                  return (
                    <tr
                      key={doc.id}
                      className="border-t border-slate-50"
                    >

                      {/* Type */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${icone}`}
                          >
                            <FileText size={16} />
                          </div>

                          <span className="font-bold text-slate-700">
                            {doc.nom}
                          </span>
                        </div>
                      </td>

                      {/* Numéro */}
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        {doc.numero || "-"}
                      </td>

                      {/* Date émission */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {doc.dateEmission || "-"}
                      </td>

                      {/* Date expiration */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {doc.dateExpiration || "-"}
                      </td>

                      {/* Fichier */}
                      <td className="px-6 py-5">
                        {doc.fichier ? (
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <FileText
                              size={16}
                              className="text-red-500 shrink-0"
                            />

                            <span className="max-w-[180px] truncate">
                              {doc.fichier}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">
                            -
                          </span>
                        )}
                      </td>

                      {/* Statut */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statut.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statut.point}`}
                          />

                          {doc.statut}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-1 text-slate-400">

                          <BoutonAction
                            titre="Télécharger"
                            onClick={() => telechargerFichier(doc)}
                            disabled={loading || !doc.fichier}
                          >
                            <Download size={16} />
                          </BoutonAction>

                          <BoutonAction
                            titre="Modifier"
                            onClick={() => ouvrirModification(doc)}
                            disabled={loading}
                          >
                            <Pencil size={16} />
                          </BoutonAction>

                          <BoutonAction
                            titre="Supprimer"
                            onClick={() => supprimerDocument(doc)}
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </BoutonAction>

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Aucun document enregistré pour ce véhicule.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

        <Statistique
          valeur={nbValides}
          label="Documents valides"
          icone={<CheckCircle size={20} />}
          couleur="bg-green-50 text-green-600"
        />

        <Statistique
          valeur={nbBientot}
          label="Expire bientôt"
          icone={<Clock size={20} />}
          couleur="bg-orange-50 text-orange-500"
        />

        <Statistique
          valeur={nbExpires}
          label="Documents expirés"
          icone={<XCircle size={20} />}
          couleur="bg-red-50 text-red-500"
        />

      </div>

      {/* Modal */}
      {modalOuvert && (
        <ModalAjoutDocument
          key={documentEnEdition?.id || "ajout"}
          document={documentEnEdition}
          onFermer={fermerModal}
          onAjouter={
            documentEnEdition
              ? modifierDocument
              : ajouterDocument
          }
        />
      )}

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

function BoutonAction({
  titre,
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={titre}
      aria-label={titre}
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function Statistique({
  valeur,
  label,
  icone,
  couleur,
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center gap-4">
      <div
        className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${couleur}`}
      >
        {icone}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-800">
          {valeur}
        </p>

        <p className="text-xs font-bold text-slate-400 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
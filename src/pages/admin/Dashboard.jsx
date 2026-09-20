import StatCard from "../../components/admin/dashboard/StatCard";
import AccountsTable from "../../components/admin/dashboard/AccountsTable";

import {
  CalendarDays,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import Topbar from "../../components/admin/dashboard/Topbar";

import { useResponsables } from "../../hooks/useResponsables";

export default function Dashboard() {
  // ----------------------------------------------------------
  // Données des responsables (API)
  // ----------------------------------------------------------

  const {
    responsables,
    loading,
    error,
    activerCompte,
    desactiverCompte,
    reinitialiserAcces,
  } = useResponsables();

  // ----------------------------------------------------------
  // Calcul des statistiques
  // ----------------------------------------------------------

  const total = responsables.length;

  const actifs = responsables.filter(
    (responsable) => responsable.statut_compte === "ACTIF"
  ).length;

  const desactives = responsables.filter(
    (responsable) => responsable.statut_compte === "DESACTIVE"
  ).length;

  const afficher = (nombre) => (loading ? "" : String(nombre));

const STATS = [
  {
    label: "Responsables actifs",
    value: afficher(actifs),
    valueColor: "text-green-600",
    iconBg: "bg-green-600/10",
    icon: UserCheck,
    iconColor: "text-green-600",
  },
  {
    label: "Responsables désactivés",
    value: afficher(desactives),
    valueColor: "text-red-700",
    iconBg: "bg-red-700/10",
    icon: UserX,
    iconColor: "text-red-700",
  },
  {
    label: "Total des comptes créés",
    value: afficher(total),
    valueColor: "text-sky-950",
    iconBg: "bg-sky-950/10",
    icon: Users,
    iconColor: "text-sky-950",
  },
];

  // ----------------------------------------------------------
  // Actions sur les comptes (avec confirmation)
  // ----------------------------------------------------------

  const handleActivate = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous activer ce compte ?"
    );

    if (!confirmation) {
      return;
    }

    await activerCompte(id);
  };

  const handleDeactivate = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous désactiver ce compte ? Le responsable ne pourra plus se connecter."
    );

    if (!confirmation) {
      return;
    }

    await desactiverCompte(id);
  };

  const handleResetAccess = async (id) => {
    const confirmation = window.confirm(
      "Un nouveau mot de passe sera généré et envoyé par email. Continuer ?"
    );

    if (!confirmation) {
      return;
    }

    const resultat = await reinitialiserAcces(id);

    if (resultat) {
      window.alert(
        resultat.message || "Nouveaux identifiants envoyés par email."
      );
    }
  };

  return (
    <>
      <Topbar title="Tableau de bord" />

      <div className="flex w-full flex-col gap-8 p-6 sm:p-10">
        {/* Erreur */}
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="flex w-full flex-col gap-6 sm:flex-row">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <AccountsTable
          responsables={responsables}
          loading={loading}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onResetAccess={handleResetAccess}
        />
      </div>
    </>
  );
}
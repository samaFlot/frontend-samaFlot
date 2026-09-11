import {
  LayoutDashboard,
  Truck,
  Users,
  ClipboardList,
  Route,
  MapPin,
  UserCircle,
} from "lucide-react";

export const TRANSPORTEUR_NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Tableau de bord",
    path: "/transporteur",
    end: true,
  },
  {
    icon: Truck,
    label: "Véhicules",
    path: "/transporteur/vehicules",
  },
  {
    icon: Users,
    label: "Agents",
    path: "/transporteur/agents",
  },
  {
    icon: ClipboardList,
    label: "Demandes",
    path: "/transporteur/demandes",
  },
  {
    icon: ClipboardList,
    label: "Missions",
    path: "/transporteur/missions",
  },
  {
    icon: MapPin,
    label: "Suivi",
    path: "/transporteur/suivi",
  },
  {
    icon: UserCircle,
    label: "Profil",
    path: "/transporteur/profil",
  },
];

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  UserCircle,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Tableau de bord",
    path: "/admin",
    end: true,
  },
  {
    icon: Users,
    label: "Responsables",
    path: "/admin/responsables",
  },
  {
    icon: UserCircle,
    label: "Profil",
    path: "/admin/profil",
  },
];
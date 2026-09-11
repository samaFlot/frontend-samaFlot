import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ADMIN_NAV_ITEMS } from "../components/admin/adminNavigation";

export default function AdminLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Sidebar items={ADMIN_NAV_ITEMS} />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
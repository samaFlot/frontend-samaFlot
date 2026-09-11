import { Outlet } from "react-router-dom";
import { TRANSPORTEUR_NAV_ITEMS } from "../components/transporteur/transporteurNavigation";
import Sidebar from "../components/Sidebar";

export default function TransporteurLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
        <Sidebar items={TRANSPORTEUR_NAV_ITEMS} />

        <main className="ml-64 min-h-screen">
            <Outlet />
        </main>
    </div>
  );
}
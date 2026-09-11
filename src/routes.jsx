import { Routes , Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Solutions from "./pages/public/Solutions";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManagersPage from "./pages/admin/ManagersPage";
import ResponsableDetailPage from "./pages/admin/ResponsableDetailPage";
import ProfilPage from "./pages/admin/ProfilPage";
import DashboardPage from "./pages/transporteur/DashboardPage";
import TransporteurLayout from "./layouts/TransporteurLayout";
import LoginPage from "./pages/auth/LoginPage";
import VehiclesPage from "./pages/transporteur/VehiculesPage";
import AgentsPage from "./pages/transporteur/AgentsPage";
import DemandesChargementPage from "./pages/transporteur/DemandesChargementPage";
import DemandeChargementDetailPage from "./pages/transporteur/DemandeChargementDetailPage";
import CreerMissionPage from "./pages/transporteur/CreerMissionPage";
import MissionsPage from "./pages/transporteur/MissionsPage";
import MissionDetailPage from "./pages/transporteur/MissionDetailPage";
import ProfilPageTransporteur from "./pages/transporteur/ProfilPageTransporteur";

function AppRoutes() {
  return (
    <Routes>
        <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/*<Route path="/assistant" element={<Assistant />} />*/}
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/responsables" element={<ManagersPage />} />
            <Route
                path="responsables/:id"
                element={<ResponsableDetailPage />}
            />
            <Route path="/admin/profil" element={<ProfilPage />} />
        </Route>
        <Route path="/transporteur" element={<TransporteurLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/transporteur/vehicules" element={<VehiclesPage />} />
            <Route path="/transporteur/agents" element={<AgentsPage />} />
            <Route
                path="/transporteur/demandes"
                element={<DemandesChargementPage />}
            />
            <Route
                path="demandes-chargement/:id"
                element={<DemandeChargementDetailPage />}
            />
            <Route
                path="demandes-chargement/:id/mission"
                element={<CreerMissionPage />}
            />
            <Route path="/transporteur/missions" element={<MissionsPage />} />
            <Route path="/transporteur/missions/:id" element={<MissionDetailPage />} />
            <Route path="/transporteur/profil" element={<ProfilPageTransporteur />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  // Se déconnecter
  const handleLogout = () => {
    // Supprimer les tokens enregistrés à la connexion
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Retour à la page de connexion.
    // replace: true empêche de revenir sur le profil avec le bouton "Précédent".
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-bold leading-5 tracking-tight text-red-500"
      >
        <LogOut className="size-3.5" />
        <span>Se déconnecter</span>
      </button>
    </div>
  );
}
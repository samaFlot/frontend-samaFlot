import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        className="flex items-center gap-2 text-sm font-bold leading-5 tracking-tight text-red-500"
      >
        <LogOut className="size-3.5" />
        <span>Se déconnecter</span>
      </button>
    </div>
  );
}
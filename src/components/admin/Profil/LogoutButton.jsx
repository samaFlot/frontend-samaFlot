import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <div className="flex justify-center pb-10">
      <button
        type="button"
        className="flex items-center gap-3 text-base font-semibold leading-6 text-gray-400 transition-colors hover:text-red-600"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-gray-200">
          <LogOut className="h-4 w-4" />
        </span>

        <span>Se déconnecter de la session</span>
      </button>
    </div>
  );
}
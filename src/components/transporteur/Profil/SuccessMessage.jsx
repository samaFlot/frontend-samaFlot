import { Check } from "lucide-react";

export default function SuccessMessage() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3 shadow-lg">
        <Check className="size-4 text-white" />

        <span className="text-sm font-medium leading-5 text-white">
          Informations mises à jour avec succès
        </span>
      </div>
    </div>
  );
}
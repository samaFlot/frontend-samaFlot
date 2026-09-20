import { UserRound, Truck } from "lucide-react";

export default function MissionResourceCard({
  type,
  label,
  name,
  image,
}) {
  // Permet de savoir si la ressource est un véhicule
  // ou un agent.
  const isVehicle = type === "vehicle";

  return (
    <div className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
      <div className="flex min-w-0 items-center gap-4">
        {/* Photo de l'agent si elle existe.
            Pour un véhicule, il n'y a pas de photo :
            on affiche donc l'icône. */}
        {image ? (
          <img
            className="size-12 shrink-0 rounded-lg border border-white"
            src={image}
            alt={name}
          />
        ) : (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
            {isVehicle ? (
              <Truck className="size-6 text-sky-950" />
            ) : (
              <UserRound className="size-6 text-sky-950" />
            )}
          </div>
        )}

        <div className="min-w-0">
          {/* Type de ressource */}
          <div className="mb-0.5 text-[10px] font-bold uppercase leading-4 tracking-wide text-slate-400">
            {label}
          </div>

          {/* Nom ou immatriculation */}
          <div className="truncate text-base font-bold leading-6 text-sky-950">
            {name || ""}
          </div>

        </div>
      </div>
    </div>
  );
}


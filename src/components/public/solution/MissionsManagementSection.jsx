/* ------------------------------------------------------------------ */
/*  Gestion des missions                                                */
/* ------------------------------------------------------------------ */
 
const MISSION_STEPS = [
  { number: "1", label: "Création & Affectation" },
  { number: "2", label: "Suivi d'exécution mobile" },
  { number: "3", label: "Preuve de livraison digitale" },
];
import image8 from "../../../../src/assets/solution/image8.png"
export default function MissionsManagementSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Gestion des missions
          </h2>
          <p className="text-lg leading-7 text-gray-600">
            De la création à la clôture, gérez le cycle de vie complet de vos
            ordres de mission. Allouez les meilleures ressources (chauffeur +
            véhicule) en fonction des besoins du client et des capacités
            disponibles.
          </p>
          <div className="flex w-full flex-col items-start gap-4 pt-2">
            {MISSION_STEPS.map(({ number, label }) => (
              <div
                key={number}
                className="flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-base font-bold text-orange-500">
                  {number}
                </span>
                <span className="text-base font-bold leading-6 text-sky-950">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-hidden rounded-[48px]">
          <img
            className="h-96 w-full object-cover"
            src={image8}
            alt="Gestion des missions"
          />
        </div>
      </div>
    </section>
  );
}
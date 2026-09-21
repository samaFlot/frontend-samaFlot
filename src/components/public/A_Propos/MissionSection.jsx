import { Fragment } from "react";
import image66 from "../../../../src/assets/solution/image66.png"

const MISSION_STATS = [
  { value: "100%", label: "Digitalisé" },
  { value: "Dakar", label: "Siège Social" },
];

export default function MissionSection() {
  return (
    <section className="w-full bg-white px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex-1 overflow-hidden rounded-3xl">
          <img
            className="h-[500px] w-full object-cover"
            src={image66}
            alt="Notre mission"
          />
        </div>
        <div className="flex flex-1 flex-col items-start gap-8">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Notre mission
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="text-lg leading-7 text-gray-600">
              L'origine de SamaFlot réside dans le constat des difficultés
              persistantes rencontrées par les transporteurs : manque de
              visibilité sur la disponibilité des véhicules, suivi
              approximatif des cargaisons et dispersion des informations.
            </p>
            <p className="text-lg leading-7 text-gray-600">
              Notre mission est de centraliser l'intégralité de la chaîne
              logistique sur une plateforme unique et intuitive. Nous croyons
              que la technologie doit être un levier pour garantir la
              sécurité des biens et optimiser la rentabilité de chaque
              kilomètre parcouru.
            </p>
            <div className="flex items-start gap-8 pt-2">
              {MISSION_STATS.map(({ value, label }, i) => (
                <Fragment key={label}>
                    {i > 0 && <div className="h-12 w-px bg-gray-200" />}
                    
                    <div className="flex flex-col items-start">
                    <span className="text-3xl font-black leading-9 tracking-tight text-sky-950">
                        {value}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-tight text-gray-400">
                        {label}
                    </span>
                    </div>
                </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
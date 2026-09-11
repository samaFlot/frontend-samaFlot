/**
 * RealTimeTrackingSection
 * Bloc "Suivi en temps réel et géolocalisation" : image à gauche,
 * titre + paragraphe + 2 cartes statistiques (précision GPS, surveillance
 * 24/7) à droite. Fond blanc. Utilise TRACKING_STATS, pas d'icône.
 */

import image7 from "../../../../src/assets/solution/image7.png"

const TRACKING_STATS = [
  { value: "0.5m", label: "Précision GPS" },
  { value: "24/7", label: "Surveillance continue" },
];

export default function RealTimeTrackingSection() {
  return (
    <section className="w-full bg-white px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <img
            className="w-full rounded-[48px] object-cover"
            src={image7}
            alt="Suivi en temps réel"
          />
        </div>
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Suivi en temps réel et géolocalisation
          </h2>
          <p className="text-lg leading-7 text-gray-600">
            Ne perdez jamais de vue votre investissement. Visualisez la
            position exacte de chaque véhicule sur une carte haute
            définition.
          </p>
          <div className="grid w-full grid-cols-2 gap-6 pt-2">
            {TRACKING_STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-1 rounded-xl bg-gray-50 p-4 outline outline-1 outline-offset-[-1px] outline-gray-100"
              >
                <span className="text-2xl font-black leading-8 text-orange-500">
                  {value}
                </span>
                <span className="text-xs font-bold uppercase leading-4 text-gray-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
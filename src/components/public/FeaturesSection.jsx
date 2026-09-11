/* ------------------------------------------------------------------ */
/*  Features ("Tout ce dont vous avez besoin")                         */

import { ClipboardList, Radar, Truck } from "lucide-react";

/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    icon: Truck,
    title: "Véhicules & Agents",
    text: "Centralisez les dossiers de vos chauffeurs et les fiches techniques de vos camions en un seul endroit.",
  },
  {
    icon: Radar,
    title: "Suivi temps réel",
    text: "Localisez votre flotte 24h/24 et recevez des alertes en cas d'imprévus sur le trajet.",
  },
  {
    icon: ClipboardList,
    title: "Gestion des missions",
    text: "Assignez, suivez et clôturez les ordres de mission numériquement, sans aucun papier.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-sky-950 px-6 py-24 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl font-extrabold leading-tight text-white sm:text-4xl">
            Tout ce dont vous avez besoin
          </h2>
         <div className="h-1.5 w-20 rounded-full bg-orange-500" />
        </div>
 
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-2.5 rounded-2xl bg-white/5 p-8 outline outline-1 outline-offset-[-1px] outline-white/10"
            >
              <Icon className="h-7 w-7 text-orange-500" strokeWidth={2} />
              <h3 className="pt-3.5 text-xl font-bold leading-7 text-white">
                {title}
              </h3>
              <p className="text-sm leading-6 text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
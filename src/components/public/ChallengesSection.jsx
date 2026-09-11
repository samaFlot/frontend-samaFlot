/* ------------------------------------------------------------------ */
/*  Challenges ("Les défis du transporteur moderne")                   */

import { BarChart3, MailWarning, MapPinOff } from "lucide-react";

/* ------------------------------------------------------------------ */
const CHALLENGES = [
  {
    icon: MapPinOff,
    title: "Disponibilité incertaine",
    text: "Une visibilité floue sur l'état réel de vos véhicules en temps réel, entraînant des opportunités manquées.",
  },
  {
    icon: MailWarning,
    title: "Surcharge d'e-mails",
    text: "La coordination par mails et appels incessants noie votre productivité et augmente les erreurs humaines.",
  },
  {
    icon: BarChart3,
    title: "Manque de visibilité",
    text: "Sans données centralisées, il est impossible d'analyser vos coûts et d'améliorer votre rentabilité opérationnelle.",
  },
];
 
export default function ChallengesSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-24 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Les défis du transporteur moderne
          </h2>
          <div className="h-1.5 w-20 rounded-full bg-orange-500" />
        </div>
 
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-xl bg-white p-10 shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100"
            >
              <span className="flex size-16 items-center justify-center rounded-2xl bg-red-50">
                <Icon className="h-6 w-6 text-red-500" strokeWidth={2} />
              </span>
              <h3 className="pt-4 text-xl font-bold leading-7 text-sky-950">
                {title}
              </h3>
              <p className="text-base leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
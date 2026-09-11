import { Eye, MapPin, ShieldCheck, Sparkles } from "lucide-react";

const PILLARS = [
  { icon: ShieldCheck, iconBg: "bg-blue-50", iconColor: "text-sky-950",
    title: "Fiabilité", text: "Une plateforme robuste disponible 24/7 pour assurer la continuité de vos opérations critiques." },
  { icon: Eye, iconBg: "bg-orange-50", iconColor: "text-orange-500",
    title: "Transparence", text: "Accès direct aux données en temps réel pour une relation de confiance entre transporteurs et clients." },
  { icon: MapPin, iconBg: "bg-green-50", iconColor: "text-green-600",
    title: "Proximité", text: "Un support local basé à Dakar qui comprend vos réalités de terrain et vos contraintes spécifiques." },
  { icon: Sparkles, iconBg: "bg-purple-50", iconColor: "text-purple-600",
    title: "Innovation", text: "L'intégration constante des dernières technologies d'IA pour garder une longueur d'avance." },
];

export default function PillarsSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Les piliers de notre engagement
          </h2>
          <p className="max-w-2xl text-base leading-6 text-gray-500">
            Ces valeurs guident chaque mise à jour de notre logiciel et
            chaque interaction avec nos partenaires.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, iconBg, iconColor, title, text }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-3xl bg-white p-8 shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-100"
            >
              <span className={`flex size-14 items-center justify-center rounded-2xl ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={2} />
              </span>
              <h3 className="pt-3 text-xl font-extrabold leading-7 text-sky-950">
                {title}
              </h3>
              <p className="text-sm leading-6 text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import StepRow from "./StepRow";

import image1 from "../../assets/home/image1.png"
import image2 from "../../assets/home/image2.png"
import image3 from "../../assets/home/image3.png"
import image4 from "../../assets/home/image4.png"

const STEPS = [
  {
    image:image1,
    number: "01",
    tag: "Premier contact",
    title: "Prise de contact & Analyse",
    text: "Nos experts analysent votre structure actuelle pour définir le plan de déploiement le plus adapté à vos besoins spécifiques.",
  },
  {
    image:image2,
    number: "02",
    tag: "Onboarding",
    title: "Création de votre compte pro",
    text: "Configuration de votre instance sécurisée. Importation de votre flotte et formation initiale de vos équipes administratives.",
  },
  {
    image:image3,
    number: "03",
    tag: "Déploiement",
    title: "Accès immédiat aux outils",
    text: "Activation des terminaux mobiles pour vos chauffeurs et synchronisation en temps réel avec votre tableau de bord central.",
  },
  {
    image:image4,
    number: "04",
    tag: "Croissance",
    title: "Optimisation & Reporting",
    text: "Exploitez les données collectées pour réduire vos coûts opérationnels et améliorer la qualité de service client.",
  },
];


export default function StepsSection() {
  return (
    <section className="w-full bg-white px-6 py-24 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Votre transition vers le digital en 4 étapes
          </h2>
         <div className="h-1.5 w-20 rounded-full bg-orange-500" />
        </div>
 
        <div className="flex flex-col gap-20 lg:gap-32">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
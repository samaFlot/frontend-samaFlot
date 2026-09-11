/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

import { ArrowRight } from "lucide-react";
import hero from "../../assets/home/hero.png"

 
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={hero}
          alt=""
        />
        <div className="absolute inset-0 bg-sky-950/70" />
      </div>
 
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-28 lg:px-12 lg:py-36">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
          La gestion de flotte, enfin{" "}
          <br /><span className="text-orange-500">simple</span> et centralisée.
        </h1>
 
        <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
          Propulsez votre entreprise de transport vers l'excellence
          numérique. Automatisez vos opérations, optimisez vos tournées et
          gardez un œil sur chaque kilomètre parcouru.
        </p>
 
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button className="flex items-center gap-3 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-orange-600">
            Contacter SamaFlott
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="rounded-xl px-8 py-4 text-base font-bold text-white outline outline-2 outline-offset-[-2px] outline-white/30 transition-colors hover:bg-white/10">
            Découvrir les solutions
          </button>
        </div>
      </div>
    </section>
  );
}
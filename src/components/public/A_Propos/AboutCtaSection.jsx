import { ArrowRight } from "lucide-react";

export default function AboutCtaSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
          Vous voulez en savoir plus sur SamaFlot ?
        </h2>
        <p className="max-w-xl text-lg leading-7 text-gray-500">
          Discutons de vos besoins et découvrez comment nous pouvons
          optimiser la gestion de votre flotte dès aujourd'hui.
        </p>
        <button className="mt-2 flex items-center gap-3 rounded-2xl bg-orange-500 px-12 py-5 text-xl font-black text-white transition-colors hover:bg-orange-600">
          Contactez-nous
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
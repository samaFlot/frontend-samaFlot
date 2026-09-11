/* ------------------------------------------------------------------ */
/*  CTA finale                                                          */
/* ------------------------------------------------------------------ */
 
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-16 lg:px-20">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-[48px] bg-sky-950 px-6 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-orange-500/20 blur-3xl" />
        <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Envie d'en savoir plus sur votre cas précis ?
        </h2>
        <p className="max-w-xl text-lg leading-7 text-white/70">
          Nos experts sont disponibles pour une démonstration personnalisée
          adaptée à la taille de votre flotte.
        </p>
        <button className="flex items-center gap-3 rounded-2xl bg-orange-500 px-12 py-5 text-xl font-black text-white shadow-2xl transition-colors hover:bg-orange-600">
          Contactez-nous
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
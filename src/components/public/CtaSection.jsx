/* ------------------------------------------------------------------ */
/*  CTA ("Prêt à moderniser...")                                       */
/* ------------------------------------------------------------------ */
 
export default function CtaSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-16 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 rounded-xl bg-sky-950 p-10 text-center sm:p-16">
        <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Prêt à moderniser la gestion de votre flotte ?
        </h2>
        <p className="max-w-2xl text-lg leading-7 text-gray-300">
          Rejoignez les transporteurs sénégalais qui ont déjà franchi le pas
          vers une logistique 2.0 performante et sereine.
        </p>
        <button className="mt-4 rounded-xl bg-orange-500 px-8 py-4 text-base font-black uppercase tracking-widest text-white transition-colors hover:bg-orange-600">
          Commencer maintenant
        </button>
      </div>
    </section>
  );
}


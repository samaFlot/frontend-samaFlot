export default function ContactHero() {
  return (
    <section className="w-full bg-sky-950 px-6 py-15 lg:px-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-extrabold leading-tight text-orange-500 sm:text-5xl lg:text-6xl lg:leading-[1.25]">
          Parlons de votre flotte
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-white sm:text-xl">
          Prêt à digitaliser votre activité ? Remplissez le formulaire et
          notre équipe vous recontactera sous 24h.
        </p>
      </div>
    </section>
  );
}
export default function AboutHero() {
  return (
    <section className="w-full bg-sky-950 px-6 py-15 lg:px-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.25]">
          À propos de <span className="text-orange-500">SamaFlott</span>
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-white sm:text-xl">
          SamaFlot est né d'une volonté simple : transformer les défis
          quotidiens des transporteurs en opportunités de croissance durable
          grâce au numérique.
        </p>
      </div>
    </section>
  );
}
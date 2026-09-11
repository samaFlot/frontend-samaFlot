/**
 * PageHero
 * Affiche le titre principal ("Une plateforme complète pour la gestion
 */
import image1 from "../../../../src/assets/solution/image1.png"

export default function PageHero() {
  return (

    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={image1}
          alt=""
        />
        <div className="absolute inset-0 bg-sky-950/70" />
      </div>

       <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-28 lg:px-12 lg:py-36">
        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.25]">
          Une plateforme complète pour la{" "}
          <br /><span className="text-orange-500">gestion de flotte</span>
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-white sm:text-xl">
          Découvrez comment SamaFlott transforme chaque aspect de votre
          logistique. Nous mettons la technologie au service de votre
          rentabilité.
        </p>
      </div>
    </section>
  );
}
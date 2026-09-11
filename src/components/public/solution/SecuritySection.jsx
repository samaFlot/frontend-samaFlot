/* ------------------------------------------------------------------ */
/*  Multi-entreprises et sécurité                                       */
/* ------------------------------------------------------------------ */
import image5 from "../../../../src/assets/solution/image5.png"
export default function SecuritySection() {
  return (
    <section className="w-full bg-white px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Multi-entreprises et sécurité
          </h2>
          <p className="text-lg leading-7 text-gray-600">
            Que vous soyez un transporteur unique ou un grand groupe gérant
            plusieurs entités, SamaFlott assure une isolation totale des
            données. Chaque client possède son environnement conforme aux
            meilleurs standards de cybersécurité.
          </p>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-[48px] shadow-lg">
          <img
            className="h-96 w-full object-cover"
            src={image5}
            alt="Sécurité de niveau bancaire"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-l from-sky-950/80 to-sky-950/0 p-10">
            <h3 className="text-xl font-bold leading-7 text-white">
              Sécurité de niveau bancaire
            </h3>
            <p className="text-sm leading-5 text-white/60">
              Chiffrement AES-256 pour toutes vos données sensibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
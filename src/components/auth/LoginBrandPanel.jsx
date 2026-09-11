export default function LoginBrandPanel() {
  return (
    <section className="relative hidden min-h-screen flex-1 overflow-hidden bg-sky-950 lg:flex">
      {/* Image */}
      <img
        src="https://placehold.co/672x800"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-sky-950/70" />

      {/* Contenu */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-10 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://placehold.co/196x49"
            alt="SamaFlott"
            className="h-auto w-48"
          />

          <div className="h-1.5 w-20 rounded-full bg-orange-500" />

          <p className="max-w-md pt-4 text-xl font-light leading-8 text-white">
            Optimisez votre logistique avec la plateforme de gestion de flotte
            la plus performante.
          </p>
        </div>

        {/* Indicateurs */}
        <div className="absolute bottom-10 left-1/2 flex w-full max-w-xl -translate-x-1/2 items-center justify-center gap-4 px-6 text-xs font-medium uppercase tracking-wider text-white/60 sm:gap-6">
          <span>Performance</span>
          <span>•</span>
          <span>Efficacité</span>
          <span>•</span>
          <span>Traçabilité</span>
        </div>
      </div>
    </section>
  );
}
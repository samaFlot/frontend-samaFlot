const LOCAL_STATS = [
  { value: "50+", label: "Partenaires locaux" },
  { value: "24/7", label: "Support Technique" },
];

const GALLERY_IMAGES = [
  { src: "https://placehold.co/255x256", tall: false },
  { src: "https://placehold.co/255x320", tall: true },
  { src: "https://placehold.co/255x320", tall: true, offset: true },
  { src: "https://placehold.co/255x256", tall: false, offset: true },
];

export default function LocalContextSection() {
  return (
    <section className="relative w-full overflow-hidden bg-sky-950 px-6 py-24 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.orange.500/15%),transparent_60%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="flex flex-1 flex-col items-start gap-8">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Adapté aux réalités du Sénégal
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="text-xl font-light leading-8 text-gray-300">
              Nous comprenons la géographie locale, les défis des
              infrastructures et les spécificités des échanges
              transfrontaliers dans la sous-région.
            </p>
            <p className="text-xl font-medium leading-8 text-orange-500">
              Une équipe locale, une expertise mondiale, pour un transport
              sénégalais plus fort.
            </p>
          </div>
          <div className="flex items-start gap-12 pt-4">
            {LOCAL_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <span className="text-4xl font-black leading-10 text-white">
                  {value}
                </span>
                <span className="w-44 text-sm uppercase tracking-wider text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-center gap-6">
          {[GALLERY_IMAGES.slice(0, 2), GALLERY_IMAGES.slice(2, 4)].map(
            (column, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-1 flex-col gap-6 ${
                  colIndex === 0 ? "pb-12" : "pt-12"
                }`}
              >
                {column.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-3xl shadow-2xl"
                  >
                    <img
                      className={`w-full object-cover ${
                        img.tall ? "h-80" : "h-64"
                      }`}
                      src={img.src}
                      alt="Équipe SamaFlot au Sénégal"
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
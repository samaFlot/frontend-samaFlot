/* ------------------------------------------------------------------ */
/*  Steps ("Votre transition vers le digital en 4 étapes")             */
/* ------------------------------------------------------------------ */

export default function StepRow({ step, reverse }) {
  const textBlock = (
    <div className="flex flex-1 flex-col items-start gap-4">
      <span className="text-base font-bold leading-6 text-orange-500">
        {step.number} — {step.tag}
      </span>
      <h3 className="text-2xl font-bold leading-9 text-sky-950 sm:text-3xl">
        {step.title}
      </h3>
      <p className="pt-2 text-lg leading-7 text-cyan-800">{step.text}</p>
    </div>
  );
 
  const imageBlock = (
    <div className="flex h-72 flex-1 items-center overflow-hidden rounded-xl shadow-sm sm:h-96">
      <img
        className="h-full w-full object-cover"
        src={step.image}
        alt={step.title}
      />
    </div>
  );
 
  return (
    <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-20">
      {reverse ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
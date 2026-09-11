import { CheckCircle } from "lucide-react";

export default function SuccessBanner() {
  return (
    <div className="flex w-full items-center gap-5 rounded-3xl bg-emerald-500/5 p-6 outline outline-2 outline-offset-[-2px] outline-emerald-500/20">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500">
        <CheckCircle className="h-4 w-4 text-white" strokeWidth={2.5} />
      </span>
      <div className="flex flex-col items-start">
        <span className="text-base font-bold tracking-tight text-emerald-500">
          Votre message a bien été envoyé
        </span>
        <span className="text-sm tracking-tight text-emerald-500/70">
          Nous reviendrons vers vous très rapidement.
        </span>
      </div>
    </div>
  );
}
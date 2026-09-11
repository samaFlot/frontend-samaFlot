import { LoaderCircle } from "lucide-react";

export default function CompanyInfoCard() {
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="text-lg font-bold leading-7 text-sky-950">
        Informations de l'entreprise
      </h2>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
          Nom de l'entreprise
        </label>

        <input
          type="text"
          defaultValue="Teranga Logistique SA"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm leading-5 text-gray-900 outline-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-3 text-sm font-semibold leading-5 tracking-tight text-white"
        >
          <LoaderCircle className="size-3.5 animate-spin" />
          Enregistrement...
        </button>
      </div>
    </section>
  );
}
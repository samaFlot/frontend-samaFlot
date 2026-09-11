export default function AdditionalInformation() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 px-6 py-8">
      <h3 className="text-xs font-bold uppercase leading-4 tracking-wider text-slate-400">
        Informations Complémentaires
      </h3>

      <textarea
        rows={4}
        placeholder="Instructions spécifiques pour le chauffeur..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-5 text-gray-700 outline-none placeholder:text-gray-400 focus:border-sky-950"
      />
    </div>
  );
}
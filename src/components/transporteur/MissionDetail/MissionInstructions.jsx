export default function MissionInstructions() {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-6">
      <div className="text-xs font-bold uppercase leading-4 tracking-wider text-slate-400">
        Commentaires & Instructions
      </div>

      <div className="rounded-lg border border-slate-200 bg-white px-4 pb-4 pt-3.5">
        <p className="text-sm font-normal leading-6 text-slate-600">
          &quot;Prévoir une bâche de protection pour le transport des sacs de
          farine. Livraison attendue avant 14h au dépôt central de Thiès.
          Contact sur place : M. Diagne.&quot;
        </p>
      </div>
    </div>
  );
}
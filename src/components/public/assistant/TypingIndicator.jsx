export default function TypingIndicator() {
  return (
    <div className="flex w-full items-center gap-2 pt-2">
      <div className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-orange-500" />
        <span className="size-1.5 rounded-full bg-orange-500/40" />
        <span className="size-1.5 rounded-full bg-orange-500/20" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
        L'assistant réfléchit...
      </span>
    </div>
  );
}
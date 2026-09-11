import { Bot, X } from "lucide-react";

export default function ChatHeader({ onClose }) {
  return (
    <div className="flex w-full items-start justify-between bg-sky-950 p-6">
      <div className="flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
          <Bot className="h-6 w-6 text-white" />
        </span>
        <div className="flex flex-col items-start">
          <span className="text-lg font-bold tracking-tight text-white">
            Assistant SamaFlot
          </span>
          <span className="text-xs font-medium text-white/70">
            Je réponds à vos questions sur la plateforme
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer l'assistant"
        className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
      >
        <X className="h-3.5 w-3.5 text-white" />
      </button>
    </div>
  );
}
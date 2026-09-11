import { Send } from "lucide-react";

export default function ChatInput({ value, onChange, onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-3 border-t border-gray-100 p-6"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Posez votre question..."
        className="flex-1 rounded-2xl bg-gray-50 px-5 py-4 text-sm text-sky-950 outline outline-1 outline-offset-[-1px] outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-500"
      />
      <button
        type="submit"
        aria-label="Envoyer"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-[0px_10px_15px_-3px_rgba(245,130,31,0.20),0px_4px_6px_-4px_rgba(245,130,31,0.20)] transition-colors hover:bg-orange-600"
      >
        <Send className="h-4 w-4 text-white" />
      </button>
    </form>
  );
}
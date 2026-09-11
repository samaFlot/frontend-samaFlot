import { Bot } from "lucide-react";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  const body = Array.isArray(content)
    ? content.map((seg, i) =>
        seg.bold ? (
          <span key={i} className="font-bold text-cyan-800">
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )
    : content;

  if (isUser) {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[80%] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl bg-cyan-800/10 px-4 py-4 text-sm leading-6 text-sky-950 outline outline-1 outline-offset-[-1px] outline-cyan-800/20">
          {body}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start gap-3">
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500">
        <Bot className="h-4 w-4 text-white" />
      </span>
      <div className="max-w-[80%] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-white px-4 py-4 text-sm leading-6 text-sky-950 shadow-sm outline outline-1 outline-offset-[-1px] outline-gray-200">
        {body}
      </div>
    </div>
  );
}
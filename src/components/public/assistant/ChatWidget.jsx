import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
 
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);
 
  const handleSend = () => {
    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
 
    // Simule une réponse — à remplacer par un vrai appel API.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Merci pour votre question, un membre de notre équipe reviendra vers vous avec plus de détails.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };
 
  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-white/95 shadow-[0px_24px_48px_-12px_rgba(15,42,74,0.40)] outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-md">
      <ChatHeader onClose={onClose} />
 
      <div
        ref={scrollRef}
        className="flex max-h-[60vh] w-full flex-col gap-6 overflow-y-auto px-6 py-6"
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
 
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}

import chatbot from "../../assets/chatbot.gif"
export default function FloatingAssistantButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex size-16 items-center justify-center rounded-full"
      aria-label="Ouvrir l'assistant"
    >
      <img
        src={chatbot}
        alt="Assistant SamaFlott"
        className="size-16 object-contain"
      />
    </button>
  );
}
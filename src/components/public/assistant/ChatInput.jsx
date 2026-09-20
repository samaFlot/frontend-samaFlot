import { Mic, Send, Square } from "lucide-react";
import { useRef, useState } from "react";

export default function ChatInput({
  value,
  onChange,
  onSend,
  onVoiceSend,
  disabled = false,
}) {
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!disabled && value.trim()) {
      onSend();
    }
  };

  // ----------------------------------------------------------
  // Commencer l'enregistrement
  // ----------------------------------------------------------

  const startRecording = async () => {
    if (disabled || isRecording) {
      return;
    }

    try {
      // Demander l'accès au microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      // Vérifier si le navigateur accepte webm
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Récupérer les morceaux audio
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Quand l'utilisateur arrête l'enregistrement
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType || "audio/webm",
        });

        // Arrêter complètement le microphone
        stream.getTracks().forEach((track) => track.stop());

        streamRef.current = null;
        mediaRecorderRef.current = null;
        audioChunksRef.current = [];

        setIsRecording(false);

        // Envoyer le fichier au ChatWidget
        onVoiceSend(audioBlob);
      };

      mediaRecorder.start();

      setIsRecording(true);
    } catch (error) {
      console.error("Erreur microphone :", error);
      setIsRecording(false);
    }
  };

  // ----------------------------------------------------------
  // Arrêter l'enregistrement
  // ----------------------------------------------------------

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
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
        disabled={disabled || isRecording}
        className="flex-1 rounded-2xl bg-gray-50 px-5 py-4 text-sm text-sky-950 outline outline-1 outline-offset-[-1px] outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {/* Bouton microphone */}
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
        aria-label={
          isRecording
            ? "Arrêter l'enregistrement"
            : "Enregistrer un message vocal"
        }
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-[0px_10px_15px_-3px_rgba(245,130,31,0.20),0px_4px_6px_-4px_rgba(245,130,31,0.20)] transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRecording ? (
          <Square className="h-4 w-4 fill-white text-white" />
        ) : (
          <Mic className="h-4 w-4 text-white" />
        )}
      </button>

      {/* Bouton envoyer */}
      <button
        type="submit"
        disabled={disabled || isRecording}
        aria-label="Envoyer"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-[0px_10px_15px_-3px_rgba(245,130,31,0.20),0px_4px_6px_-4px_rgba(245,130,31,0.20)] transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4 text-white" />
      </button>
    </form>
  );
}

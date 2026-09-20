import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

import {
  poserQuestion,
  envoyerVocal,
} from "../../../services/assistant";

// Message affiché au démarrage du chatbot
const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Bonjour ! Je suis l’assistant SamaFlott. Comment puis-je vous aider ?",
  },
];

export default function ChatWidget({ onClose }) {
  // Liste des messages
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Texte saisi
  const [input, setInput] = useState("");

  // Indique si l'assistant répond
  const [isTyping, setIsTyping] = useState(false);

  // Référence vers la zone des messages
  const scrollRef = useRef(null);

  // ----------------------------------------------------------
  // Faire défiler automatiquement vers le dernier message
  // ----------------------------------------------------------

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // ----------------------------------------------------------
  // Extraire uniquement le texte de la réponse
  // ----------------------------------------------------------

  const extraireReponse = (resultat) => {
    // Cas actuel de ton backend :
    // {
    //   answer: {
    //     answer: "...",
    //     sources: [...]
    //   }
    // }

    if (
      resultat?.answer &&
      typeof resultat.answer === "object" &&
      typeof resultat.answer.answer === "string"
    ) {
      return resultat.answer.answer;
    }

    // Cas où le backend retournerait directement :
    // {
    //   answer: "..."
    // }

    if (typeof resultat?.answer === "string") {
      return resultat.answer;
    }

    // Autres possibilités
    if (typeof resultat?.response === "string") {
      return resultat.response;
    }

    if (typeof resultat?.message === "string") {
      return resultat.message;
    }

    return "Je n'ai pas pu trouver de réponse.";
  };

  // ----------------------------------------------------------
  // Envoyer une question écrite
  // ----------------------------------------------------------

  const handleSend = async () => {
    const question = input.trim();

    // Ne rien faire si le champ est vide
    // ou si une réponse est déjà en cours.
    if (!question || isTyping) {
      return;
    }

    // Ajouter le message de l'utilisateur
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    // Vider le champ
    setInput("");

    // Afficher l'indicateur de chargement
    setIsTyping(true);

    try {
      // Envoyer la question au backend
      const resultat = await poserQuestion(question);

      // Extraire uniquement le texte
      const answer = extraireReponse(resultat);

      // Ajouter la réponse de l'assistant
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error("Erreur assistant IA :", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je rencontre actuellement un problème pour répondre.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ----------------------------------------------------------
  // Envoyer un message vocal
  // ----------------------------------------------------------

  const handleVoiceSend = async (audioBlob) => {
    // Ne rien faire si une réponse est déjà en cours
    if (isTyping) {
      return;
    }

    // Afficher l'indicateur de chargement
    setIsTyping(true);

    try {
      // Envoyer l'audio à FastAPI
      const resultat = await envoyerVocal(audioBlob);

      // Récupérer la transcription de Whisper
      const question = resultat.question?.trim();

      // Extraire uniquement le texte de la réponse
      const answer = extraireReponse(resultat);

      // Afficher la transcription puis la réponse
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: question || "🎤 Message vocal",
        },
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error("Erreur assistant vocal :", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je n'ai pas pu traiter votre message vocal.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* ======================================================
          FOND SEMI-TRANSPARENT
          ====================================================== */}

      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default bg-sky-950/30"
        aria-label="Fermer l'assistant"
      />

      {/* ======================================================
          INTERFACE DU CHATBOT
          ====================================================== */}

      <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-white/95 shadow-[0px_24px_48px_-12px_rgba(15,42,74,0.40)] outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-md">
        <ChatHeader onClose={onClose} />

        <div
          ref={scrollRef}
          className="flex max-h-[60vh] w-full flex-col gap-6 overflow-y-auto px-6 py-6"
        >
          {messages.map((msg, i) => (
            <ChatBubble
              key={i}
              role={msg.role}
              content={msg.content}
            />
          ))}

          {isTyping && <TypingIndicator />}
        </div>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onVoiceSend={handleVoiceSend}
          disabled={isTyping}
        />
      </div>
    </>
  );
}

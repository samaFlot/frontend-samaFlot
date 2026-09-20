import { useState } from "react";

import ChallengesSection from "../../components/public/ChallengesSection";
import CtaSection from "../../components/public/CtaSection";
import FeaturesSection from "../../components/public/FeaturesSection";
import FloatingAssistantButton from "../../components/public/FloatingAssistantButton";
import ChatWidget from "../../components/public/assistant/ChatWidget";
import Hero from "../../components/public/Hero";
import StepsSection from "../../components/public/StepsSection";

export default function Home() {
  // Permet de savoir si l'interface de discussion est ouverte
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 font-sans">
      <Hero />

      <ChallengesSection />

      <FeaturesSection />

      <StepsSection />

      <CtaSection />

      {/* GIF de l'assistant
          Il est affiché uniquement lorsque le chatbot est fermé */}
      {!chatOpen && (
        <FloatingAssistantButton
          onClick={() => setChatOpen(true)}
        />
      )}

      {/* Interface de discussion
          Elle apparaît lorsque l'utilisateur clique sur le GIF */}
      {chatOpen && (
        <ChatWidget
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}


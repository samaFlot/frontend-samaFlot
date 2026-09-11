import { useState } from "react";
import ContactForm from "../../components/public/Contact/ContactForm";
import ContactHero from "../../components/public/Contact/ContactHero";
import ContactInfoCard from "../../components/public/Contact/ContactInfoCard";
import SuccessBanner from "../../components/public/Contact/SuccessBanner";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
 
  const handleSubmit = (values) => {
    // Brancher ici l'appel API réel d'envoi du formulaire.
    console.log("Contact form submitted:", values);
    setSubmitted(true);
  };
 
  return (
    <div className="flex w-full flex-col bg-white">
      <ContactHero />
 
      <section className="w-full bg-white px-6 py-20 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm onSubmit={handleSubmit} />
 
          <div className="flex w-full flex-col gap-8">
            <ContactInfoCard />
            {submitted && <SuccessBanner />}
          </div>
        </div>
      </section>
    </div>
  );
}

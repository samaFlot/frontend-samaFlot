import { useState } from "react";
import ContactForm from "../../components/public/Contact/ContactForm";
import ContactHero from "../../components/public/Contact/ContactHero";
import ContactInfoCard from "../../components/public/Contact/ContactInfoCard";
import SuccessBanner from "../../components/public/Contact/SuccessBanner";
import api from "../../services/api";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      await api.post("/contact/", values);

      setSubmitted(true);

      // Faire disparaître le message après 3 secondes
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);

      setError(
        "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <ContactHero />

      <section className="w-full bg-white px-6 py-20 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm
            onSubmit={handleSubmit}
            loading={loading}
          />

          <div className="flex w-full flex-col gap-8">
            <ContactInfoCard />

            {submitted && <SuccessBanner />}

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
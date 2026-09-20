const API_ASSISTANT = "http://127.0.0.1:8001/api";

// Envoyer une question écrite
export const poserQuestion = async (question) => {
  const response = await fetch(`${API_ASSISTANT}/assistant/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de la question.");
  }

  return response.json();
};

// Envoyer un message vocal
export const envoyerVocal = async (audioBlob) => {
  const formData = new FormData();

  // FastAPI attend un champ appelé "file"
  formData.append("file", audioBlob, "message.webm");

  const response = await fetch(
    `${API_ASSISTANT}/assistant/ask-voice`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du message vocal.");
  }

  return response.json();
};

import { useState } from "react";

const FORM_FIELDS = [
  {
    name: "fullName",
    label: "Nom complet",
    placeholder: "Ex: Moussa wade",
    type: "text",
  },
  {
    name: "company",
    label: "Nom de l'entreprise",
    placeholder: "Ex: TransLog Sénégal",
    type: "text",
  },
  {
    name: "phone",
    label: "Téléphone",
    placeholder: "+221 77 000 00 00",
    type: "tel",
  },
  {
    name: "email",
    label: "Email professionnel",
    placeholder: "contact@entreprise.com",
    type: "email",
  },
];

export default function ContactForm({ onSubmit, loading }) {
  const [values, setValues] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 rounded-[32px] bg-white p-6 shadow-[0px_20px_25px_-5px_rgba(15,42,74,0.05),0px_8px_10px_-6px_rgba(15,42,74,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-100 sm:p-10"
    >
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {FORM_FIELDS.map(({ name, label, placeholder, type }) => (
          <label key={name} className="flex flex-col gap-2">
            <span className="text-sm font-bold text-sky-950/80">
              {label}
            </span>

            <input
              type={type}
              name={name}
              value={values[name]}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={loading}
              className="w-full rounded-xl bg-gray-50 px-5 py-4 text-sm text-sky-950 outline outline-1 outline-offset-[-1px] outline-slate-200 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold text-sky-950/80">
          Votre message
        </span>

        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={5}
          placeholder="Décrivez vos besoins ou posez-nous une question..."
          disabled={loading}
          className="w-full resize-none rounded-xl bg-gray-50 px-5 py-4 text-sm text-sky-950 outline outline-1 outline-offset-[-1px] outline-slate-200 placeholder:text-gray-400 focus:outline-2 focus:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold tracking-tight text-white shadow-[0px_10px_15px_-3px_rgba(245,130,31,0.20),0px_4px_6px_-4px_rgba(245,130,31,0.20)] transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
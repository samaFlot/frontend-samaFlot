import { Info, Mail, MapPin, Phone } from "lucide-react";

const CONTACT_METHODS = [
  { icon: Phone, label: "Téléphone", value: "+221 77 822 40 46", note: "Lun - Ven, 08h - 18h" },
  { icon: Mail, label: "Email", value: "mamesayelom04@gmil.com", note: "Réponse sous 24h ouvrées" },
  { icon: MapPin, label: "Adresse", value: "Avenue Cheikh Anta Diop", note: "Immeuble SamaFlot, Dakar, Sénégal" },
];

export default function ContactInfoCard() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-[32px] bg-gray-50 p-6 outline outline-1 outline-offset-[-1px] outline-gray-100 sm:p-10">
      <h2 className="text-2xl font-extrabold leading-8 text-sky-950">
        Autres moyens de nous contacter
      </h2>

      <div className="flex flex-col gap-8 pb-4">
        {CONTACT_METHODS.map(({ icon: Icon, label, value, note }) => (
          <div key={label} className="flex items-start gap-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl outline outline-2 outline-offset-[-2px] outline-cyan-800/20">
              <Icon className="h-5 w-5 text-cyan-800" />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800/50">
                {label}
              </span>
              <span className="pt-1 text-lg font-bold tracking-tight text-sky-950">
                {value}
              </span>
              <span className="text-sm text-cyan-800/60">{note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-2xl border-t border-gray-200 bg-white/60 p-4 pt-8 outline outline-1 outline-offset-[-1px] outline-white">
        <Info className="h-5 w-5 shrink-0 text-emerald-500" />
        <p className="pr-3.5 text-sm font-medium tracking-tight text-cyan-800/80">
          Une fois votre message envoyé, un consultant logistique dédié vous
          recontactera pour finaliser la configuration de votre compte.
        </p>
      </div>
    </div>
  );
}
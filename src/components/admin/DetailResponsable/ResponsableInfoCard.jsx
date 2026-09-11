import { Mail, Phone, UserRound } from "lucide-react";

function InfoItem({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase leading-4 tracking-wide text-gray-400">
        {label}
      </span>

      <div className="text-base font-medium leading-6 text-gray-900">
        {children}
      </div>
    </div>
  );
}

export default function ResponsableInfoCard({
  firstName,
  lastName,
  fullName,
  role,
  phone,
  email,
  avatar,
}) {
  return (
    <section className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Header de la carte */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-50 p-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-950/5">
            <UserRound className="h-4 w-4 text-sky-950" />
          </div>

          <h2 className="truncate text-base font-bold leading-6 tracking-tight text-sky-950">
            Informations du Responsable
          </h2>
        </div>

        <button
          type="button"
          className="shrink-0 text-sm font-medium leading-5 tracking-tight text-cyan-800"
        >
          Modifier
        </button>
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-10 p-6 sm:p-8">
        {/* Identité */}
        <div className="flex items-center gap-5 sm:gap-6">
          <img
            src={avatar}
            alt={fullName}
            className="size-16 shrink-0 rounded-2xl border-4 border-white object-cover shadow-md sm:size-20"
          />

          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold leading-7 text-sky-950">
              {fullName}
            </h3>

            <p className="text-sm font-medium leading-6 tracking-tight text-cyan-800 sm:text-base">
              {role}
            </p>
          </div>
        </div>

        {/* Informations */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          <InfoItem label="Nom de famille">
            {lastName}
          </InfoItem>

          <InfoItem label="Prénom">
            {firstName}
          </InfoItem>

          <InfoItem label="Téléphone professionnel">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              <span>{phone}</span>
            </div>
          </InfoItem>

          <InfoItem label="Adresse Email">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              <span className="break-all">{email}</span>
            </div>
          </InfoItem>
        </div>
      </div>
    </section>
  );
}
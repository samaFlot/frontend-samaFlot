import image67 from "../../../../src/assets/solution/image67.png"
const VEHICLES_CONTENT = {
  title: "Gestion des véhicules et des agents",
  text: "Centralisez l'intégralité de vos ressources sur un tableau de bord unique. Suivez en temps réel la disponibilité de vos camions et le statut de vos chauffeurs : Disponible, En Mission, ou En Panne. Anticipez les maintenances et gérez les documents administratifs sans effort.",
  image: image67,
};

export default function VehiclesManagementSection() {
  return (
    <section className="w-full bg-gray-50 px-6 py-24 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            {VEHICLES_CONTENT.title}
          </h2>
          <p className="text-lg leading-7 text-gray-600">
            {VEHICLES_CONTENT.text}
          </p>
        </div>
        <div className="flex-1">
          <img
            className="w-full rounded-[48px] object-cover"
            src={VEHICLES_CONTENT.image}
            alt={VEHICLES_CONTENT.title}
          />
        </div>
      </div>
    </section>
  );
}
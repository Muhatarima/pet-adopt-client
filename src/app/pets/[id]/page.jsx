import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AdoptionForm from "@/components/home/AdoptionForm";
import { getPet } from "@/lib/api";

export default async function PetDetailsPage({
  params,
}) {
  const { id } = await params;
  const pet = await getPet(id);

  return (
    <main className="page-surface">
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-lg bg-white p-6 shadow-sm md:grid-cols-2">
          {/* image */}
          <div>
            <img
              src={
                pet.image ||
                "https://i.ibb.co/4fKcz4V/pet.jpg"
              }
              alt={pet.name}
              className="h-[500px] w-full rounded-lg object-cover"
            />
          </div>

          {/* details */}
          <div>
            <h1 className="mb-4 text-5xl font-bold">
              {pet.name}
            </h1>

            <div className="space-y-3 text-lg text-gray-700">
              <p>
                <span className="font-semibold">
                  Species:
                </span>{" "}
                {pet.species}
              </p>

              <p>
                <span className="font-semibold">
                  Breed:
                </span>{" "}
                {pet.breed}
              </p>

              <p>
                <span className="font-semibold">
                  Age:
                </span>{" "}
                {pet.age}
              </p>

              <p><span className="font-semibold">Gender:</span> {pet.gender}</p>
              <p><span className="font-semibold">Health:</span> {pet.healthStatus}</p>
              <p><span className="font-semibold">Vaccination:</span> {pet.vaccinationStatus}</p>
              <p><span className="font-semibold">Adoption Fee:</span> ${pet.adoptionFee || 0}</p>

              <p>
                <span className="font-semibold">
                  Location:
                </span>{" "}
                {pet.location}
              </p>

              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}
                {pet.adoptionStatus}
              </p>
              <p>{pet.description}</p>
            </div>

            <AdoptionForm pet={pet} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

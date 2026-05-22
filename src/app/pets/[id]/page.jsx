import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AdoptionForm from "@/components/home/AdoptionForm";

async function getPet(id) {
  const res = await fetch(
    `http://localhost:5000/pets/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function PetDetailsPage({
  params,
}) {
  const pet = await getPet(params.id);

  return (
    <main>
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {/* image */}
          <div>
            <img
              src={
                pet.image ||
                "https://i.ibb.co/4fKcz4V/pet.jpg"
              }
              alt={pet.name}
              className="h-[500px] w-full rounded-3xl object-cover"
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
            </div>

            <AdoptionForm pet={pet} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
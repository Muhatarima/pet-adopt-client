import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PetCard from "@/components/home/PetCard";
import { getPets } from "@/services/api";

export default async function Home() {

  const pets = await getPets();
  return (
    <main>
      <Navbar />

      <section className="flex min-h-[85vh] items-center justify-center bg-gradient-to-b from-emerald-50 to-white px-6">
        <div className="max-w-3xl text-center">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            Adopt Your Perfect Pet
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Find loving dogs, cats, birds, and rabbits waiting for a forever home.
          </p>
          <button className="rounded-xl bg-emerald-600 px-8 py-4 text-white">
            Adopt Now
          </button>
        </div>
      </section>

      <section className="px-6 py-20">
  <h2 className="mb-10 text-center text-4xl font-bold">
    Featured Pets
  </h2>

  <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
    {pets.slice(0, 6).map((pet) => (
      <PetCard key={pet._id} pet={pet} />
    ))}
  </div>
</section>

      <section className="px-6 py-20">
        <h2 className="mb-10 text-center text-4xl font-bold">Why Adopt?</h2>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {["Save a life", "Find a loyal friend", "Support shelters"].map((item) => (
            <div key={item} className="rounded-2xl border p-8 shadow-sm">
              <h3 className="mb-3 text-2xl font-semibold">{item}</h3>
              <p className="text-gray-600">
                Adoption gives pets a second chance and brings joy to your family.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 px-6 py-20">
        <h2 className="mb-10 text-center text-4xl font-bold">Pet Care Tips</h2>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {["Regular vet visits", "Healthy food", "Daily playtime"].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">{item}</h3>
              <p className="text-gray-600">
                Small daily care habits help pets stay happy, active, and healthy.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <h2 className="mb-6 text-center text-4xl font-bold">Success Stories</h2>
        <p className="mx-auto max-w-3xl text-center text-gray-600">
          Hundreds of pets have found safe, caring homes through PetAdopt.
        </p>
      </section>

      <Footer />
    </main>
  );
}
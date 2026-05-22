import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import PetCard from "../components/home/PetCard";
import Link from "next/link";
import { getPets } from "@/lib/api";


export default async function Home() {

  const pets = await getPets();
  return (
    <main className="page-surface">
      <Navbar />

      <section className="flex min-h-[78vh] items-center px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-emerald-700">
            Safe homes, happy pets
          </p>
          <h1 className="mb-4 text-5xl font-bold leading-tight text-slate-950 md:text-6xl">
            Adopt Your Perfect Pet
          </h1>
          <p className="mb-6 max-w-xl text-lg leading-8 text-slate-600">
            Find loving dogs, cats, birds, and rabbits waiting for a forever home.
          </p>
          <Link href="/pets" className="inline-block rounded-lg bg-emerald-600 px-8 py-4 font-medium text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
            Adopt Now
          </Link>
          </div>
          <div className="hidden overflow-hidden rounded-lg border border-emerald-100 bg-white p-3 shadow-xl md:block">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80"
              alt="Happy adopted pets"
              className="h-[430px] w-full rounded-lg object-cover"
            />
          </div>
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
            <div key={item} className="soft-card rounded-lg p-8">
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
            <div key={item} className="soft-card rounded-lg p-8">
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

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-3xl font-bold">Meet Local Shelters</h2>
            <p className="text-gray-600">
              Connect with responsible owners and shelters who keep each listing updated.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-3xl font-bold">Simple Adoption Steps</h2>
            <p className="text-gray-600">
              View a pet, send a pickup request, and track approval from your dashboard.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

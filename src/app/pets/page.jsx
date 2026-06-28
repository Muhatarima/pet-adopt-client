import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PetCard from "@/components/home/PetCard";
import { getPets } from "@/lib/api";

export default async function PetsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const species = params?.species || "";

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (species) query.set("species", species);

  const pets = await getPets(query.toString() ? `?${query.toString()}` : "");

  return (
    <main className="page-surface">
      <Navbar />

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
            <h1 className="text-4xl font-bold">All Pets</h1>
            <p className="mt-2 text-gray-600">Browse pets waiting for adoption.</p>

            <form className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
              <input
                type="text"
                name="search"
                placeholder="Search by name"
                defaultValue={search}
                className="rounded-lg border px-4 py-3"
              />

              <select
                name="species"
                defaultValue={species}
                className="rounded-lg border px-4 py-3"
              >
                <option value="">All species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
              </select>

              <button className="rounded-lg bg-emerald-600 px-8 py-3 font-medium text-white hover:bg-emerald-700">
                Search
              </button>
            </form>
          </div>

          {pets.length === 0 ? (
            <div className="soft-card rounded-lg p-10 text-center">
              No pets found.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PetCard from "@/components/home/PetCard";

async function getPets(search = "", species = "") {
  const res = await fetch(
    `http://localhost:5000/pets?search=${search}&species=${species}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function PetsPage({
  searchParams,
}) {
  const search = searchParams.search || "";
  const species = searchParams.species || "";

  const pets = await getPets(search, species);

  return (
    <main>
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-10 text-center text-5xl font-bold">
            All Pets
          </h1>

          {/* search/filter */}
          <form className="mb-10 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              name="search"
              placeholder="Search pets..."
              defaultValue={search}
              className="w-full rounded-xl border p-4"
            />

            <select
              name="species"
              defaultValue={species}
              className="rounded-xl border p-4"
            >
              <option value="">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
            </select>

            <button className="rounded-xl bg-emerald-600 px-8 py-4 text-white">
              Search
            </button>
          </form>

          {/* pets */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
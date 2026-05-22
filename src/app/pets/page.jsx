"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PetCard from "@/components/home/PetCard";
import { BASE_URL } from "@/lib/api";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (species) params.set("species", species);

    fetch(`${BASE_URL}/pets?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setPets(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [search, species]);

  const speciesList = [...new Set(pets.map((pet) => pet.species).filter(Boolean))];

  return (
    <main className="page-surface">
      <Navbar />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 rounded-lg border border-emerald-100 bg-white p-6 shadow-sm md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold">All Pets</h1>
              <p className="mt-2 text-gray-600">Browse pets waiting for adoption.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="rounded-lg border px-4 py-3"
              />
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="rounded-lg border px-4 py-3"
              >
                <option value="">All species</option>
                {speciesList.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="py-20 text-center">Loading pets...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

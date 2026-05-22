"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyPetsPage() {
  const [pets, setPets] = useState([]);

  // temporary email
  const email = "owner@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:5000/my-pets?email=${email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this pet?");

    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/pets/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setPets(pets.filter((pet) => pet._id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-5xl font-bold">
          My Listings
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="rounded-3xl bg-white p-5 shadow"
            >
              <img
                src={
                  pet.image ||
                  "https://i.ibb.co/4fKcz4V/pet.jpg"
                }
                alt={pet.name}
                className="mb-4 h-60 w-full rounded-2xl object-cover"
              />

              <h2 className="text-2xl font-bold">
                {pet.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {pet.species}
              </p>

              <p className="mt-1 text-sm">
                Status: {pet.adoptionStatus}
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href={`/pets/${pet._id}`}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(pet._id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
                <Link
  href={`/dashboard/edit-pet/${pet._id}`}
  className="rounded-xl bg-blue-500 px-4 py-2 text-white"
>
  Edit
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
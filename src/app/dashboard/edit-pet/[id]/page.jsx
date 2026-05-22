"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/pets/${id}`)
      .then((res) => res.json())
      .then((data) => setPet(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedPet = {
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: Number(form.age.value),
      gender: form.gender.value,
      image: form.image.value,
      location: form.location.value,
      adoptionFee: Number(form.adoptionFee.value),
      description: form.description.value,
    };

    const res = await fetch(`http://localhost:5000/pets/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedPet),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      router.push("/dashboard/my-pets");
    }
  };

  if (!pet) return <p className="p-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-8 text-center text-4xl font-bold">Edit Pet</h1>

        <form onSubmit={handleUpdate} className="grid gap-5 md:grid-cols-2">
          <input name="name" defaultValue={pet.name} className="rounded-xl border p-4" />
          <input name="species" defaultValue={pet.species} className="rounded-xl border p-4" />
          <input name="breed" defaultValue={pet.breed} className="rounded-xl border p-4" />
          <input name="age" type="number" defaultValue={pet.age} className="rounded-xl border p-4" />
          <input name="gender" defaultValue={pet.gender} className="rounded-xl border p-4" />
          <input name="image" defaultValue={pet.image} className="rounded-xl border p-4" />
          <input name="location" defaultValue={pet.location} className="rounded-xl border p-4" />
          <input name="adoptionFee" type="number" defaultValue={pet.adoptionFee} className="rounded-xl border p-4" />

          <textarea
            name="description"
            defaultValue={pet.description}
            className="rounded-xl border p-4 md:col-span-2"
            rows="5"
          />

          <button className="rounded-xl bg-emerald-600 py-4 text-white md:col-span-2">
            Update Pet
          </button>
        </form>
      </div>
    </main>
  );
}
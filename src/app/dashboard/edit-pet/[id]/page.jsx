"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BASE_URL, apiFetch } from "@/lib/api";

export default function EditPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/pets/${id}`)
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
      healthStatus: form.healthStatus.value,
      vaccinationStatus: form.vaccinationStatus.value,
      location: form.location.value,
      adoptionFee: Number(form.adoptionFee.value),
      description: form.description.value,
    };

    try {
      const data = await apiFetch(`/pets/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPet),
      });

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success("Pet updated");
        router.push("/dashboard/my-pets");
      }
    } catch (error) {
      toast.error(error.message || "Could not update pet");
    }
  };

  if (!pet) return <p className="p-10">Loading...</p>;

  return (
    <div className="soft-card rounded-lg p-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Edit Pet</h1>

      <form onSubmit={handleUpdate} className="grid gap-5 md:grid-cols-2">
        <input name="name" defaultValue={pet.name} className="rounded-lg border p-4" required />
        <input name="species" defaultValue={pet.species} className="rounded-lg border p-4" required />
        <input name="breed" defaultValue={pet.breed} className="rounded-lg border p-4" required />
        <input name="age" type="number" defaultValue={pet.age} className="rounded-lg border p-4" required />
        <input name="gender" defaultValue={pet.gender} className="rounded-lg border p-4" required />
        <input name="image" defaultValue={pet.image} className="rounded-lg border p-4" required />
        <input name="healthStatus" defaultValue={pet.healthStatus} className="rounded-lg border p-4" required />
        <input name="vaccinationStatus" defaultValue={pet.vaccinationStatus} className="rounded-lg border p-4" required />
        <input name="location" defaultValue={pet.location} className="rounded-lg border p-4" required />
        <input name="adoptionFee" type="number" defaultValue={pet.adoptionFee} className="rounded-lg border p-4" required />

        <textarea
          name="description"
          defaultValue={pet.description}
          className="rounded-lg border p-4 md:col-span-2"
          rows="5"
          required
        />

        <button className="rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700 md:col-span-2">
          Update Pet
        </button>
      </form>
    </div>
  );
}

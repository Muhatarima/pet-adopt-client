"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function AddPetPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email || "";

  const handleAddPet = async (e) => {
    e.preventDefault();
    const form = e.target;

    const pet = {
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
      ownerEmail: email,
      adoptionStatus: "available",
      createdAt: new Date().toISOString(),
    };

    try {
      const data = await apiFetch("/pets", {
        method: "POST",
        body: JSON.stringify(pet),
      });

      if (data.insertedId || data.acknowledged) {
        toast.success("Pet added successfully");
        router.push("/dashboard/my-pets");
      }
    } catch (error) {
      toast.error(error.message || "Could not add pet");
    }
  };

  return (
    <div className="soft-card rounded-lg p-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Add Pet</h1>

      <form onSubmit={handleAddPet} className="grid gap-5 md:grid-cols-2">
        <input name="name" placeholder="Pet Name" className="rounded-lg border p-4" required />
        <input name="species" placeholder="Species" className="rounded-lg border p-4" required />
        <input name="breed" placeholder="Breed" className="rounded-lg border p-4" required />
        <input name="age" type="number" placeholder="Age" className="rounded-lg border p-4" required />
        <input name="gender" placeholder="Gender" className="rounded-lg border p-4" required />
        <input name="image" placeholder="Image URL" className="rounded-lg border p-4" required />
        <input name="healthStatus" placeholder="Health Status" className="rounded-lg border p-4" required />
        <input name="vaccinationStatus" placeholder="Vaccination Status" className="rounded-lg border p-4" required />
        <input name="location" placeholder="Location" className="rounded-lg border p-4" required />
        <input name="adoptionFee" type="number" placeholder="Adoption Fee" className="rounded-lg border p-4" required />

        <input
          value={email}
          readOnly
          className="rounded-lg border bg-gray-100 p-4 md:col-span-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="rounded-lg border p-4 md:col-span-2"
          rows="5"
          required
        />

        <button className="rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700 md:col-span-2">
          Add Pet
        </button>
      </form>
    </div>
  );
}

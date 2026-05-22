"use client";
import toast from "react-hot-toast";

export default function AddPetPage() {
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
      ownerEmail: form.ownerEmail.value,
    };

    const res = await fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pet),
    });

    const data = await res.json();

    if (data.insertedId) {
     toast.success("Adoption request submitted");
      form.reset();
    }
  };

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-8 text-center text-4xl font-bold">Add Pet</h1>

        <form onSubmit={handleAddPet} className="grid gap-5 md:grid-cols-2">
          <input name="name" placeholder="Pet Name" className="rounded-xl border p-4" required />
          <input name="species" placeholder="Species" className="rounded-xl border p-4" required />
          <input name="breed" placeholder="Breed" className="rounded-xl border p-4" />
          <input name="age" type="number" placeholder="Age" className="rounded-xl border p-4" />
          <input name="gender" placeholder="Gender" className="rounded-xl border p-4" />
          <input name="image" placeholder="Image URL" className="rounded-xl border p-4" />
          <input name="healthStatus" placeholder="Health Status" className="rounded-xl border p-4" />
          <input name="vaccinationStatus" placeholder="Vaccination Status" className="rounded-xl border p-4" />
          <input name="location" placeholder="Location" className="rounded-xl border p-4" />
          <input name="adoptionFee" type="number" placeholder="Adoption Fee" className="rounded-xl border p-4" />

          <input
            name="ownerEmail"
            placeholder="Owner Email"
            className="rounded-xl border p-4 md:col-span-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="rounded-xl border p-4 md:col-span-2"
            rows="5"
          />

          <button className="rounded-xl bg-emerald-600 py-4 text-white md:col-span-2">
            Add Pet
          </button>
        </form>
      </div>
    </main>
  );
}
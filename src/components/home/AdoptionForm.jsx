"use client";

import { useRouter } from "next/navigation";

export default function AdoptionForm({ pet }) {
  const router = useRouter();

  const handleAdoption = async (e) => {
    e.preventDefault();

    const form = e.target;

    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      ownerEmail: pet.ownerEmail,
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      pickupDate: form.pickupDate.value,
      message: form.message.value,
    };

    const res = await fetch(
      "http://localhost:5000/adoptions",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(adoptionData),
      }
    );

    const data = await res.json();

    if (data.insertedId) {
      alert("Adoption request submitted");
      form.reset();

      router.push("/dashboard/my-requests");
    }
  };

  return (
    <form
      onSubmit={handleAdoption}
      className="mt-8 space-y-4"
    >
      <input
        defaultValue={pet.name}
        readOnly
        className="w-full rounded-xl border p-4"
      />

      <input
        name="userName"
        placeholder="Your Name"
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="userEmail"
        type="email"
        placeholder="Your Email"
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="pickupDate"
        type="date"
        className="w-full rounded-xl border p-4"
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        rows="4"
        className="w-full rounded-xl border p-4"
      />

      <button className="w-full rounded-xl bg-emerald-600 py-4 text-white">
        Submit Adoption Request
      </button>
    </form>
  );
}
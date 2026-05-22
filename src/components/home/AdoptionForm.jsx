"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function AdoptionForm({ pet }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleAdoption = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before adopting");
      router.push(`/login?redirect=/pets/${pet._id}`);
      return;
    }

    if (user.email === pet.ownerEmail) {
      toast.error("Owners cannot adopt their own pet");
      return;
    }

    if (pet.adoptionStatus === "adopted") {
      toast.error("This pet is already adopted");
      return;
    }

    const form = e.target;
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      ownerEmail: pet.ownerEmail,
      userName: user.name,
      userEmail: user.email,
      pickupDate: form.pickupDate.value,
      message: form.message.value,
      requestDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      const data = await apiFetch("/adoptions", {
        method: "POST",
        body: JSON.stringify(adoptionData),
      });

      if (data.insertedId || data.acknowledged) {
        toast.success("Adoption request submitted");
        form.reset();
        router.push("/dashboard/my-requests");
      }
    } catch (error) {
      toast.error(error.message || "Could not submit request");
    }
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push(`/login?redirect=/pets/${pet._id}`)}
        className="mt-8 w-full rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700"
      >
        Login to Adopt
      </button>
    );
  }

  const disabled = user.email === pet.ownerEmail || pet.adoptionStatus === "adopted";

  return (
    <form onSubmit={handleAdoption} className="mt-8 space-y-4">
      <input defaultValue={pet.name} readOnly className="w-full rounded-lg border p-4" />
      <input value={user.name || ""} readOnly className="w-full rounded-lg border p-4" />
      <input value={user.email || ""} readOnly className="w-full rounded-lg border p-4" />

      <input
        name="pickupDate"
        type="date"
        className="w-full rounded-lg border p-4"
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        rows="4"
        className="w-full rounded-lg border p-4"
      />

      <button
        disabled={disabled}
        className="w-full rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {disabled ? "Adoption Unavailable" : "Submit Adoption Request"}
      </button>
    </form>
  );
}

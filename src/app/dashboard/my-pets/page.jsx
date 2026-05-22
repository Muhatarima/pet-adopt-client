"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BASE_URL, apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyPetsPage() {
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activePet, setActivePet] = useState(null);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;
    fetch(`${BASE_URL}/my-pets?email=${encodeURIComponent(email)}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPets(Array.isArray(data) ? data : []));
  }, [email]);

  const loadRequests = async (pet) => {
    setActivePet(pet);
    try {
      const res = await fetch(`${BASE_URL}/adoptions/pet/${pet._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this pet?")) return;

    try {
      const data = await apiFetch(`/pets/${id}`, { method: "DELETE" });
      if (data.deletedCount > 0) {
        toast.success("Pet deleted");
        setPets(pets.filter((pet) => pet._id !== id));
      }
    } catch (error) {
      toast.error(error.message || "Could not delete pet");
    }
  };

  const updateRequest = async (request, status) => {
    try {
      await apiFetch(`/adoptions/${request._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, petId: request.petId }),
      });

      if (status === "approved") {
        await apiFetch(`/pets/${request.petId}`, {
          method: "PATCH",
          body: JSON.stringify({ adoptionStatus: "adopted" }),
        });
      }

      toast.success(`Request ${status}`);
      setRequests((items) =>
        items.map((item) =>
          item._id === request._id ? { ...item, status } : item
        )
      );
      if (status === "approved") {
        setPets((items) =>
          items.map((pet) =>
            pet._id === request.petId ? { ...pet, adoptionStatus: "adopted" } : pet
          )
        );
      }
    } catch (error) {
      toast.error(error.message || "Could not update request");
    }
  };

  const total = pets.length;
  const adopted = pets.filter((pet) => pet.adoptionStatus === "adopted").length;
  const available = total - adopted;

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">My Listings</h1>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Stat label="Total Listings" value={total} />
        <Stat label="Available" value={available} />
        <Stat label="Adopted" value={adopted} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <div key={pet._id} className="soft-card rounded-lg p-5">
            <img
              src={pet.image || "https://i.ibb.co/4fKcz4V/pet.jpg"}
              alt={pet.name}
              className="mb-4 h-60 w-full rounded-lg object-cover"
            />
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p className="mt-1 text-gray-600">{pet.species}</p>
            <p className="mt-1 font-semibold">${pet.adoptionFee || 0}</p>
            <p className="mt-1 text-sm">Status: {pet.adoptionStatus || "available"}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => loadRequests(pet)} className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-800">
                Requests
              </button>
              <Link href={`/dashboard/edit-pet/${pet._id}`} className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Edit
              </Link>
              <Link href={`/pets/${pet._id}`} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                View
              </Link>
              <button onClick={() => handleDelete(pet._id)} className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {activePet && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex justify-between gap-4">
              <h2 className="text-2xl font-bold">Requests for {activePet.name}</h2>
              <button onClick={() => setActivePet(null)} className="rounded-lg border px-3 py-1">Close</button>
            </div>
            <div className="space-y-3">
              {requests.length === 0 && <p>No requests yet.</p>}
              {requests.map((req) => (
                <div key={req._id} className="rounded-lg border p-4">
                  <p className="font-semibold">{req.userName}</p>
                  <p>{req.userEmail}</p>
                  <p>Pickup Date: {req.pickupDate}</p>
                  <p>Status: {req.status}</p>
                  {req.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => updateRequest(req, "approved")} className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
                        Approve
                      </button>
                      <button onClick={() => updateRequest(req, "rejected")} className="rounded-lg bg-red-500 px-4 py-2 text-white">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="soft-card rounded-lg p-5">
      <p className="text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

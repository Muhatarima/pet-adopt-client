"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);

  // temporary email
  const email = "rocky@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:5000/adoptions?email=${email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const handleCancel = async (id) => {
    const res = await fetch(`http://localhost:5000/adoptions/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setRequests(requests.filter((req) => req._id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-5xl font-bold">My Requests</h1>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow md:flex-row md:items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">{req.petName}</h2>
                <p>Pickup Date: {req.pickupDate}</p>
                <p>Status: {req.status}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/pets/${req.petId}`}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
                >
                  View
                </Link>

                <button
                  onClick={() => handleCancel(req._id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
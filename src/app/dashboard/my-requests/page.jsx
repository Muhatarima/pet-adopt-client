"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BASE_URL, apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;
    fetch(`${BASE_URL}/adoptions?email=${encodeURIComponent(email)}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []));
  }, [email]);

  const handleCancel = async (id) => {
    try {
      const data = await apiFetch(`/adoptions/${id}`, { method: "DELETE" });
      if (data.deletedCount > 0) {
        toast.success("Request cancelled");
        setRequests(requests.filter((req) => req._id !== id));
      }
    } catch (error) {
      toast.error(error.message || "Could not cancel request");
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">My Requests</h1>

      <div className="space-y-4">
        {requests.length === 0 && (
          <div className="soft-card rounded-lg p-8 text-center">
            No adoption requests found.
          </div>
        )}

        {requests.map((req) => (
          <div
            key={req._id}
            className="soft-card flex flex-col justify-between gap-4 rounded-lg p-5 md:flex-row md:items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">{req.petName}</h2>
              <p>Request Date: {req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "N/A"}</p>
              <p>Pickup Date: {req.pickupDate}</p>
              <p>Status: {req.status || "pending"}</p>
            </div>

            <div className="flex gap-3">
              <Link href={`/pets/${req.petId}`} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                View
              </Link>

              <button onClick={() => handleCancel(req._id)} className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
export default function PetCard({ pet }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <img
        src={
          pet.image ||
          "https://i.ibb.co/4fKcz4V/pet.jpg"
        }
        alt={pet.name}
        className="mb-4 h-60 w-full rounded-xl object-cover"
      />

      <h3 className="text-2xl font-bold">
        {pet.name}
      </h3>

      <p className="mt-2 text-gray-600">
        {pet.species} • {pet.breed}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {pet.location}
      </p>

      <button className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-white">
        View Details
      </button>
    </div>
  );
}
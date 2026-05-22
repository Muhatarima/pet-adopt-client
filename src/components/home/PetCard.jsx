import Link from "next/link";

export default function PetCard({ pet }) {
  return (
    <div className="soft-card rounded-lg p-5 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={
          pet.image ||
          "https://i.ibb.co/4fKcz4V/pet.jpg"
        }
        alt={pet.name}
        className="mb-4 h-60 w-full rounded-lg object-cover"
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
      <p className="mt-2 font-semibold text-emerald-700">
        Fee: ${pet.adoptionFee || 0}
      </p>

      <Link href={`/pets/${pet._id}`}>
        <button className="mt-5 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700">
          View Details
        </button>
      </Link>
    </div>
  );
}

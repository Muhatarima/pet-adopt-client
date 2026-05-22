import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-6 text-center">
      <h1 className="mb-4 text-7xl font-bold text-emerald-600">
        404
      </h1>

      <h2 className="mb-3 text-3xl font-bold">
        Page Not Found
      </h2>

      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="rounded-xl bg-emerald-600 px-8 py-4 text-white"
      >
        Back To Home
      </Link>
    </main>
  );
}
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-4xl font-bold">Register</h1>

        <form className="space-y-4">
          <input className="w-full rounded-xl border p-4" placeholder="Name" />
          <input className="w-full rounded-xl border p-4" type="email" placeholder="Email" />
          <input className="w-full rounded-xl border p-4" placeholder="Photo URL" />
          <input className="w-full rounded-xl border p-4" type="password" placeholder="Password" />
          <input className="w-full rounded-xl border p-4" type="password" placeholder="Confirm Password" />

          <button className="w-full rounded-xl bg-emerald-600 py-4 text-white">
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account? <Link className="text-emerald-600" href="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-4xl font-bold">Login</h1>

        <form className="space-y-4">
          <input className="w-full rounded-xl border p-4" type="email" placeholder="Email" />
          <input className="w-full rounded-xl border p-4" type="password" placeholder="Password" />

          <button className="w-full rounded-xl bg-emerald-600 py-4 text-white">
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          New here? <Link className="text-emerald-600" href="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}
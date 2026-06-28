"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const { error } = await signIn.email({
      email: form.email.value,
      password: form.password.value,
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Login successful");
    router.push(redirect);
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: redirect,
      });

      if (error) {
        toast.error(error.message || "Google login is not configured");
      }
    } catch {
      toast.error("Google login is not configured yet");
    }
  };

  return (
    <main className="page-surface flex min-h-screen items-center justify-center px-6">
      <div className="soft-card w-full max-w-md rounded-lg p-8">
        <h1 className="mb-6 text-center text-4xl font-bold text-slate-950">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            className="w-full rounded-lg border p-4"
            type="email"
            placeholder="Email"
            required
          />

          <input
            name="password"
            className="w-full rounded-lg border p-4"
            type="password"
            placeholder="Password"
            required
          />

          <button className="w-full rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full rounded-lg border border-emerald-300 bg-white py-4 font-medium text-slate-800 hover:border-emerald-500 hover:bg-emerald-50"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-gray-600">
          New here?{" "}
          <Link className="text-emerald-600" href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

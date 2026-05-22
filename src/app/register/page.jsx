"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.password.value !== form.confirmPassword.value) {
      return toast.error("Passwords do not match");
    }

    const { error } = await signUp.email({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      image: form.photo.value,
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Registration successful");
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-4xl font-bold">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" className="w-full rounded-xl border p-4" placeholder="Name" required />
          <input name="email" className="w-full rounded-xl border p-4" type="email" placeholder="Email" required />
          <input name="photo" className="w-full rounded-xl border p-4" placeholder="Photo URL" />
          <input name="password" className="w-full rounded-xl border p-4" type="password" placeholder="Password" required />
          <input name="confirmPassword" className="w-full rounded-xl border p-4" type="password" placeholder="Confirm Password" required />

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
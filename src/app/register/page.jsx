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

    const password = form.password.value;
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return toast.error("Password needs uppercase and lowercase letters");
    }

    const { error } = await signUp.email({
      name: form.name.value,
      email: form.email.value,
      password,
      image: form.photo.value,
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Registration successful");
    router.push("/login");
  };

  return (
    <main className="page-surface flex min-h-screen items-center justify-center px-6 py-10">
      <div className="soft-card w-full max-w-md rounded-lg p-8">
        <h1 className="mb-6 text-center text-4xl font-bold">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" className="w-full rounded-lg border p-4" placeholder="Name" required />
          <input name="email" className="w-full rounded-lg border p-4" type="email" placeholder="Email" required />
          <input name="photo" className="w-full rounded-lg border p-4" placeholder="Photo URL" />
          <input name="password" className="w-full rounded-lg border p-4" type="password" placeholder="Password" required />
          <input name="confirmPassword" className="w-full rounded-lg border p-4" type="password" placeholder="Confirm Password" required />

          <button className="w-full rounded-lg bg-emerald-600 py-4 font-medium text-white hover:bg-emerald-700">
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

"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-700 md:text-3xl"
          >
            PetAdopt Haven
          </Link>

          <div className="hidden items-center gap-6 font-medium text-slate-700 md:flex">
            <Link className="hover:text-emerald-700" href="/">Home</Link>
            <Link className="hover:text-emerald-700" href="/pets">All Pets</Link>
            {session && (
              <>
                <Link className="hover:text-emerald-700" href="/dashboard/my-requests">My Requests</Link>
                <Link className="hover:text-emerald-700" href="/dashboard/add-pet">Add Pet</Link>
              </>
            )}
          </div>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-2 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <img
                  src={session.user?.image || "https://i.ibb.co/4fKcz4V/pet.jpg"}
                  alt={session.user?.name || "User"}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="hidden font-medium md:inline">
                  {session.user?.name || "Profile"}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border bg-white p-3 shadow">
                  <Link className="block rounded-lg px-3 py-2 hover:bg-emerald-50" href="/dashboard/my-pets">
                    Dashboard
                  </Link>
                  <Link className="block rounded-lg px-3 py-2 hover:bg-emerald-50" href="/dashboard/add-pet">
                    Add Pet
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}

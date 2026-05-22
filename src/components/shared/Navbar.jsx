"use client";

import Link from "next/link";
import Container from "./Container";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-emerald-600"
          >
            PetAdopt
          </Link>

          {/* nav links */}
          <div className="hidden items-center gap-6 font-medium md:flex">
            <Link href="/">Home</Link>

            <Link href="/pets">All Pets</Link>

            {session && (
              <>
                <Link href="/dashboard/add-pet">
                  Add Pet
                </Link>

                <Link href="/dashboard/my-pets">
                  My Listings
                </Link>

                <Link href="/dashboard/my-requests">
                  My Requests
                </Link>
              </>
            )}
          </div>

          {/* auth buttons */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-xl bg-red-500 px-6 py-3 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}
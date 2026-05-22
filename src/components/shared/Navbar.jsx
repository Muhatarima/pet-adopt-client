"use client";

import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
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

            <Link href="/dashboard/add-pet">Add Pet</Link>

            <Link href="/dashboard/my-pets">My Listings</Link>

            <Link href="/dashboard/my-requests">
              My Requests
            </Link>
          </div>

          {/* auth */}
          <button className="rounded-xl bg-emerald-600 px-6 py-3 text-white">
            Login
          </button>
        </div>
      </Container>
    </nav>
  );
}
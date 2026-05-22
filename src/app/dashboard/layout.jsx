"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useSession } from "@/lib/auth-client";

const links = [
  { href: "/dashboard/my-requests", label: "My Requests" },
  { href: "/dashboard/add-pet", label: "Add Pet" },
  { href: "/dashboard/my-pets", label: "My Listings" },
];

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session) {
    return <main className="p-10 text-center">Loading...</main>;
  }

  return (
    <>
      <Navbar />
      <main className="page-surface min-h-screen px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
          <aside className="soft-card h-fit rounded-lg p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-2 block rounded-lg px-4 py-3 font-medium ${
                  pathname === link.href
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-emerald-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </aside>
          <section>{children}</section>
        </div>
      </main>
      <Footer />
    </>
  );
}

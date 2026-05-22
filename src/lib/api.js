export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Request failed");
  }

  return res.json();
}

export async function getPets(query = "") {
  const res = await fetch(`${BASE_URL}/pets${query}`, { cache: "no-store" });
  return res.json();
}

export async function getPet(id) {
  const res = await fetch(`${BASE_URL}/pets/${id}`, { cache: "no-store" });
  return res.json();
}

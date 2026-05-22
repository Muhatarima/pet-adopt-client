const BASE_URL = "http://localhost:5000";

export async function getPets() {
  const res = await fetch(`${BASE_URL}/pets`, {
    cache: "no-store",
  });

  return res.json();
}
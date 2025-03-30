// utils/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function postToAPI(path: string, body: any) {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}

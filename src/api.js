import { API_KEY, BASE_URL } from "./config";

async function request(url) {
  const res = await fetch(url);
  if (res.status === 401) throw new Error("Invalid API key. Add your Spoonacular key in src/config.js");
  if (res.status === 402) throw new Error("Daily API limit reached, try again tomorrow.");
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function searchRecipes(query) {
  const params = new URLSearchParams({ apiKey: API_KEY, query, number: 12 });
  return request(`${BASE_URL}/complexSearch?${params}`);
}

export function getRecipe(id) {
  const params = new URLSearchParams({ apiKey: API_KEY });
  return request(`${BASE_URL}/${id}/information?${params}`);
}

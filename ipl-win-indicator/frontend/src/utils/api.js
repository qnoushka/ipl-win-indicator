const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const token = localStorage.getItem("ipl_token");
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Request failed");
  return data;
}

export const api = {
  // Auth
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login:    (body) => request("/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  me:       ()     => request("/auth/me"),

  // Teams
  getTeams: ()   => request("/teams"),
  getTeam:  (id) => request(`/teams/${id}`),

  // Matches
  getMatches: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/matches${q ? "?" + q : ""}`);
  },

  // Predict
  predict: (body) => request("/predict", { method: "POST", body: JSON.stringify(body) }),

  // Favorites
  getFavorites:   ()   => request("/favorites"),
  addFavorite:    (id) => request(`/favorites/${id}`, { method: "POST" }),
  removeFavorite: (id) => request(`/favorites/${id}`, { method: "DELETE" }),
};
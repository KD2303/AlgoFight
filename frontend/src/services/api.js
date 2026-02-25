const API_URL = "http://localhost:3001";

/**
 * Sync Firebase user to backend after login/signup
 */
export async function syncUserToBackend({ uid, email, displayName, photoURL }) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, email, displayName, photoURL }),
  });
  return res.json();
}

/**
 * Fetch leaderboard data from backend
 */
export async function fetchLeaderboard() {
  const res = await fetch(`${API_URL}/api/leaderboard`);
  return res.json();
}

/**
 * Fetch user profile by Firebase UID
 */
export async function fetchUserProfile(uid) {
  const res = await fetch(`${API_URL}/api/users/${uid}`);
  if (!res.ok) return null;
  return res.json();
}

export { API_URL };

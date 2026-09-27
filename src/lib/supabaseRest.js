const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const SESSION_KEY = "jtc_supabase_session_v1";

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function saveSession(payload) {
  const expiresAt = Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600);
  const session = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_at: expiresAt,
    user: payload.user || null,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  sessionStorage.setItem("jtc_admin_session", "1");
  return session;
}

export function getStoredSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

async function authRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.msg || data.message || "Authentication failed");
  return data;
}

export async function signInWithPassword(email, password) {
  if (!isSupabaseConfigured()) throw new Error("Secure admin database is not configured yet.");
  const data = await authRequest("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return saveSession(data);
}

async function getAccessToken() {
  let session = getStoredSession();
  if (!session?.access_token) return null;

  if (session.expires_at && session.expires_at > Math.floor(Date.now() / 1000) + 60) {
    return session.access_token;
  }

  if (!session.refresh_token) return null;
  try {
    const data = await authRequest("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    session = saveSession(data);
    return session.access_token;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem("jtc_admin_session");
}

export async function signOut() {
  const token = await getAccessToken();
  if (token && isSupabaseConfigured()) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
    }).catch(() => null);
  }
  clearSession();
}

async function restRequest(path, options = {}) {
  if (!isSupabaseConfigured()) throw new Error("Secure database is not configured.");
  const token = await getAccessToken();
  if (!token) throw new Error("AUTH_REQUIRED");

  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.hint || `Database request failed (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json().catch(() => null);
}

export async function getReminders() {
  return (await restRequest("/reminders?select=id,type,name,date,created_at&order=name.asc")) || [];
}

export async function addReminder(record) {
  const result = await restRequest("/reminders", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(record),
  });
  return result?.[0] || null;
}

export async function deleteReminder(id) {
  return restRequest(`/reminders?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}

export async function importReminders(records) {
  if (!Array.isArray(records) || records.length === 0) return [];
  return (await restRequest("/reminders?on_conflict=owner_id,type,name,date", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(records),
  })) || [];
}

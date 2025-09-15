const TOKEN_KEY = "token";
const USER_KEY = "user";

const API_URL = "http://localhost:5000";


export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? `Bearer ${token}` : null;
};
export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};


export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || "Signup failed");
    }

    setToken(json.token);
    setUser(json.user);

    return json;
  } catch (err) {
    console.error("Register Error:", err.message);
    throw err;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || "Login failed");
    }

    setToken(json.token);
    setUser(json.user);

    return json;
  } catch (err) {
    console.error("Login Error:", err.message);
    throw err;
  }
};


export const getProfile = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: token },
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Failed to fetch profile");
    }

    return res.json();
  } catch (err) {
    console.error("Profile Error:", err.message);
    throw err;
  }
};

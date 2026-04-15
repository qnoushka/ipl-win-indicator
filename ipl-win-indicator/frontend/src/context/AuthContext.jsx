import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // When app loads, check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("ipl_token");
    if (token) {
      api.me()
        .then(setUser)
        .catch(() => localStorage.removeItem("ipl_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    localStorage.setItem("ipl_token", data.token);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    localStorage.setItem("ipl_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("ipl_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Any component can call useAuth() to get user info or login/logout
export const useAuth = () => useContext(AuthContext);
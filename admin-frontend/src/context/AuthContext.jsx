import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("admin_token");
      const adminData = localStorage.getItem("admin_data");

      if (!token || !adminData) {
        setLoading(false);
        return;
      }

      try {
        // backend token verification
        await api.get("/auth/admin/me");
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        // token invalid / expired / tampered
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_data");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_data", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_data");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

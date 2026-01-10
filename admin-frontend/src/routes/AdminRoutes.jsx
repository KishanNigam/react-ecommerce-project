import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/auth/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import { ADMIN_ROUTES } from "../constants/adminRoutes";
import AdminNotFound from "../pages/error/AdminNotFound";

function AdminRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* PUBLIC */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* CONFIG-DRIVEN ADMIN ROUTES */}
        {ADMIN_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{route.component}</ProtectedRoute>
              ) : (
                route.component
              )
            }
          />
        ))}

        {/* ADMIN 404 */}
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminRoutes;

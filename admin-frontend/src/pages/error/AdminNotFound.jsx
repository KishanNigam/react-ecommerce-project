import React from "react";
import { Link } from "react-router-dom";

function AdminNotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/admin/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default AdminNotFound;

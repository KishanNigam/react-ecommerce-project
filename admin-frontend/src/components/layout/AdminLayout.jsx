import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/layout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Header />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

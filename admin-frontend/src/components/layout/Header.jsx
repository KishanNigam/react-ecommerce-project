import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="admin-header">
      <input
        className="header-search"
        placeholder="Search..."
      />

      <div className="header-right">
        <FiBell />
        <div className="profile">
          <FiUser />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

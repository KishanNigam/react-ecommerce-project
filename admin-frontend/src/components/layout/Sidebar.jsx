import React from "react";
import { NavLink } from "react-router-dom";
import { ADMIN_MENU } from "../../constants/adminMenu";
import { FiHome, FiBox, FiShoppingCart, FiFolder } from "react-icons/fi";

const iconMap = {
  Dashboard: <FiHome />,
  Products: <FiBox />,
  Orders: <FiShoppingCart />,
  Categories: <FiFolder />,
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>🧥</span> ClothAdmin
      </div>

      <nav className="sidebar-menu">
        {ADMIN_MENU.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="menu-item"
          >
            {iconMap[item.label]}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

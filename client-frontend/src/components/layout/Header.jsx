import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="client-header">
      <h2>🧥 Cloth Store</h2>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;

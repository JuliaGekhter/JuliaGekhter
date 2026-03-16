import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px 20px", background: "#f0f0f0" }}>
      <Link to="/">Home</Link>
      <Link to="/instructions">Instructions</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}

export default NavBar;

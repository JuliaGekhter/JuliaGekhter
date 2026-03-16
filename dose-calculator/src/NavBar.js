import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">DoseCalc</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Calculator
        </NavLink>
        <NavLink to="/instructions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Instructions
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;

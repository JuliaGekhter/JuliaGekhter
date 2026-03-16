import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import Settings from "./pages/Settings";
import NavBar from "./NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

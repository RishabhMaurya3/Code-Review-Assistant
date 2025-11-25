import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"; // Import updated CSS

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-box">CR</div>
        <div>
          <h1 className="navbar-title">Code Review Assistant</h1>
          <p className="navbar-subtitle">Powered by local LLM (Ollama)</p>
        </div>
      </div>

      <div className="navbar-right">
        {user && (
          <span className="user-greeting">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}

        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

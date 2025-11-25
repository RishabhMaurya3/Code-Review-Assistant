import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./components/AuthForm";
import "./App.css"; // Import custom CSS
import "./index.css";

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="app-container">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <Dashboard />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

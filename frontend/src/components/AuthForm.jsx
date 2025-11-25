import React, { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [mode, setMode] = useState("login"); // or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const data = await registerUser({ name, email, password });
        login(data);
      } else {
        const data = await loginUser({ email, password });
        login(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-1 text-center">
          {mode === "login" ? "Login" : "Create an Account"}
        </h1>
        <p className="text-xs text-gray-500 mb-4 text-center">
          Code Review Assistant with Hugging Face LLM
        </p>

        <div className="flex justify-center mb-4 gap-2">
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              mode === "login"
                ? "bg-slate-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              mode === "register"
                ? "bg-slate-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="block text-xs mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === "register"}
              />
            </div>
          )}
          <div>
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-2 py-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-red-600 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white text-sm py-2 rounded hover:bg-slate-800 disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Creating account..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

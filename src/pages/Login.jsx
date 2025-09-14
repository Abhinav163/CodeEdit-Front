import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      navigate("/editor");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-900">
      <form
        className="bg-neutral-800 p-6 rounded-lg w-96 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-white">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
          required
        />
        <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-bold">
          Login
        </button>
        <p className="text-sm text-neutral-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-400 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

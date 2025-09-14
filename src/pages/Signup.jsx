// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signup failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("name", data.name);
//       navigate("/editor");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-neutral-900">
//       <form
//         className="bg-neutral-800 p-6 rounded-lg w-96 space-y-4"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-xl font-bold text-white">Signup</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
//           required
//         />
//         <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-bold">
//           Signup
//         </button>
//         <p className="text-sm text-neutral-400">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-emerald-400 cursor-pointer"
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // try to parse JSON safely
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

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
        <h2 className="text-xl font-bold text-white">Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-neutral-700 text-white outline-none"
          required
        />
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
          Signup
        </button>
        <p className="text-sm text-neutral-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

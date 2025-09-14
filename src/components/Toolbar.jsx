// import React, { useState } from "react";

// const languages = [
//   { id: "python", label: "Python" },
//   { id: "javascript", label: "JavaScript" },
//   { id: "cpp", label: "C++" },
// ];

// export default function Toolbar({ language, setLanguage, onRun, running }) {
//   const [stdin, setStdin] = useState("");

//   const handleRun = () => {
//     onRun(stdin); // pass stdin to parent
//   };

//   return (
//     <div className="flex flex-col gap-2 p-3 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
//       <div className="flex items-center gap-3">
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="bg-neutral-800 text-sm rounded-lg px-3 py-2 outline-none"
//         >
//           {languages.map((l) => (
//             <option key={l.id} value={l.id}>
//               {l.label}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={handleRun}
//           disabled={running}
//           className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
//         >
//           {running ? "Running…" : "Run ▶"}
//         </button>
//         <span className="text-xs text-neutral-400">
//           Time limit: 5s • Memory: 256MB • No network
//         </span>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

const languages = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "cpp", label: "C++" },
];

export default function Toolbar({ language, setLanguage, onRun, running }) {
  const [stdin, setStdin] = useState("");
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleRun = () => {
    onRun(stdin);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center p-3 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
      {/* Left side - language + run */}
      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-neutral-800 text-sm rounded-lg px-3 py-2 outline-none"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleRun}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {running ? "Running…" : "Run ▶"}
        </button>
        <span className="text-xs text-neutral-400">
          Time limit: 5s • Memory: 256MB • No network
        </span>
      </div>

      {/* Right side - profile */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
          >
            {user.name}
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

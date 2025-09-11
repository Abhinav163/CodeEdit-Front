import React, { useState } from "react";

const languages = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "cpp", label: "C++" },
];

export default function Toolbar({ language, setLanguage, onRun, running }) {
  const [stdin, setStdin] = useState("");

  const handleRun = () => {
    onRun(stdin); // pass stdin to parent
  };

  return (
    <div className="flex flex-col gap-2 p-3 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
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
    </div>
  );
}

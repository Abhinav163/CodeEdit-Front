import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Toolbar from "./components/Toolbar.jsx";
import EditorPane from "./components/EditorPane.jsx";
import ConsolePane from "./components/ConsolePane.jsx";
import { EXAMPLES } from "./lib/examples.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { io } from "socket.io-client";

function Editor() {
  const [language, setLanguage] = React.useState("python");
  const [code, setCode] = React.useState(EXAMPLES["python"]);
  const [stdin, setStdin] = React.useState("");
  const [logs, setLogs] = React.useState([]);
  const [running, setRunning] = React.useState(false);

  const token = localStorage.getItem("token");
  const socket = io(import.meta.env.VITE_API_URL, {
    auth: { token },
  });

  React.useEffect(() => {
    setCode(EXAMPLES[language]);
  }, [language]);

  React.useEffect(() => {
    const onStdout = ({ chunk }) => setLogs((prev) => [...prev, chunk]);
    const onStderr = ({ chunk }) => setLogs((prev) => [...prev, chunk]);
    const onExit = (res) => {
      setRunning(false);
      if (typeof res?.code === "number") {
        setLogs((prev) => [
          ...prev,
          `\n[Process exited with code ${res.code}${
            res.error ? `: ${res.error}` : ""
          }]`,
        ]);
      }
    };
    const onError = ({ message }) => {
      setRunning(false);
      setLogs((prev) => [...prev, `[Error] ${message}`]);
    };

    socket.on("run:stdout", onStdout);
    socket.on("run:stderr", onStderr);
    socket.on("run:exit", onExit);
    socket.on("run:error", onError);

    return () => {
      socket.off("run:stdout", onStdout);
      socket.off("run:stderr", onStderr);
      socket.off("run:exit", onExit);
      socket.off("run:error", onError);
      socket.disconnect();
    };
  }, [socket]);

  const run = () => {
    setLogs([]);
    setRunning(true);
    socket.emit("run", { language, code, stdin });
  };

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] text-neutral-200">
      <Toolbar
        language={language}
        setLanguage={setLanguage}
        onRun={run}
        running={running}
      />
      <div className="grid grid-cols-2 gap-0 h-full">
        <div className="border-r border-neutral-800">
          <EditorPane language={language} code={code} setCode={setCode} />
        </div>
        <div className="grid grid-rows-[1fr_auto]">
          <ConsolePane logs={logs} onClear={() => setLogs([])} />
          <div className="border-t border-neutral-800 p-2 bg-neutral-900/60">
            <textarea
              className="w-full h-24 bg-neutral-800 rounded-lg p-2 outline-none text-sm"
              placeholder="stdin (optional) — this will be piped to your program"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // 🔑 Clear localStorage whenever frontend starts
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }, []);

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/editor" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

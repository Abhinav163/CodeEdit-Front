import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar.jsx";
import EditorPane from "../components/EditorPane.jsx";
import ConsolePane from "../components/ConsolePane.jsx";
import { io } from "socket.io-client";
import { EXAMPLES } from "../lib/examples.js";
import { useNavigate } from "react-router-dom";

export default function Editor() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(EXAMPLES["python"]);
  const [stdin, setStdin] = useState("");
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const navigate = useNavigate();

  // JWT token
  const token = localStorage.getItem("token");
  if (!token) navigate("/login");

  const socket = io(import.meta.env.VITE_API_URL, {
    auth: { token },
  });

  useEffect(() => {
    setCode(EXAMPLES[language]);
  }, [language]);

  useEffect(() => {
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
  }, []);

  const run = () => {
    setLogs([]);
    setRunning(true);
    socket.emit("run", { language, code, stdin });
  };

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

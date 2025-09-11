import React, { useEffect, useRef } from 'react'

export default function ConsolePane({ logs, onClear }) {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/60">
        <span className="text-sm text-neutral-300">Console</span>
        <button onClick={onClear} className="text-xs text-neutral-400 hover:text-neutral-200">Clear</button>
      </div>
      <pre className="flex-1 m-0 p-3 overflow-auto text-sm leading-6">
        {logs.length === 0 ? <span className="text-neutral-500">No output yet…</span> : null}
        {logs.map((line, i) => <div key={i}>{line}</div>)}
        <div ref={endRef} />
      </pre>
    </div>
  )
}

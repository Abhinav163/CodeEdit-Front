import React from 'react'
import Editor from '@monaco-editor/react'

export default function EditorPane({ language, code, setCode }) {
  const monacoLang = language === 'javascript' ? 'javascript' :
                     language === 'python' ? 'python' : 'cpp'

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage={monacoLang}
        value={code}
        onChange={(v) => setCode(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          theme: 'vs-dark'
        }}
      />
    </div>
  )
}

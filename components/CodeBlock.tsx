import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl my-6 group">
      {/* Window Controls Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-red-500/80 transition-colors duration-300"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-amber-500/80 transition-colors duration-300 delay-75"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-emerald-500/80 transition-colors duration-300 delay-150"></div>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500 tracking-wide uppercase">TypeScript</span>
      </div>
      
      {/* Code Content */}
      <div className="relative bg-[#1e1e1e]">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: '#161924', // Matches theme surface color for seamless integration
            fontSize: '0.9rem',
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1.5em',
            color: '#485066', // Slate 600
            textAlign: 'right',
            userSelect: 'none'
          }}
        >
          {code}
        </SyntaxHighlighter>
        
        {/* Copy Button Hint (Visual only for now) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-[10px] text-slate-500 bg-slate-800/50 backdrop-blur px-2 py-1 rounded border border-slate-700/50">
            Read-only
          </div>
        </div>
      </div>
    </div>
  );
};
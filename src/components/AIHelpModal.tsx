import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  patternTitle: string;
}

export const AIHelpModal: React.FC<AIHelpModalProps> = ({ isOpen, onClose, patternTitle }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    // try {
    //   const result = await getAIExplanation(patternTitle, query);
    //   setResponse(result);
    // } catch (e) {
    //   setResponse("Failed to fetch response.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface border border-slate-600 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={24} />
            <h2 className="text-xl font-bold text-white">AI Tutor: {patternTitle}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
           {!response && !loading && (
             <div className="text-center text-slate-400 py-10">
               <p>Ask a specific question about {patternTitle} or ask for an analogy!</p>
             </div>
           )}

           {loading && (
             <div className="flex flex-col items-center justify-center py-10 space-y-4">
               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               <p className="text-slate-400">Thinking...</p>
             </div>
           )}

           {response && (
             <div className="prose prose-invert max-w-none text-slate-300">
               <ReactMarkdown>{response}</ReactMarkdown>
             </div>
           )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/50 rounded-b-xl">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={`Ask about ${patternTitle}...`}
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={handleAsk}
              disabled={loading || !query.trim()}
              className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

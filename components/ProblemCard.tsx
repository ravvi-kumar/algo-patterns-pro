import React, { useState } from 'react';
import { Problem, Difficulty } from '../types';
import { useProgress } from '../context/ProgressContext';
import { 
  CheckCircle, 
  Circle, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Unlock, 
  Lock, 
  Lightbulb 
} from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const { 
    isProblemCompleted, 
    toggleProblem, 
    getUnlockedHintLevel, 
    unlockHint 
  } = useProgress();

  const [isExpanded, setIsExpanded] = useState(false);
  const isDone = isProblemCompleted(problem.id);
  const currentHintLevel = getUnlockedHintLevel(problem.id);

  const getDifficultyBadge = (diff: Difficulty) => {
    switch(diff) {
      case Difficulty.Easy: return 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/10';
      case Difficulty.Medium: return 'text-amber-400 bg-amber-500/10 border border-amber-500/10';
      case Difficulty.Hard: return 'text-rose-400 bg-rose-500/10 border border-rose-500/10';
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleProblem(problem.id);
  };

  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${
      isDone 
        ? 'bg-emerald-900/5 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
        : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
    }`}>
      {/* Header Row */}
      <div 
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button 
          onClick={handleToggle}
          className={`flex-shrink-0 transition-colors ${isDone ? 'text-emerald-500' : 'text-slate-600 hover:text-slate-400'}`}
        >
          {isDone ? <CheckCircle size={22} /> : <Circle size={22} strokeWidth={1.5} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
             <h4 className={`text-base font-medium truncate ${isDone ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
               {problem.title}
             </h4>
             <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium tracking-wide uppercase ${getDifficultyBadge(problem.difficulty)}`}>
               {problem.difficulty}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           {/* Visual indicator of hints used */}
           <div className="hidden sm:flex gap-0.5">
             {[1, 2, 3].map(level => (
               <div key={level} className={`w-1.5 h-1.5 rounded-full ${level <= currentHintLevel ? 'bg-primary' : 'bg-slate-700'}`}></div>
             ))}
           </div>
           
           {isExpanded ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
        </div>
      </div>

      {/* Expanded Content: Hints & Actions */}
      {isExpanded && (
        <div className="border-t border-slate-800 bg-slate-900/30">
          
          {/* Action Bar */}
          <div className="px-4 py-2 gap-2 flex items-center justify-between flex-col border-b border-slate-800/50">
             <a 
                href={problem.leetcodeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                Open in LeetCode
              </a>
              <span className="text-xs text-slate-500 italic">Try to solve it before unlocking hints!</span>
          </div>

          {/* Progressive Hints */}
          <div className="p-4 space-y-3">
            {problem.hints.map((hint) => {
              const isUnlocked = currentHintLevel >= hint.level;
              const isNext = currentHintLevel === hint.level - 1;

              return (
                <div key={hint.level} className={`rounded-lg border overflow-hidden ${isUnlocked ? 'border-slate-700 bg-slate-800/20' : 'border-dashed border-slate-800 bg-transparent'}`}>
                  {isUnlocked ? (
                     <div className="p-4">
                        <div className="flex items-center gap-2 mb-2 text-primary text-xs font-bold uppercase tracking-wider">
                           <Lightbulb size={12} />
                           {hint.title}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{hint.content}</p>
                     </div>
                  ) : (
                    <button 
                      disabled={!isNext}
                      onClick={() => unlockHint(problem.id, hint.level)}
                      className={`w-full p-3 flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                        isNext 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/50 cursor-pointer' 
                          : 'text-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {isNext ? <Unlock size={14} /> : <Lock size={14} />}
                      <span>Unlock Hint {hint.level}: {hint.title}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
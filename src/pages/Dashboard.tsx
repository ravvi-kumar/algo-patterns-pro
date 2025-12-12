import React from 'react';
import { Link } from 'react-router';
import { PATTERNS } from '../data';
import { useProgress } from '../context/ProgressContext';
import { PatternDifficulty } from '../types';
import { ChevronRight, Trophy, BookOpen, Activity, Flame } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { completedProblems, getProgressPercentage, streak } = useProgress();
  const percentage = getProgressPercentage();

  const getDifficultyColor = (diff: PatternDifficulty) => {
    switch(diff) {
      case PatternDifficulty.Beginner: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case PatternDifficulty.Intermediate: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case PatternDifficulty.Advanced: return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header & Stats */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-6 font-bold tracking-wide uppercase">
          <Flame size={12} className="fill-orange-400" />
          <span>{streak} Day Streak</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 mb-6 tracking-tight">
          Master DSA Patterns
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A system designed for mastery. Focus on one pattern at a time, use progressive hints, and build the daily habit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition-colors duration-300 group">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
              <Trophy size={24} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Completion</p>
              <p className="text-2xl font-semibold text-slate-100">{percentage}%</p>
            </div>
          </div>
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition-colors duration-300 group">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen size={24} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Patterns</p>
              <p className="text-2xl font-semibold text-slate-100">{PATTERNS.length}</p>
            </div>
          </div>
           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition-colors duration-300 group">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
              <Activity size={24} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Problems Solved</p>
              <p className="text-2xl font-semibold text-slate-100">{completedProblems.size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="space-y-12">
        {[PatternDifficulty.Beginner, PatternDifficulty.Intermediate, PatternDifficulty.Advanced].map((diff) => (
          <div key={diff}>
             <div className="flex items-center gap-3 mb-6">
                <span className={`w-1.5 h-6 rounded-full ${
                    diff === PatternDifficulty.Beginner ? 'bg-emerald-500' :
                    diff === PatternDifficulty.Intermediate ? 'bg-amber-500' : 'bg-rose-500'
                }`}></span>
                <h2 className="text-xl font-semibold text-slate-200 tracking-wide">
                  {diff} Patterns
                </h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PATTERNS.filter(p => p.difficulty === diff).map((pattern) => {
                    const patternProblems = pattern.problems;
                    const solvedCount = patternProblems.filter(p => completedProblems.has(p.id)).length;
                    const isFullyCompleted = solvedCount === patternProblems.length && patternProblems.length > 0;

                    return (
                        <Link to={`/pattern/${pattern.id}`} key={pattern.id} className="group block h-full">
                            <div className={`h-full bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm border transition-all duration-300 rounded-xl p-6 relative overflow-hidden ${isFullyCompleted ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-slate-800 hover:border-slate-600 hover:shadow-glow'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getDifficultyColor(pattern.difficulty)} uppercase tracking-wider`}>
                                        {pattern.difficulty}
                                    </span>
                                    {isFullyCompleted && <Trophy size={16} className="text-emerald-400" />}
                                </div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors">
                                    {pattern.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">
                                    {pattern.shortDescription}
                                </p>
                                
                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                                        <span>Progress</span>
                                        <span>{solvedCount} / {patternProblems.length}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${isFullyCompleted ? 'bg-emerald-500' : 'bg-primary'}`}
                                            style={{ width: `${(solvedCount / Math.max(patternProblems.length, 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 duration-300">
                                    <ChevronRight className="text-primary" size={18} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

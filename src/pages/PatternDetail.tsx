import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PATTERNS } from '../data';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { CodeBlock } from '../components/CodeBlock';
import { AIHelpModal } from '../components/AIHelpModal';
import { ProblemCard } from '../components/ProblemCard';
import { LanguageSelector } from '../components/LanguageSelector';
import {
  ArrowLeft,
  Sparkles,
  Target,
  Code2,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  GraduationCap,
  Layers
} from 'lucide-react';
import { PatternDifficulty } from '../types';

const PatternDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pattern = PATTERNS.find(p => p.id === id);
  const { isProblemCompleted } = useProgress();
  const { selectedLanguage } = useLanguage();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  if (!pattern) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Pattern Not Found</h2>
        <Link to="/dashboard" className="text-primary hover:text-primary/80 transition-colors">Return to Dashboard</Link>
      </div>
    );
  }

  const completedCount = pattern.problems.filter(p => isProblemCompleted(p.id)).length;
  const progressPercent = Math.round((completedCount / pattern.problems.length) * 100);

  const getDifficultyColor = (diff: PatternDifficulty) => {
    switch(diff) {
      case PatternDifficulty.Beginner: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case PatternDifficulty.Intermediate: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case PatternDifficulty.Advanced: return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Navigation */}
      <div className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header Section */}
      <header className="mb-12 border-b border-slate-800 pb-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getDifficultyColor(pattern.difficulty)}`}>
              {pattern.difficulty}
            </span>
            <span className="text-slate-500 text-sm font-mono">{pattern.problems.length} Exercises</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {pattern.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {pattern.shortDescription}
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left Column: Knowledge Base (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Mastery Section (New Position) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-400">Pattern Mastery</span>
                    <span className="text-xl font-bold text-white">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div 
                        className="bg-primary h-full transition-all duration-700 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>
            
            <button 
                onClick={() => setIsAIModalOpen(true)}
                className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white px-6 py-3 rounded-lg transition-all shadow-lg shadow-primary/20 font-semibold text-sm group"
            >
                <Sparkles size={18} className="text-indigo-200 group-hover:text-white transition-colors" />
                <span>Ask AI Tutor</span>
            </button>
          </div>

          {/* Mental Model */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Mental Model</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              <p className="leading-relaxed">{pattern.fullDescription}</p>
            </div>
          </section>

          {/* Strategy Cards (80/20 & Pitfalls) */}
          <section>
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Strategy Guide</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* 80/20 Rule Card */}
              {pattern.keyInsights && (
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                    <Lightbulb size={20} className="fill-emerald-500/10" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">The 80/20 Rule</h3>
                  </div>
                  <ul className="space-y-4">
                    {pattern.keyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Pitfalls Card */}
              {pattern.commonPitfalls && (
                <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-6 hover:border-rose-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-rose-400 mb-4">
                    <AlertTriangle size={20} className="fill-rose-500/10" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">Common Pitfalls</h3>
                  </div>
                  <ul className="space-y-4">
                    {pattern.commonPitfalls.map((pitfall, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="text-rose-500 text-lg leading-none mt-[-3px]">•</span>
                        <span className="leading-relaxed">{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Code Template */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
                  <Code2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Code Blueprint</h2>
                  <p className="text-slate-500 text-sm mt-1">Universal template for {pattern.title} problems</p>
                </div>
              </div>
              <LanguageSelector />
            </div>
            <div className='overflow-x-auto max-w-sm md:max-w-none'>
            <CodeBlock code={pattern.codeExample[selectedLanguage]} />
            </div>
          </section>
        </div>

        {/* Right Column: Practice Gym (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Layers size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-white">Curated Exercises</h3>
            </div>
            
            <div className="space-y-4">
              {pattern.problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
              <p className="text-xs text-slate-500">
                Solved them all? <Link to="/dashboard" className="text-primary hover:underline">Pick a new pattern</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIHelpModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        patternTitle={pattern.title}
      />
    </div>
  );
};

export default PatternDetail;
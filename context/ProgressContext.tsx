import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressContextType {
  completedProblems: Set<string>;
  unlockedHints: Record<string, number>;
  streak: number;
  toggleProblem: (problemId: string) => void;
  unlockHint: (problemId: string, level: number) => void;
  isProblemCompleted: (problemId: string) => boolean;
  getUnlockedHintLevel: (problemId: string) => number;
  getProgressPercentage: () => number;
  totalProblems: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode; totalProblemsCount: number }> = ({ children, totalProblemsCount }) => {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
  const [unlockedHints, setUnlockedHints] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState<number>(0);
  const [lastPracticeDate, setLastPracticeDate] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('algoPatternProgress_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedProblems(new Set(parsed.completedProblems || []));
        setUnlockedHints(parsed.unlockedHints || {});
        setStreak(parsed.streak || 0);
        setLastPracticeDate(parsed.lastPracticeDate || null);
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    const data = {
      completedProblems: Array.from(completedProblems),
      unlockedHints,
      streak,
      lastPracticeDate
    };
    localStorage.setItem('algoPatternProgress_v2', JSON.stringify(data));
  }, [completedProblems, unlockedHints, streak, lastPracticeDate]);

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (lastPracticeDate === today) return; // Already practiced today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (lastPracticeDate === yesterdayString) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(1); // Reset or start new
    }
    setLastPracticeDate(today);
  };

  const toggleProblem = (problemId: string) => {
    setCompletedProblems(prev => {
      const next = new Set(prev);
      const isCompleting = !next.has(problemId);
      
      if (isCompleting) {
        next.add(problemId);
        updateStreak(); // Update streak only on completion
      } else {
        next.delete(problemId);
      }
      return next;
    });
  };

  const unlockHint = (problemId: string, level: number) => {
    setUnlockedHints(prev => ({
      ...prev,
      [problemId]: Math.max(prev[problemId] || 0, level)
    }));
  };

  const isProblemCompleted = (problemId: string) => completedProblems.has(problemId);
  
  const getUnlockedHintLevel = (problemId: string) => unlockedHints[problemId] || 0;

  const getProgressPercentage = () => {
    if (totalProblemsCount === 0) return 0;
    return Math.round((completedProblems.size / totalProblemsCount) * 100);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedProblems, 
      unlockedHints,
      streak,
      toggleProblem, 
      unlockHint,
      isProblemCompleted, 
      getUnlockedHintLevel,
      getProgressPercentage,
      totalProblems: totalProblemsCount
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

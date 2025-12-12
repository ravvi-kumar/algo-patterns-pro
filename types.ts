export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum PatternDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Hint {
  level: number;
  title: string; // e.g., "Mental Model", "Pseudocode", "Traps", "Solution"
  content: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  leetcodeUrl: string;
  hints: Hint[]; // Progressive scaffolding
}

export interface Pattern {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: PatternDifficulty;
  codeExample: string;
  problems: Problem[];
  keyInsights?: string[]; // The 80/20 rule content
  commonPitfalls?: string[]; // Common mistakes
}

export interface UserProgress {
  completedProblems: string[]; 
  unlockedHints: Record<string, number>; // problemId -> highest hint level unlocked (0-4)
  streak: number;
  lastPracticeDate: string | null; // ISO Date string
}
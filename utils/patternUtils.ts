import { Hint } from '../types';

export const createHints = (strategy: string, pseudo: string, traps: string): Hint[] => [
  { level: 1, title: "Mental Model", content: strategy },
  { level: 2, title: "Pseudocode", content: pseudo },
  { level: 3, title: "Traps & Edge Cases", content: traps },
  // { level: 4, title: "Solution Pattern", content: "Check the 'Code Template' above for the exact syntax. Attempt to write it yourself first!" }
];
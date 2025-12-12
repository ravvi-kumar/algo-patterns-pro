import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const topKElements: Pattern = {
  id: 'top-k-elements',
  title: 'Top K Elements',
  shortDescription: 'Finding the largest/smallest K elements.',
  difficulty: PatternDifficulty.Advanced,
  fullDescription: `Use a Heap (Priority Queue). For 'K largest', keep a Min-Heap of size K. For 'K smallest', keep a Max-Heap of size K.`,
  keyInsights: [
    "Keyword Recognition: 'Top K', 'Kth Largest', 'K Closest', or 'Median' always signals a Heap.",
    "The Inversion Rule: Want K *Largest*? Use a *Min-Heap* (ejects small items). Want K *Smallest*? Use a *Max-Heap*.",
    "Complexity Win: Heap is O(N log K), which is vastly superior to Sorting O(N log N) when K is small."
  ],
  commonPitfalls: [
    "Sorting Instead: A common mistake is just sorting the array. While correct, it's suboptimal (O(N log N)). Interviewers look for the O(N log K) heap solution.",
    "Language Support: JavaScript does NOT have a built-in Heap/PriorityQueue. In an interview, ask if you can assume a 'MinHeap' class exists or if you need to implement it.",
    "Off-by-one K: Be careful about heap size. If heap size > K, you pop. This ensures exactly K elements remain."
  ],
  codeExample: `// Min-Heap of size K for K largest elements
// If heap.size > K, remove smallest (root). 
// Remaining elements are the K largest.`,
  problems: [
    { id: 'tk-1', title: 'Top K Frequent Elements', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', hints: createHints("Map frequency first. Then use Heap or Bucket Sort.", "Min-Heap of size K storing [freq, num].", "Bucket sort is O(N) where index is frequency.") },
    { id: 'tk-2', title: 'Kth Largest Element', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', hints: createHints("Min-Heap of size K.", "Push element. If size > K, pop min.", "Root of heap is Kth largest.") },
    { id: 'tk-3', title: 'K Closest Points to Origin', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', hints: createHints("Max-Heap of size K (distance).", "We want smallest distances, so we eject largest distances.", "Distance formula: x^2 + y^2 (no need for sqrt).") },
  ]
};
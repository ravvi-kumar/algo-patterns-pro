import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const subsets: Pattern = {
  id: 'subsets',
  title: 'Subsets (Backtracking)',
  shortDescription: 'Generating permutations and combinations.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `This pattern handles problems asking for all permutations, combinations, or subsets of a set. It usually involves a Breadth-First Search (BFS) approach (iteratively adding elements) or a Depth-First Search (DFS) approach (recursive backtracking).`,
  keyInsights: [
    "Cascading (BFS): Start with an empty set [[]]. For each number in input, add it to all existing subsets to create new ones.",
    "Backtracking (DFS): Choose an element, recurse, then 'backtrack' (remove the element) to explore other paths.",
    "Duplicates: If input has duplicates, sort it first. Skip adjacent duplicates in the backtracking loop to avoid identical subsets."
  ],
  commonPitfalls: [
    "Reference Issues: In JS/TS, pushing the \`currentSubset\` array directly will push a reference. You must push a copy: \`result.push([...currentSubset])\`.",
    "Base Cases: In recursion, knowing when to return or when to push to result is key.",
    "Time Complexity: These are exponential O(2^N) or O(N!). Don't try to use this for N > 20."
  ],
  codeExample: `function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  function dfs(i: number) {
    if (i >= nums.length) {
      result.push([...subset]); // Copy!
      return;
    }

    // Include nums[i]
    subset.push(nums[i]);
    dfs(i + 1);

    // Exclude nums[i] (Backtrack)
    subset.pop();
    dfs(i + 1);
  }

  dfs(0);
  return result;
}`,
  problems: [
    {
      id: 'sub-1',
      title: 'Subsets',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/subsets/',
      hints: createHints(
        "DFS Backtracking approach.",
        "For every element, you have two choices: include it or exclude it.",
        "Push a copy of the subset when index reaches end."
      )
    },
    {
      id: 'sub-2',
      title: 'Subsets II (Duplicates)',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/',
      hints: createHints(
        "Sort the array first to handle duplicates easily.",
        "In the 'exclude' branch or iteration, skip numbers that are the same as the previous number.",
        "Alternatively, use a Set to store JSON stringified results (less efficient)."
      )
    },
    {
      id: 'sub-3',
      title: 'Permutations',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/permutations/',
      hints: createHints(
        "Standard backtracking.",
        "Iterate through nums. If current num is already in 'currentPermutation', skip it (or use a 'visited' boolean array).",
        "Base case: currentPermutation.length === nums.length."
      )
    }
  ]
};
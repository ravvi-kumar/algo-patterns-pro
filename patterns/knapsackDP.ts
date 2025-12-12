import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const knapsackDP: Pattern = {
  id: 'knapsack-dp',
  title: '0/1 Knapsack (DP)',
  shortDescription: 'Optimization with constraints (take it or leave it).',
  difficulty: PatternDifficulty.Advanced,
  fullDescription: `The 0/1 Knapsack pattern deals with a set of items, each with a weight and a value. You want to maximize the total value without exceeding a capacity. "0/1" means you can't break an item: you either pick it (1) or leave it (0).`,
  keyInsights: [
    "State Definition: \`dp[index][capacity]\` represents the max profit using a subset of items from 0 to \`index\` with remaining \`capacity\`.",
    "Recurrence Relation: \`dp[i][c] = max(dp[i-1][c], profit[i] + dp[i-1][c - weight[i]])\`. (Exclude vs Include).",
    "Space Optimization: You can optimize the 2D array to a 1D array. \`dp[c] = max(dp[c], profit[i] + dp[c - weight[i]])\`. IMPORTANT: Iterate backwards when using 1D array to avoid using the same item twice."
  ],
  commonPitfalls: [
    "Iterating Direction (1D): When optimizing to 1D array for 0/1 Knapsack, you MUST iterate capacity from Max down to 0. If you go 0 to Max, you solve 'Unbounded Knapsack' (infinite items).",
    "Base Cases: \`dp[0][...]\` usually 0 (or initialized based on first item).",
    "Greedy Fails: Sorting by value/weight ratio usually fails for 0/1 Knapsack. You must use DP."
  ],
  codeExample: `function solveKnapsack(profits: number[], weights: number[], capacity: number): number {
  const n = profits.length;
  // dp[c] = max profit with capacity c
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    // Iterate BACKWARDS for 0/1 Knapsack
    for (let c = capacity; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], profits[i] + dp[c - weights[i]]);
    }
  }
  return dp[capacity];
}`,
  problems: [
    {
      id: 'dp-1',
      title: 'Partition Equal Subset Sum',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      hints: createHints(
        "Convert to Knapsack: Can we fill a bag of capacity 'Sum/2' using these numbers?",
        "Capacity = TotalSum / 2. If TotalSum is odd, return false.",
        "dp[c] is boolean: can we reach sum 'c'? Iterate nums, then iterate capacity backwards."
      )
    },
    {
      id: 'dp-2',
      title: 'Target Sum',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/target-sum/',
      hints: createHints(
        "Math trick: (Sum(Positive) - Sum(Negative)) = Target. Sum(Positive) + Sum(Negative) = TotalSum.",
        "Implies: 2 * Sum(Positive) = Target + TotalSum. So, find a subset with sum (Target + TotalSum) / 2.",
        "This reduces exactly to 'Count of subsets with sum S' (a Knapsack variation)."
      )
    },
    {
      id: 'dp-3',
      title: 'Last Stone Weight II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight-ii/',
      hints: createHints(
        "We want to divide stones into two groups with minimal difference.",
        "This is equivalent to: Find subset with sum closest to TotalSum / 2.",
        "Run 0/1 Knapsack to find largest reachable sum <= TotalSum / 2. The answer is TotalSum - 2 * reachableSum."
      )
    }
  ]
};
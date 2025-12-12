import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const treeDFS: Pattern = {
  id: 'tree-dfs',
  title: 'Tree DFS',
  shortDescription: 'Depth-first exploration (Pre-order, In-order, Post-order).',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Depth-First Search (DFS) explores as deep as possible along each branch before backtracking. It is typically implemented using Recursion (system stack) or an explicit Stack.`,
  keyInsights: [
    "Recursion is King: DFS is naturally recursive. Base case: \`if (!node) return\`.",
    "Traversals: Pre-order (Root, Left, Right), In-order (Left, Root, Right), Post-order (Left, Right, Root).",
    "Path Problems: Passing state (like \`currentSum\` or \`pathList\`) down the recursive calls is very common."
  ],
  commonPitfalls: [
    "Base Cases: Forgetting to return null, 0, or false when node is null.",
    "Global vs Local State: Be clear if you need to accumulate a result globally (class variable) or return it up the chain. Returning up is usually cleaner.",
    "Backtracking: If modifying a list passed by reference (like 'currentPath'), remember to pop the last element after returning from recursion to clean up for other branches."
  ],
  codeExample: `function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;
  
  // Leaf check
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  // Recurse down
  return hasPathSum(root.left, targetSum - root.val) || 
         hasPathSum(root.right, targetSum - root.val);
}`,
  problems: [
    {
      id: 'dfs-1',
      title: 'Path Sum',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum/',
      hints: createHints(
        "Subtract node value from target as you go down.",
        "Check if it's a leaf node (no left, no right).",
        "If leaf and remaining target == 0, return true."
      )
    },
    {
      id: 'dfs-2',
      title: 'Path Sum II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum-ii/',
      hints: createHints(
        "Need to keep track of the current path (array of values).",
        "Push current node to path. Recurse left and right.",
        "After recursive calls return, pop the node from path (backtracking) to keep the list correct for other branches."
      )
    },
    {
      id: 'dfs-3',
      title: 'Lowest Common Ancestor',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      hints: createHints(
        "Recursive logic: Look for p and q in left and right subtrees.",
        "If current node is p or q, return current.",
        "If both left and right calls return a node, current is the LCA. If only one returns, pass that up."
      )
    }
  ]
};
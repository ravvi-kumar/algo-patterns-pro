import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const treeDFS: Pattern = {
  id: 'tree-dfs',
  title: 'Tree DFS',
  shortDescription: 'Depth-first exploration (Pre-order, In-order, Post-order).',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Depth-First Search (DFS) explores as deep as possible along each branch before backtracking. It is typically implemented using Recursion (system stack) or an explicit Stack.`,
  keyInsights: [
    "Recursion is King: DFS is naturally recursive. Base case: `if (!node) return`.",
    "Traversals: Pre-order (Root, Left, Right), In-order (Left, Root, Right), Post-order (Left, Right, Root).",
    "Path Problems: Passing state (like `currentSum` or `pathList`) down the recursive calls is very common."
  ],
  commonPitfalls: [
    "Base Cases: Forgetting to return null, 0, or false when node is null.",
    "Global vs Local State: Be clear if you need to accumulate a result globally (class variable) or return it up the chain. Returning up is usually cleaner.",
    "Backtracking: If modifying a list passed by reference (like 'currentPath'), remember to pop the last element after returning from recursion to clean up for other branches."
  ],
  codeExample: {
    typescript: `function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  // Leaf check
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  // Recurse down
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}`,
    python: `def has_path_sum(root: Optional[TreeNode], target_sum: int) -> bool:
    if not root:
        return False

    # Leaf check
    if not root.left and not root.right:
        return target_sum == root.val

    # Recurse down
    return has_path_sum(root.left, target_sum - root.val) or \\
           has_path_sum(root.right, target_sum - root.val)`,
    java: `public static boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) return false;

    // Leaf check
    if (root.left == null && root.right == null) {
        return targetSum == root.val;
    }

    // Recurse down
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}`,
    cpp: `bool hasPathSum(TreeNode* root, int targetSum) {
    if (root == nullptr) return false;

    // Leaf check
    if (root->left == nullptr && root->right == nullptr) {
        return targetSum == root->val;
    }

    // Recurse down
    return hasPathSum(root->left, targetSum - root->val) ||
           hasPathSum(root->right, targetSum - root->val);
}`,
    javascript: `function hasPathSum(root, targetSum) {
  if (!root) return false;

  // Leaf check
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  // Recurse down
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}`
  },
  problems: [
    {
      id: 'dfs-1',
      title: 'Path Sum',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum/',
      hints: createHints(
        "Recursive approach with decreasing target sum.",
        "Base case: leaf node check.",
        "Pass targetSum - root.val to children."
      )
    },
    {
      id: 'dfs-2',
      title: 'Path Sum II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum-ii/',
      hints: createHints(
        "Backtracking with path list.",
        "Add node to path, recurse, then pop (backtrack).",
        "Copy path when reaching leaf with correct sum."
      )
    },
    {
      id: 'dfs-3',
      title: 'Validate Binary Search Tree',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
      hints: createHints(
        "Pass min/max bounds down recursion.",
        "Left subtree: max bound = node.val.",
        "Right subtree: min bound = node.val."
      )
    }
  ]
};
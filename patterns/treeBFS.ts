import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const treeBFS: Pattern = {
  id: 'tree-bfs',
  title: 'Tree BFS',
  shortDescription: 'Level-by-level traversal using a Queue.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Breadth-First Search (BFS) explores the tree level by level. It uses a Queue to keep track of nodes to visit. This is essential for level-order traversal, finding shortest paths in unweighted graphs, and connecting siblings.`,
  keyInsights: [
    "Queue Usage: Push root. Loop while queue is not empty.",
    "Level Processing: Inside the while loop, capture \`levelSize = queue.length\`. Iterate \`levelSize\` times to process ONLY the current level's nodes before moving to the next level.",
    "Child Management: For each node processed, push left and right children to queue."
  ],
  commonPitfalls: [
    "Shift vs Pop: In JS, \`array.shift()\` is O(N), making BFS O(N^2) if not careful. For interviews, assuming O(1) dequeue is usually fine, or use a proper Queue class.",
    "Level Separation: Forgetting the inner \`for(i < levelSize)\` loop mixes levels together. If the problem requires distinguishing levels, this loop is mandatory.",
    "Null Checks: Always check if root is null before starting to avoid immediate crash."
  ],
  codeExample: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`,
  problems: [
    {
      id: 'bfs-1',
      title: 'Binary Tree Level Order Traversal',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      hints: createHints(
        "Use a Queue. Start with root.",
        "Loop while queue not empty. Capture queue length (levelSize).",
        "Process 'levelSize' nodes, adding their children to queue. Add their values to a temporary list."
      )
    },
    {
      id: 'bfs-2',
      title: 'Binary Tree Zigzag Level Order Traversal',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
      hints: createHints(
        "Standard BFS setup.",
        "Keep a boolean flag 'leftToRight'. Toggle it after each level.",
        "If !leftToRight, unshift (prepend) values to the current level array, or just reverse the array before adding to result."
      )
    },
    {
      id: 'bfs-3',
      title: 'Binary Tree Right Side View',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/',
      hints: createHints(
        "Perform BFS.",
        "The last element processed in the 'levelSize' loop is the rightmost node of that level.",
        "Add only that last node to your result array."
      )
    }
  ]
};
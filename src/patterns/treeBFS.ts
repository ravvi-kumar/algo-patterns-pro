import { type Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const treeBFS: Pattern = {
  id: 'tree-bfs',
  title: 'Tree BFS',
  shortDescription: 'Level-by-level traversal using a Queue.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Breadth-First Search (BFS) explores the tree level by level. It uses a Queue to keep track of nodes to visit. This is essential for level-order traversal, finding shortest paths in unweighted graphs, and connecting siblings.`,
  keyInsights: [
    "Queue Usage: Push root. Loop while queue is not empty.",
    "Level Processing: Inside the while loop, capture `levelSize = queue.length`. Iterate `levelSize` times to process ONLY the current level's nodes before moving to the next level.",
    "Child Management: For each node processed, push left and right children to queue."
  ],
  commonPitfalls: [
    "Shift vs Pop: In JS, `array.shift()` is O(N), making BFS O(N^2) if not careful. For interviews, assuming O(1) dequeue is usually fine, or use a proper Queue class.",
    "Level Separation: Forgetting the inner `for(i < levelSize)` loop mixes levels together. If the problem requires distinguishing levels, this loop is mandatory.",
    "Null Checks: Always check if root is null before starting to avoid immediate crash."
  ],
  codeExample: {
    typescript: `function levelOrder(root: TreeNode | null): number[][] {
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
    python: `from collections import deque

def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result`,
    java: `public static List<List<Integer>> levelOrder(TreeNode root) {
    if (root == null) return new ArrayList<>();

    List<List<Integer>> result = new ArrayList<>();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(currentLevel);
    }

    return result;
}`,
    cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    if (root == nullptr) return {};

    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> currentLevel;

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);

            if (node->left != nullptr) q.push(node->left);
            if (node->right != nullptr) q.push(node->right);
        }

        result.push_back(currentLevel);
    }

    return result;
}`,
    javascript: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`
  },
  problems: [
    {
      id: 'bfs-1',
      title: 'Binary Tree Level Order Traversal',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      hints: createHints(
        "Use queue with levelSize trick.",
        "Process each level separately.",
        "Push children of each node to queue."
      )
    },
    {
      id: 'bfs-2',
      title: 'Zigzag Level Order',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
      hints: createHints(
        "Same BFS with direction toggle.",
        "Reverse every other level before adding to result.",
        "Or use deque and push front/back based on direction."
      )
    },
    {
      id: 'bfs-3',
      title: 'Average of Levels',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/',
      hints: createHints(
        "Standard BFS level traversal.",
        "Calculate average of each level's values.",
        "Be careful with integer division in some languages."
      )
    }
  ]
};
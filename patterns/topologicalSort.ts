import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const topologicalSort: Pattern = {
  id: 'topological-sort',
  title: 'Topological Sort (Graph)',
  shortDescription: 'Linear ordering of vertices with dependencies.',
  difficulty: PatternDifficulty.Advanced,
  fullDescription: `Topological Sort is used to find a linear ordering of elements that have dependencies on each other. For example, if task B depends on task A, A comes before B in the list. This is commonly solved using Kahn's Algorithm (BFS) or DFS.`,
  keyInsights: [
    "In-Degree: Count how many incoming edges each node has. Source nodes have 0 in-degree.",
    "Kahn's Algo (BFS): 1. Push all 0 in-degree nodes to Queue. 2. Pop node, add to result, decrement neighbors' in-degree. 3. If neighbor becomes 0, push to Queue.",
    "Cycle Detection: If the result list length < total nodes, the graph has a cycle (circular dependency) and topological sort is impossible."
  ],
  commonPitfalls: [
    "Directed Acyclic Graph (DAG): This pattern ONLY works on DAGs. If there is a cycle, you must handle it (usually return empty/false).",
    "Initialization: Don't forget to initialize in-degree count for ALL nodes to 0 before processing edges.",
    "Graph Construction: You usually need to build an Adjacency List (Map<Node, List<Node>>) and an In-Degree Array/Map first."
  ],
  codeExample: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj = new Map();

  // 1. Build Graph
  for (const [course, pre] of prerequisites) {
    inDegree[course]++;
    if (!adj.has(pre)) adj.set(pre, []);
    adj.get(pre).push(course);
  }

  // 2. Add Sources to Queue
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  // 3. Process
  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;
    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === numCourses;
}`,
  problems: [
    {
      id: 'ts-1',
      title: 'Course Schedule',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      hints: createHints(
        "This is a classic cycle detection problem in a directed graph.",
        "Use Kahn's Algorithm. Build adjacency list and in-degree array.",
        "If the number of nodes processed equals numCourses, it's possible. Otherwise, there's a cycle."
      )
    },
    {
      id: 'ts-2',
      title: 'Course Schedule II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
      hints: createHints(
        "Same as Course Schedule I, but return the order.",
        "Maintain a result array. Whenever you pop from the queue, push to result.",
        "If result.length != numCourses at the end, return empty array (cycle detected)."
      )
    },
    {
      id: 'ts-3',
      title: 'Alien Dictionary',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
      hints: createHints(
        "Compare adjacent words to find the first differing character. This defines an edge (u -> v).",
        "Build the graph of characters. Calculate in-degrees.",
        "Run Topological Sort. If result covers all unique characters, that's the alphabet order."
      )
    }
  ]
};
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
  codeExample: {
    typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj = new Map<number, number[]>();

  // 1. Build Graph
  for (const [course, pre] of prerequisites) {
    inDegree[course]++;
    if (!adj.has(pre)) adj.set(pre, []);
    adj.get(pre)!.push(course);
  }

  // 2. Add Sources to Queue
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  // 3. Process
  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift()!;
    count++;
    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === numCourses;
}`,
    python: `from collections import deque, defaultdict

def can_finish(num_courses: int, prerequisites: List[List[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = defaultdict(list)

    # 1. Build Graph
    for course, pre in prerequisites:
        in_degree[course] += 1
        adj[pre].append(course)

    # 2. Add Sources to Queue
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])

    # 3. Process
    count = 0
    while queue:
        node = queue.popleft()
        count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return count == num_courses`,
    java: `public static boolean canFinish(int numCourses, int[][] prerequisites) {
    int[] inDegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) {
        adj.add(new ArrayList<>());
    }

    // 1. Build Graph
    for (int[] prereq : prerequisites) {
        int course = prereq[0];
        int pre = prereq[1];
        inDegree[course]++;
        adj.get(pre).add(course);
    }

    // 2. Add Sources to Queue
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.offer(i);
    }

    // 3. Process
    int count = 0;
    while (!queue.isEmpty()) {
        int node = queue.poll();
        count++;
        for (int neighbor : adj.get(node)) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) queue.offer(neighbor);
        }
    }

    return count == numCourses;
}`,
    cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<int> inDegree(numCourses, 0);
    vector<vector<int>> adj(numCourses);

    // 1. Build Graph
    for (const auto& prereq : prerequisites) {
        int course = prereq[0];
        int pre = prereq[1];
        inDegree[course]++;
        adj[pre].push_back(course);
    }

    // 2. Add Sources to Queue
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    // 3. Process
    int count = 0;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        count++;
        for (int neighbor : adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) q.push(neighbor);
        }
    }

    return count == numCourses;
}`,
    javascript: `function canFinish(numCourses, prerequisites) {
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
}`
  },
  problems: [
    {
      id: 'ts-1',
      title: 'Course Schedule',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      hints: createHints(
        "Build graph from prerequisites.",
        "Calculate in-degrees for all courses.",
        "Use BFS to process nodes with 0 in-degree first."
      )
    },
    {
      id: 'ts-2',
      title: 'Course Schedule II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
      hints: createHints(
        "Same as Course Schedule but return the ordering.",
        "Track the order of processing nodes.",
        "If cycle exists, return empty array."
      )
    },
    {
      id: 'ts-3',
      title: 'Prerequisite Tasks',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/prerequisite-tasks/',
      hints: createHints(
        "Check if DAG using topological sort.",
        "Build adjacency list and in-degree array.",
        "Return true if all nodes can be processed."
      )
    }
  ]
};
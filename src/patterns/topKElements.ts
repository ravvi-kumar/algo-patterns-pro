import { type Pattern, PatternDifficulty, Difficulty } from '../types';
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
  codeExample: {
    typescript: `function findKthLargest(nums: number[], k: number): number {
  // Min-Heap implementation for Kth largest
  const minHeap: number[] = [];

  for (const num of nums) {
    minHeap.push(num);

    // Keep heap size at most K
    if (minHeap.length > k) {
      // Remove smallest (heapify up from root, then heapify down)
      minHeap.sort((a, b) => a - b);
      minHeap.shift();
    }
  }

  return minHeap[0]; // Root of min-heap is Kth largest
}`,
    python: `import heapq

def find_kth_largest(nums: List[int], k: int) -> int:
    # Min-Heap implementation for Kth largest
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)

        # Keep heap size at most K
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest

    return min_heap[0]  # Root of min-heap is Kth largest`,
    java: `public static int findKthLargest(int[] nums, int k) {
    // Min-Heap implementation for Kth largest
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
        minHeap.offer(num);

        // Keep heap size at most K
        if (minHeap.size() > k) {
            minHeap.poll();  // Remove smallest
        }
    }

    return minHeap.peek();  // Root of min-heap is Kth largest
}`,
    cpp: `int findKthLargest(const vector<int>& nums, int k) {
    // Min-Heap implementation for Kth largest
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);

        // Keep heap size at most K
        if (minHeap.size() > k) {
            minHeap.pop();  // Remove smallest
        }
    }

    return minHeap.top();  // Root of min-heap is Kth largest
}`,
    javascript: `function findKthLargest(nums, k) {
  // Min-Heap implementation for Kth largest
  // Note: JS doesn't have built-in heap, this is a simplified version
  const minHeap = [];

  class MinHeap {
    push(val) {
      minHeap.push(val);
      this.bubbleUp(minHeap.length - 1);
    }

    bubbleUp(index) {
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (minHeap[parent] <= minHeap[index]) break;
        [minHeap[parent], minHeap[index]] = [minHeap[index], minHeap[parent]];
        index = parent;
      }
    }

    pop() {
      const min = minHeap[0];
      const end = minHeap.pop();
      if (minHeap.length > 0) {
        minHeap[0] = end;
        this.bubbleDown(0);
      }
      return min;
    }

    bubbleDown(index) {
      while (true) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;

        if (left < minHeap.length && minHeap[left] < minHeap[smallest]) {
          smallest = left;
        }
        if (right < minHeap.length && minHeap[right] < minHeap[smallest]) {
          smallest = right;
        }

        if (smallest === index) break;
        [minHeap[index], minHeap[smallest]] = [minHeap[smallest], minHeap[index]];
        index = smallest;
      }
    }

    peek() {
      return minHeap[0];
    }

    size() {
      return minHeap.length;
    }
  }

  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);

    // Keep heap size at most K
    if (heap.size() > k) {
      heap.pop();  // Remove smallest
    }
  }

  return heap.peek();  // Root of min-heap is Kth largest
}`
  },
  problems: [
    { id: 'tk-1', title: 'Top K Frequent Elements', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', hints: createHints("Map frequency first. Then use Heap or Bucket Sort.", "Min-Heap of size K storing [freq, num].", "Bucket sort is O(N) where index is frequency.") },
    { id: 'tk-2', title: 'Kth Largest Element', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', hints: createHints("Min-Heap of size K.", "Push element. If size > K, pop min.", "Root of heap is Kth largest.") },
    { id: 'tk-3', title: 'K Closest Points to Origin', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', hints: createHints("Max-Heap of size K (distance).", "We want smallest distances, so we eject largest distances.", "Distance formula: x^2 + y^2 (no need for sqrt).") },
  ]
};
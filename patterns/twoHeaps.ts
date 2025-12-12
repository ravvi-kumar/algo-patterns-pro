import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const twoHeaps: Pattern = {
  id: 'two-heaps',
  title: 'Two Heaps',
  shortDescription: 'Simultaneous access to median or extrema.',
  difficulty: PatternDifficulty.Advanced,
  fullDescription: `This pattern uses two priority queues: a Min-Heap and a Max-Heap. It is the standard approach for problems where you need to find the median of a dataset dynamically or balance two parts of a dataset.`,
  keyInsights: [
    "Balancing Act: Keep one half of the numbers in a Max-Heap (smaller half) and the other half in a Min-Heap (larger half).",
    "Median Access: The median is either the top of one heap or the average of the tops of both.",
    "Invariant: The size difference between the two heaps must never exceed 1. Rebalance after every insertion."
  ],
  commonPitfalls: [
    "Rebalancing: Forgetting to move the top element from one heap to the other if the size difference > 1.",
    "Direction Confusion: Putting large numbers in the Max-Heap or small numbers in the Min-Heap breaks the order. Max-Heap should store the 'left' side (smaller numbers), Min-Heap should store 'right' side (larger numbers).",
    "Language limitation: JavaScript has no built-in Heap. You often need to implement a simple class or assume one exists in an interview setting."
  ],
  codeExample: {
    typescript: `class MedianFinder {
  private maxHeap: number[] = []; // Lower half
  private minHeap: number[] = []; // Upper half

  addNum(num: number): void {
    // Add to maxHeap first
    if (this.maxHeap.length === 0 || num <= this.maxHeap[0]) {
      this.maxHeap.push(num);
      this.maxHeap.sort((a, b) => b - a); // Max heap (descending)
    } else {
      this.minHeap.push(num);
      this.minHeap.sort((a, b) => a - b); // Min heap (ascending)
    }

    // Rebalance
    if (this.maxHeap.length > this.minHeap.length + 1) {
      const val = this.maxHeap.shift()!;
      this.minHeap.push(val);
      this.minHeap.sort((a, b) => a - b);
    } else if (this.minHeap.length > this.maxHeap.length) {
      const val = this.minHeap.shift()!;
      this.maxHeap.push(val);
      this.maxHeap.sort((a, b) => b - a);
    }
  }

  findMedian(): number {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}`,
    python: `import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # Lower half (max heap using negative values)
        self.min_heap = []  # Upper half (min heap)

    def add_num(self, num: int) -> None:
        # Add to max heap first (using negative for max heap)
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)

        # Rebalance
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        elif len(self.min_heap) > len(self.max_heap):
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)

    def find_median(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2`,
    java: `class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Lower half
    private PriorityQueue<Integer> minHeap; // Upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b, a)); // Max heap
        minHeap = new PriorityQueue<>(); // Min heap
    }

    public void addNum(int num) {
        // Add to max heap first
        if (maxHeap.isEmpty() || num <= maxHeap.peek()) {
            maxHeap.offer(num);
        } else {
            minHeap.offer(num);
        }

        // Rebalance
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.offer(maxHeap.poll());
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
    cpp: `class MedianFinder {
private:
    priority_queue<int> maxHeap; // Lower half (max heap)
    priority_queue<int, vector<int>, greater<int>> minHeap; // Upper half (min heap)

public:
    void addNum(int num) {
        // Add to max heap first
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }

        // Rebalance
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        }
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
    javascript: `class MedianFinder {
  constructor() {
    this.maxHeap = []; // Lower half (using negative for max heap simulation)
    this.minHeap = []; // Upper half
  }

  addNum(num) {
    // Add to max heap first (using negative values)
    if (this.maxHeap.length === 0 || num <= -this.maxHeap[0]) {
      this.maxHeap.push(-num);
      this.maxHeap.sort((a, b) => a - b); // Sort to maintain heap property
    } else {
      this.minHeap.push(num);
      this.minHeap.sort((a, b) => a - b);
    }

    // Rebalance
    if (this.maxHeap.length > this.minHeap.length + 1) {
      const val = -this.maxHeap.shift();
      this.minHeap.push(val);
      this.minHeap.sort((a, b) => a - b);
    } else if (this.minHeap.length > this.maxHeap.length) {
      const val = this.minHeap.shift();
      this.maxHeap.push(-val);
      this.maxHeap.sort((a, b) => a - b);
    }
  }

  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return -this.maxHeap[0];
    }
    return (-this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}`
  },
  problems: [
    {
      id: 'th-1',
      title: 'Find Median from Data Stream',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
      hints: createHints(
        "Use two heaps: max heap for lower half, min heap for upper half.",
        "Keep size difference <= 1.",
        "Median is either top of larger heap or average of both tops."
      )
    },
    {
      id: 'th-2',
      title: 'Sliding Window Median',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/sliding-window-median/',
      hints: createHints(
        "Two heaps with lazy deletion for sliding window.",
        "Remove elements that slide out of window.",
        "Rebalance after each removal and insertion."
      )
    }
  ]
};
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
  codeExample: `class MedianFinder {
  // maxHeap for lower half, minHeap for upper half
  addNum(num) {
    if (this.maxHeap.isEmpty() || num < this.maxHeap.peek()) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }
    
    // Rebalance
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2.0;
  }
}`,
  problems: [
    {
      id: 'th-1',
      title: 'Find Median from Data Stream',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
      hints: createHints(
        "Maintain a Max-Heap (small half) and a Min-Heap (large half).",
        "If heaps are even size, median is average of tops. If odd, median is top of the larger heap.",
        "Always rebalance after insertion so size difference is at most 1."
      )
    },
    {
      id: 'th-2',
      title: 'Sliding Window Median',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/sliding-window-median/',
      hints: createHints(
        "Combine Sliding Window with Two Heaps.",
        "When sliding window moves, you must remove the outgoing element from the heaps. Lazy removal (hash map of elements to delete) is a common trick since standard heaps don't support random deletion O(log N).",
        "Balance the heaps after lazy removal."
      )
    },
    {
      id: 'th-3',
      title: 'IPO',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/ipo/',
      hints: createHints(
        "Use a Min-Heap to store projects by 'Capital' required (so you can see what you can afford).",
        "Use a Max-Heap to store affordable projects by 'Profit' (to pick the best one).",
        "Move all affordable projects from Min-Heap to Max-Heap, then pop the Max-Heap."
      )
    }
  ]
};
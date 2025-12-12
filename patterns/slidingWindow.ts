import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const slidingWindow: Pattern = {
  id: 'sliding-window',
  title: 'Sliding Window',
  shortDescription: 'Efficiently process subsets of sequential data.',
  difficulty: PatternDifficulty.Beginner,
  fullDescription: `The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or linked list. The mental model is a "worm" moving through the data—eating new elements and excreting old ones.`,
  keyInsights: [
    "Keyword Recognition: If asked for 'longest/shortest' substring/subarray or 'max/min' sum with a contiguous constraint, it is Sliding Window.",
    "The 2-Step Protocol: 1. Expand `windowEnd` (add to state). 2. Shrink `windowStart` with a `while` loop if constraints are violated.",
    "State Management: You usually only need a HashMap (frequency) or a running Sum variable to track validity."
  ],
  commonPitfalls: [
    "Shrink Logic: Forgetting to remove the effect of the outgoing element (e.g., decrementing count in map) before incrementing 'windowStart'.",
    "Update Timing: Updating the global result (maxLen) at the wrong time. Usually, you update it after the shrink loop ensures the window is valid again.",
    "Initialization: Not handling the case where the input array is smaller than the window size K."
  ],
  codeExample: {
    typescript: `function slidingWindow(arr: number[], k: number): number {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add (Expand)

    if (windowEnd >= k - 1) { // Window size met
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // Subtract (Shrink)
      windowStart++; // Slide
    }
  }
  return maxSum;
}`,
    python: `def sliding_window(arr: list[int], k: int) -> int:
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end]  # Add (Expand)

        if window_end >= k - 1:  # Window size met
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]  # Subtract (Shrink)
            window_start += 1  # Slide

    return max_sum`,
    java: `public static int slidingWindow(int[] arr, int k) {
    int maxSum = 0;
    int windowSum = 0;
    int windowStart = 0;

    for (int windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        windowSum += arr[windowEnd]; // Add (Expand)

        if (windowEnd >= k - 1) { // Window size met
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract (Shrink)
            windowStart++; // Slide
        }
    }
    return maxSum;
}`,
    cpp: `int slidingWindow(const vector<int>& arr, int k) {
    int maxSum = 0;
    int windowSum = 0;
    int windowStart = 0;

    for (int windowEnd = 0; windowEnd < arr.size(); windowEnd++) {
        windowSum += arr[windowEnd]; // Add (Expand)

        if (windowEnd >= k - 1) { // Window size met
            maxSum = max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract (Shrink)
            windowStart++; // Slide
        }
    }
    return maxSum;
}`,
    javascript: `function slidingWindow(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add (Expand)

    if (windowEnd >= k - 1) { // Window size met
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart]; // Subtract (Shrink)
      windowStart++; // Slide
    }
  }
  return maxSum;
}`
  },
  problems: [
    { 
      id: 'sw-1', 
      title: 'Max Sum Subarray of Size K', 
      difficulty: Difficulty.Easy, 
      leetcodeUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/',
      hints: createHints(
        "Don't recalculate the sum from scratch. Subtract the element leaving the window and add the element entering.",
        "Maintain 'windowSum'. When 'windowEnd' >= k-1, update max, subtract arr[windowStart], increment windowStart.",
        "Handle cases where array length < k."
      )
    },
    { 
      id: 'sw-2', 
      title: 'Smallest Subarray with Sum >= S', 
      difficulty: Difficulty.Medium, 
      leetcodeUrl: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
      hints: createHints(
        "Dynamic window size. Expand (add elements) until sum >= S. Then shrink (remove from start) to see if it's still valid.",
        "Outer loop expands 'windowEnd'. Inner while loop shrinks 'windowStart' while windowSum >= S.",
        "Initialize minLength to Infinity. If it stays Infinity, return 0."
      )
    },
    { 
      id: 'sw-3', 
      title: 'Longest Substring with K Distinct Chars', 
      difficulty: Difficulty.Medium, 
      leetcodeUrl: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/',
      hints: createHints(
        "Use a Hash Map to track character frequencies in the current window. Map size = distinct count.",
        "Expand windowEnd. Add char to map. While map.size > K, shrink windowStart (decrement count in map, remove if 0).",
        "The answer is calculated at every step (windowEnd - windowStart + 1) after the shrink loop ensures validity."
      )
    },
    { 
      id: 'sw-4', 
      title: 'Fruits into Baskets', 
      difficulty: Difficulty.Medium, 
      leetcodeUrl: 'https://leetcode.com/problems/fruit-into-baskets/',
      hints: createHints(
        "Translate problem: Find the longest subarray with at most 2 distinct numbers.",
        "This is exactly 'Longest Substring with K Distinct Chars' where K=2.",
        "Don't get confused by the fruit wording. It's strictly an array pattern problem."
      )
    },
  ]
};
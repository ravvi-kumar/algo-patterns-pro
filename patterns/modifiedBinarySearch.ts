import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const modifiedBinarySearch: Pattern = {
  id: 'modified-binary-search',
  title: 'Modified Binary Search',
  shortDescription: 'Searching in sorted, rotated, or infinite arrays.',
  difficulty: PatternDifficulty.Beginner,
  fullDescription: `Binary Search is a classic O(log N) algorithm. However, coding interviews often twist it: the array might be order-agnostic (ascending or descending), bitonic, rotated, or infinite.`,
  keyInsights: [
    "The Mid Calculation: Always use \`mid = start + floor((end - start) / 2)\` to avoid integer overflow in strongly typed languages.",
    "Loop Condition: \`while (start <= end)\` allows checking the single element left. If using \`start < end\`, you might miss the last element.",
    "Sorted Halves: In a rotated sorted array, at least one half (left or right) is ALWAYS sorted. Check which one, and see if your target lies within that range."
  ],
  commonPitfalls: [
    "Infinite Loop: Failing to update \`start = mid + 1\` or \`end = mid - 1\`. If you set \`start = mid\` without a condition, you might get stuck.",
    "Order Agnostic: Assuming the array is always ascending. Sometimes you need to check \`arr[start] < arr[end]\` to determine direction.",
    "Floor/Ceil: When finding 'next letter' or 'closest element', the answer usually lies at \`start\` or \`end\` after the loop breaks."
  ],
  codeExample: `function binarySearch(arr: number[], target: number): number {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2);

    if (target === arr[mid]) return mid;
    
    if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}`,
  problems: [
    {
      id: 'mbs-1',
      title: 'Binary Search',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
      hints: createHints(
        "Initialize start=0, end=length-1. Loop while start <= end.",
        "Calculate mid. If arr[mid] == target, return mid.",
        "If target < arr[mid], search left (end=mid-1). Else search right."
      )
    },
    {
      id: 'mbs-2',
      title: 'Search in Rotated Sorted Array',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      hints: createHints(
        "Find which half is sorted. If arr[start] <= arr[mid], left side is sorted.",
        "Check if target is within the sorted range. If yes, search that half. If no, search the other half.",
        "This runs in O(log N) without needing to find the pivot first."
      )
    },
    {
      id: 'mbs-3',
      title: 'Find Minimum in Rotated Sorted Array',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      hints: createHints(
        "If arr[mid] > arr[right], the minimum is to the right (the pivot happened there).",
        "Else (arr[mid] < arr[right]), the minimum is at mid or to the left.",
        "Loop while start < end. When loop breaks, start/end is the min."
      )
    }
  ]
};
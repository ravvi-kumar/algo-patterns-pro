import { type Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const twoPointers: Pattern = {
  id: 'two-pointers',
  title: 'Two Pointers',
  shortDescription: 'Iterate through sorted data with two cursors.',
  difficulty: PatternDifficulty.Beginner,
  fullDescription: `The Two Pointers pattern allows us to process sorted arrays or linked lists in O(N) time and O(1) space. The "Mental Model" is to shrink the search space from both ends (or expand from center) based on a condition.`,
  keyInsights: [
    "Sorted Input: If the array is sorted and you need a pair/triplet or to remove duplicates, it is 99% Two Pointers.",
    "Movement Logic: Compare `sum` vs `target`. Too small? `left++`. Too big? `right--`. This eliminates nested loops.",
    "Space Win: This is the only way to solve these problems in O(1) space (HashMaps require O(N))."
  ],
  commonPitfalls: [
    "Off-by-one Errors: Confusing 'left < right' with 'left <= right'. Use '<' when pointers shouldn't cross or overlap (like pair sum), and '<=' when they might need to check the same element.",
    "Infinite Loops: Forgetting to increment 'left' or decrement 'right' inside an else block or complex condition.",
    "Unsorted Input: Forgetting that this pattern usually requires the input to be sorted first. If it's not sorted, you might need to sort it (O(N log N))."
  ],
  codeExample: {
    typescript: `function pairWithTargetSum(arr: number[], targetSum: number): number[] {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) return [left, right];

    if (targetSum > currentSum) left++; // Need larger sum
    else right--; // Need smaller sum
  }
  return [-1, -1];
}`,
    python: `def pair_with_target_sum(arr: List[int], target_sum: int) -> List[int]:
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target_sum:
            return [left, right]

        if target_sum > current_sum:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return [-1, -1]`,
    java: `public static int[] pairWithTargetSum(int[] arr, int targetSum) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == targetSum) return new int[]{left, right};

        if (targetSum > currentSum) left++; // Need larger sum
        else right--; // Need smaller sum
    }
    return new int[]{-1, -1};
}`,
    cpp: `vector<int> pairWithTargetSum(const vector<int>& arr, int targetSum) {
    int left = 0;
    int right = arr.size() - 1;

    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == targetSum) return {left, right};

        if (targetSum > currentSum) left++; // Need larger sum
        else right--; // Need smaller sum
    }
    return {-1, -1};
}`,
    javascript: `function pairWithTargetSum(arr, targetSum) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) return [left, right];

    if (targetSum > currentSum) left++; // Need larger sum
    else right--; // Need smaller sum
  }
  return [-1, -1];
}`
  },
  problems: [
    { 
      id: 'tp-1', 
      title: 'Pair with Target Sum', 
      difficulty: Difficulty.Easy, 
      leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      hints: createHints(
        "Since the array is sorted, we can use two pointers at opposite ends. If the sum is too small, which pointer should move?",
        "Initialize left=0, right=n-1. Loop while left < right. Check sum vs target.",
        "Ensure you handle the case where no pair exists. Remember the array is 0-indexed or 1-indexed based on problem description."
      )
    },
    { 
      id: 'tp-2', 
      title: 'Remove Duplicates', 
      difficulty: Difficulty.Easy, 
      leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
      hints: createHints(
        "One pointer tracks the position of the *last unique* element found. The other scans the array.",
        "Use a 'nextNonDuplicate' pointer starting at 1. Iterate 'i' from 1. If arr[i] != arr[nextNonDuplicate-1], copy it.",
        "Don't allocate extra space; modify in-place. Handle empty arrays."
      )
    },
    { 
      id: 'tp-3', 
      title: 'Squaring a Sorted Array', 
      difficulty: Difficulty.Easy, 
      leetcodeUrl: 'https://leetcode.com/problems/squares-of-a-sorted-array/',
      hints: createHints(
        "The largest squares will be at the ends (negative numbers become positive large squares). Fill the result array from the end.",
        "Two pointers at 0 and n-1. Compare abs(arr[left]) and abs(arr[right]). Square the larger one and put at end of result.",
        "Be careful with the index of the result array; decrement it after placing an element."
      )
    },
    { 
      id: 'tp-4', 
      title: '3Sum', 
      difficulty: Difficulty.Medium, 
      leetcodeUrl: 'https://leetcode.com/problems/3sum/',
      hints: createHints(
        "Sort the array first. Fix one element, then use Two Pointers to find the other two (target = 0 - fixed_element).",
        "Loop i from 0 to n-2. Skip duplicates for i. Then call twoSum(i+1, end, -arr[i]).",
        "Skipping duplicates is the hardest part. Skip them for the outer loop 'i' AND inside the two-pointer 'left' and 'right' movements."
      )
    },
  ]
};
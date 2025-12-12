import { type Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const cyclicSort: Pattern = {
  id: 'cyclic-sort',
  title: 'Cyclic Sort',
  shortDescription: 'Sort an array in O(N) when numbers are in a given range.',
  difficulty: PatternDifficulty.Beginner,
  fullDescription: `This pattern iterates over the array and swaps numbers to their correct indices. It is specifically designed for problems involving arrays containing numbers in a given range (like 1 to N) or (0 to N). The core idea is that if the data is valid, the number 'x' should ideally be at index 'x-1' (or 'x' for 0-indexed).`,
  keyInsights: [
    "Range Constraint: If the problem states numbers are in the range [1, N] or [0, N], use Cyclic Sort immediately.",
    "The Swap Logic: If `nums[i] != nums[nums[i] - 1]`, swap them. Else, move to next index. This places numbers in their 'correct' spots.",
    "Complexity: Although there are nested loops (conceptually), each number is swapped at most once to its correct position, making it O(N)."
  ],
  commonPitfalls: [
    "Index Mapping: Be careful with 0-indexed vs 1-indexed ranges. If range is 1 to N, number 'x' belongs at index 'x-1'.",
    "Infinite Loops: Ensure you only increment 'i' when the number is at the correct spot or cannot be swapped (e.g., duplicate or out of bounds).",
    "Duplicates: Handle cases where the target index already has the correct number (duplicate exists) to avoid infinite swapping."
  ],
  codeExample: {
    typescript: `function cyclicSort(nums: number[]): number[] {
  let i = 0;
  while (i < nums.length) {
    const correctIndex = nums[i] - 1; // Example for range 1 to N

    // Check if number is in range and not at correct position
    if (nums[i] !== nums[correctIndex]) {
      // Swap
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      // Number is correct, move on
      i++;
    }
  }
  return nums;
}`,
    python: `def cyclic_sort(nums: List[int]) -> List[int]:
    i = 0
    while i < len(nums):
        correct_index = nums[i] - 1  # Example for range 1 to N

        # Check if number is in range and not at correct position
        if nums[i] != nums[correct_index]:
            # Swap
            nums[i], nums[correct_index] = nums[correct_index], nums[i]
        else:
            # Number is correct, move on
            i += 1

    return nums`,
    java: `public static int[] cyclicSort(int[] nums) {
    int i = 0;
    while (i < nums.length) {
        int correctIndex = nums[i] - 1; // Example for range 1 to N

        // Check if number is in range and not at correct position
        if (nums[i] != nums[correctIndex]) {
            // Swap
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        } else {
            // Number is correct, move on
            i++;
        }
    }
    return nums;
}`,
    cpp: `vector<int> cyclicSort(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        int correctIndex = nums[i] - 1; // Example for range 1 to N

        // Check if number is in range and not at correct position
        if (nums[i] != nums[correctIndex]) {
            // Swap
            swap(nums[i], nums[correctIndex]);
        } else {
            // Number is correct, move on
            i++;
        }
    }
    return nums;
}`,
    javascript: `function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correctIndex = nums[i] - 1; // Example for range 1 to N

    // Check if number is in range and not at correct position
    if (nums[i] !== nums[correctIndex]) {
      // Swap
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      // Number is correct, move on
      i++;
    }
  }
  return nums;
}`
  },
  problems: [
    {
      id: 'cs-1',
      title: 'Missing Number',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
      hints: createHints(
        "Sort the array cyclically first (Range 0 to N). Be careful with the N value as it exceeds array bounds.",
        "Place each number 'x' at index 'x'. If 'x' >= n, ignore/skip it.",
        "After sorting, iterate through the array. The first index 'i' where nums[i] != i is the answer. If all match, N is the answer."
      )
    },
    {
      id: 'cs-2',
      title: 'Find All Numbers Disappeared in an Array',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
      hints: createHints(
        "Input range is 1 to N. Iterate and try to place num at index num-1.",
        "Swap nums[i] with nums[nums[i]-1] until correct or a duplicate is found at the target.",
        "Scan again after sorting. If nums[i] != i+1, then i+1 is a missing number."
      )
    },
    {
      id: 'cs-3',
      title: 'Find the Duplicate Number',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',
      hints: createHints(
        "Cyclic sort logic: If you try to swap nums[i] to its position but that position already holds the correct number, you found the duplicate.",
        "Alternatively, use Fast & Slow pointers (Floyd's Cycle Finding) treating the array indices as a linked list if the array cannot be modified.",
        "Note: Cyclic sort modifies the input array. If the problem requires read-only, you cannot use this specific O(1) space variant."
      )
    }
  ]
};
import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const mergeIntervals: Pattern = {
  id: 'merge-intervals',
  title: 'Merge Intervals',
  shortDescription: 'Overlapping interval manipulation.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Sort intervals by start time. Iterate and merge if the current interval starts before the previous one ends.`,
  keyInsights: [
    "Sort First: 99% of interval problems are solved by simply sorting by Start Time. Do this immediately.",
    "Overlap Logic: `Current.Start < Previous.End`? They overlap. That is the only check you need.",
    "Merge Action: If overlapping, extend the previous interval: `Previous.End = max(Previous.End, Current.End)`."
  ],
  commonPitfalls: [
    "Edge Contact: Be careful with strict inequalities. Intervals [1, 2] and [2, 3] usually merge into [1, 3]. Use '<=' instead of '<' for overlap checks.",
    "Updating End Time: When merging, the new end time is 'max(end1, end2)'. A common bug is just taking the second interval's end time, which might be shorter.",
    "Looping: Remember to add the *last* merged interval to your result array after the loop finishes (or initialize result with the first interval)."
  ],
  codeExample: `function merge(intervals: number[][]): number[][] {
  // Check empty
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  // Iterate and compare with merged[merged.length-1]
  return merged;
}`,
  problems: [
    { id: 'mi-1', title: 'Merge Intervals', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/', hints: createHints("Sort by start time first.", "If current.start <= lastMerged.end, merge them (max end). Else add new.", "Remember to add the first interval before looping.") },
    { id: 'mi-2', title: 'Insert Interval', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/insert-interval/', hints: createHints("Skip intervals ending before newInterval starts. Merge overlapping. Add remaining.", "Three stages: 1. Non-overlapping left, 2. Overlapping (merge), 3. Non-overlapping right.", "Handle edge cases where newInterval is at start or end.") },
    { id: 'mi-3', title: 'Intervals Intersection', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/interval-list-intersections/', hints: createHints("Two Pointers (one for each list). Check overlap: start = max(a.start, b.start), end = min(a.end, b.end).", "If start <= end, you found an intersection.", "Move the pointer of the interval that ends earlier.") },
  ]
};
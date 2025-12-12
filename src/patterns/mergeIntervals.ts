import { type Pattern, PatternDifficulty, Difficulty } from '../types';
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
  codeExample: {
    typescript: `function merge(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      // Overlap - merge
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap - add new interval
      merged.push(current);
    }
  }

  return merged;
}`,
    python: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for i in range(1, len(intervals)):
        current = intervals[i]
        last = merged[-1]

        if current[0] <= last[1]:
            # Overlap - merge
            last[1] = max(last[1], current[1])
        else:
            # No overlap - add new interval
            merged.append(current)

    return merged`,
    java: `public static int[][] merge(int[][] intervals) {
    if (intervals.length == 0) return new int[0][];

    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    merged.add(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
        int[] current = intervals[i];
        int[] last = merged.get(merged.size() - 1);

        if (current[0] <= last[1]) {
            // Overlap - merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            // No overlap - add new interval
            merged.add(current);
        }
    }

    return merged.toArray(new int[merged.size()][]);
}`,
    cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};

    sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[0] < b[0];
    });

    vector<vector<int>> merged;
    merged.push_back(intervals[0]);

    for (int i = 1; i < intervals.size(); i++) {
        vector<int> current = intervals[i];
        vector<int>& last = merged.back();

        if (current[0] <= last[1]) {
            // Overlap - merge
            last[1] = max(last[1], current[1]);
        } else {
            // No overlap - add new interval
            merged.push_back(current);
        }
    }

    return merged;
}`,
    javascript: `function merge(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      // Overlap - merge
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap - add new interval
      merged.push(current);
    }
  }

  return merged;
}`
  },
  problems: [
    { id: 'mi-1', title: 'Merge Intervals', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/', hints: createHints("Sort by start time first.", "If current.start <= lastMerged.end, merge them (max end). Else add new.", "Remember to add the first interval before looping.") },
    { id: 'mi-2', title: 'Insert Interval', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/insert-interval/', hints: createHints("Skip intervals ending before newInterval starts. Merge overlapping. Add remaining.", "Three stages: 1. Non-overlapping left, 2. Overlapping (merge), 3. Non-overlapping right.", "Handle edge cases where newInterval is at start or end.") },
    { id: 'mi-3', title: 'Intervals Intersection', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/interval-list-intersections/', hints: createHints("Two Pointers (one for each list). Check overlap: start = max(a.start, b.start), end = min(a.end, b.end).", "If start <= end, you found an intersection.", "Move the pointer of the interval that ends earlier.") },
  ]
};
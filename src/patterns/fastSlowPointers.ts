import { type Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const fastSlowPointers: Pattern = {
  id: 'fast-slow-pointers',
  title: 'Fast & Slow Pointers',
  shortDescription: 'Cycle detection and middle element finding.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `Also known as the Hare & Tortoise algorithm. Use two pointers moving at different speeds (usually 2x and 1x). If they meet, there is a cycle.`,
  keyInsights: [
    "Cycle Guarantee: If Fast (2x) meets Slow (1x), a cycle exists. This is mathematically guaranteed.",
    "Finding Middle: When Fast reaches the end, Slow is exactly in the middle. This is the standard way to split a list.",
    "Cycle Start: To find the start node, reset one pointer to Head and move both 1 step. They will meet at the cycle entry."
  ],
  commonPitfalls: [
    "Null Safety: The most common crash is not checking if 'fast' or 'fast.next' is null before moving. Always use 'while (fast !== null && fast.next !== null)'.",
    "Cycle Start Logic: Detecting the cycle is Part 1. Finding the *start* of the cycle is Part 2 (reset one pointer to head, move both 1 step). Don't mix them up.",
    "Cycle Length: To find length, once they meet, keep 'slow' there and move 'current' until it hits 'slow' again, counting steps."
  ],
  codeExample: {
    typescript: `function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    python: `function hasCycle(head: ListNode | null): boolean {
  slow = head;
  fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) return true
  
  return false;
`,
    java: `function hasCycle(head: ListNode | null): boolean {
  int slow = head;
  int fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    cpp: `function hasCycle(head: ListNode | null): boolean {
  int slow = head;
  int fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    javascript: `function hasCycle(head: ListNode | null) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) return true;
  }
  return false;
}`
  },
  problems: [
    { id: 'fs-1', title: 'LinkedList Cycle', difficulty: Difficulty.Easy, leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/', hints: createHints("Fast moves 2 steps, Slow moves 1 step.", "while (fast && fast.next) { ... }", "If fast reaches null, no cycle.") },
    { id: 'fs-2', title: 'Middle of LinkedList', difficulty: Difficulty.Easy, leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', hints: createHints("When Fast reaches the end, Slow will be exactly at the middle.", "Loop while fast != null && fast.next != null.", "Handle even/odd lengths naturally by the loop condition.") },
    { id: 'fs-3', title: 'Start of LinkedList Cycle', difficulty: Difficulty.Medium, leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/', hints: createHints("First detect cycle. Then reset one pointer to head. Move both 1 step at a time.", "Mathematical proof shows they will meet at cycle start.", "If no cycle found in part 1, return null.") },
    { id: 'fs-4', title: 'Happy Number', difficulty: Difficulty.Easy, leetcodeUrl: 'https://leetcode.com/problems/happy-number/', hints: createHints("Treat the sequence of numbers as a LinkedList. A repeating number is a cycle.", "Use Fast/Slow to detect if the sum-of-squares sequence loops.", "If it loops at 1, it's happy. If it loops elsewhere, it's not.") },
  ]
};
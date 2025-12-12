import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const linkedListReversal: Pattern = {
  id: 'linked-list-reversal',
  title: 'In-place Reversal of a LinkedList',
  shortDescription: 'Reverse links between nodes without extra memory.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `This pattern reverses the connections between nodes in a LinkedList. It's often used to reverse the whole list or a sub-list efficiently in O(N) time and O(1) space using iterative pointer manipulation.`,
  keyInsights: [
    "Three Pointers: You almost always need `prev`, `current`, and `next`.",
    "The Move: 1. Save `next`. 2. Point `current.next` to `prev`. 3. Move `prev` to `current`. 4. Move `current` to `next`.",
    "Sub-problems: Many hard problems break down into reversing small segments of a list (like K-Group reversal)."
  ],
  commonPitfalls: [
    "Lost Reference: The most common bug is forgetting to save `current.next` in a temporary variable before overwriting `current.next`. This breaks the chain.",
    "Head Update: If reversing the whole list, the new head is the last processed node (often 'prev' after the loop finishes).",
    "Sub-list Connections: When reversing a sub-list (m to n), you must remember to reconnect the 'node before m' to the 'new head of sub-list' and the 'original head of sub-list' (now tail) to the 'node after n'."
  ],
  codeExample: {
    typescript: `function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // Save next
    current.next = prev;           // Reverse link
    prev = current;                // Advance prev
    current = nextTemp;            // Advance current
  }
  return prev; // New head
}`,
    python: `def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    prev = None
    current = head

    while current is not None:
        next_temp = current.next  # Save next
        current.next = prev       # Reverse link
        prev = current            # Advance prev
        current = next_temp       # Advance current

    return prev  # New head`,
    java: `public static ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;

    while (current != null) {
        ListNode nextTemp = current.next; // Save next
        current.next = prev;                // Reverse link
        prev = current;                     // Advance prev
        current = nextTemp;                 // Advance current
    }
    return prev; // New head
}`,
    cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;

    while (current != nullptr) {
        ListNode* nextTemp = current->next; // Save next
        current->next = prev;               // Reverse link
        prev = current;                     // Advance prev
        current = nextTemp;                 // Advance current
    }
    return prev; // New head
}`,
    javascript: `function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // Save next
    current.next = prev;           // Reverse link
    prev = current;                // Advance prev
    current = nextTemp;            // Advance current
  }
  return prev; // New head
}`
  },
  problems: [
    {
      id: 'llr-1',
      title: 'Reverse Linked List',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
      hints: createHints(
        "Three pointers: prev, current, next.",
        "Save next before overwriting current.next.",
        "Return prev as new head."
      )
    },
    {
      id: 'llr-2',
      title: 'Reverse Linked List II',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list-ii/',
      hints: createHints(
        "Find node before position m using dummy node.",
        "Reverse sublist m to n, then reconnect.",
        "Handle case where m = 1 (reversing from head)."
      )
    },
    {
      id: 'llr-3',
      title: 'Reverse Nodes in k-Group',
      difficulty: Difficulty.Hard,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
      hints: createHints(
        "Iterate k nodes at a time.",
        "Reverse k-group using same reversal logic.",
        "Connect previous group to current reversed group.",
        // "Handle remaining nodes (< k) at end."
      )
    }
  ]
};
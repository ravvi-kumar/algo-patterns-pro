import { Pattern } from './types';
import { twoPointers } from './patterns/twoPointers';
import { slidingWindow } from './patterns/slidingWindow';
import { fastSlowPointers } from './patterns/fastSlowPointers';
import { mergeIntervals } from './patterns/mergeIntervals';
import { topKElements } from './patterns/topKElements';
import { cyclicSort } from './patterns/cyclicSort';
import { linkedListReversal } from './patterns/linkedListReversal';
import { treeBFS } from './patterns/treeBFS';
import { treeDFS } from './patterns/treeDFS';
import { modifiedBinarySearch } from './patterns/modifiedBinarySearch';
import { subsets } from './patterns/subsets';
import { bitwiseXor } from './patterns/bitwiseXor';
import { twoHeaps } from './patterns/twoHeaps';
import { topologicalSort } from './patterns/topologicalSort';
import { knapsackDP } from './patterns/knapsackDP';

export const PATTERNS: Pattern[] = [
  twoPointers,
  slidingWindow,
  fastSlowPointers,
  mergeIntervals,
  cyclicSort,
  linkedListReversal,
  treeBFS,
  treeDFS,
  topKElements,
  modifiedBinarySearch,
  subsets,
  bitwiseXor,
  twoHeaps,
  topologicalSort,
  knapsackDP
];
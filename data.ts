import { Pattern } from './types';
import { twoPointers } from './patterns/twoPointers';
import { slidingWindow } from './patterns/slidingWindow';
import { fastSlowPointers } from './patterns/fastSlowPointers';
import { mergeIntervals } from './patterns/mergeIntervals';
import { topKElements } from './patterns/topKElements';

export const PATTERNS: Pattern[] = [
  twoPointers,
  slidingWindow,
  fastSlowPointers,
  mergeIntervals,
  topKElements,
];

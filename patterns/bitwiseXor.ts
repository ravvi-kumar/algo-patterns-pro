import { Pattern, PatternDifficulty, Difficulty } from '../types';
import { createHints } from '../utils/patternUtils';

export const bitwiseXor: Pattern = {
  id: 'bitwise-xor',
  title: 'Bitwise XOR',
  shortDescription: 'Manipulating bits to solve array problems.',
  difficulty: PatternDifficulty.Intermediate,
  fullDescription: `The XOR (exclusive OR) operator is a powerful tool for certain array problems. The key properties are: X ^ X = 0 and X ^ 0 = X. This allows us to eliminate paired numbers and find unique ones without using extra space.`,
  keyInsights: [
    "Self-Cancellation: \`a ^ a = 0\`. This cancels out duplicate numbers.",
    "Identity: \`a ^ 0 = a\`.",
    "Commutative: Order doesn't matter. \`a ^ b ^ c = c ^ a ^ b\`."
  ],
  commonPitfalls: [
    "Operator Precedence: Bitwise operators often have lower precedence than comparison operators. Always wrap bitwise operations in parentheses: \`(a & 1) === 0\`.",
    "Negative Numbers: JS bitwise operations treat numbers as 32-bit signed integers. Be careful with overflow if numbers are huge.",
    "Not Magic: It only works for specific frequency problems (e.g., finding the element appearing odd number of times)."
  ],
  codeExample: `function findSingleNumber(arr: number[]): number {
  let result = 0;
  for (const num of arr) {
    result = result ^ num;
  }
  return result;
}`,
  problems: [
    {
      id: 'xor-1',
      title: 'Single Number',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/single-number/',
      hints: createHints(
        "Every number appears twice except for one. X ^ X = 0.",
        "Initialize result = 0. Loop through array and XOR every element.",
        "The final result is the single number."
      )
    },
    {
      id: 'xor-2',
      title: 'Single Number III',
      difficulty: Difficulty.Medium,
      leetcodeUrl: 'https://leetcode.com/problems/single-number-iii/',
      hints: createHints(
        "Two numbers are single. The XOR sum of the array will be n1 ^ n2.",
        "Find any bit that is set in the XOR sum (this bit differs between n1 and n2).",
        "Partition the array into two groups based on that bit. XOR each group separately to find n1 and n2."
      )
    },
    {
      id: 'xor-3',
      title: 'Complement of Base 10 Integer',
      difficulty: Difficulty.Easy,
      leetcodeUrl: 'https://leetcode.com/problems/complement-of-base-10-integer/',
      hints: createHints(
        "We need to flip bits. XORing a bit with 1 flips it.",
        "Calculate a mask of all 1s that is the same length as the number.",
        "Result is number ^ mask."
      )
    }
  ]
};
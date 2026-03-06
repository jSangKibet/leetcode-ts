/**
Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
 */

function findMaxConsecutiveOnes(nums: number[]): number {
  let maxConsecutiveOnes = 0;
  let consecutiveOnes = 0;
  nums.forEach((n) => {
    if (n === 0) {
      if (consecutiveOnes > maxConsecutiveOnes) {
        maxConsecutiveOnes = consecutiveOnes;
      }

      consecutiveOnes = 0;
    } else {
      consecutiveOnes++;
    }
  });

  if (consecutiveOnes > maxConsecutiveOnes) {
    maxConsecutiveOnes = consecutiveOnes;
  }

  return maxConsecutiveOnes;
}

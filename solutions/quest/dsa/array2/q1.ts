/**
You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

 

Example 1:

Input: nums = [1,2,2,4]
Output: [2,3]
Example 2:

Input: nums = [1,1]
Output: [1,2]
 

Constraints:

2 <= nums.length <= 104
1 <= nums[i] <= 104
 */

function findRepeated(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === nums[i]) {
        return nums[j];
      }
    }
  }

  return 0;
}

function numExists(nums: number[], n: number) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === n) return true;
  }

  return false;
}

function findErrorNums(nums: number[]): number[] {
  let error = 0;
  const repeated = findRepeated(nums);

  for (let i = 0; i < nums.length; i++) {
    const n = i + 1;
    if (!numExists(nums, n)) {
      error = n;
      break;
    }
  }

  return [repeated, error];
}

console.log("Expected: [2,3] Found", findErrorNums([1, 2, 2, 4]));
console.log("Expected: [1,2] Found", findErrorNums([1, 1]));
console.log("Expected: [2,1] Found", findErrorNums([2, 2]));
console.log("Expected: [2,1] Found", findErrorNums([2, 3, 2]));
console.log("Expected: [2,1] Found", findErrorNums([3, 2, 2]));

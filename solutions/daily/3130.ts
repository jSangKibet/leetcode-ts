/**
3130. Find All Possible Stable Binary Arrays II
Hard

You are given 3 positive integers zero, one, and limit.

A binary array arr is called stable if:
The number of occurrences of 0 in arr is exactly zero.
The number of occurrences of 1 in arr is exactly one.
Each subarray of arr with a size greater than limit must contain both 0 and 1.
Return the total number of stable binary arrays.

Since the answer may be very large, return it modulo 10^9 + 7.

Example 1:
Input: zero = 1, one = 1, limit = 2
Output: 2

Explanation:
The two possible stable binary arrays are [1,0] and [0,1].

Example 2:
Input: zero = 1, one = 2, limit = 1
Output: 1

Explanation:
The only possible stable binary array is [1,0,1].

Example 3:
Input: zero = 3, one = 3, limit = 2
Output: 14

Explanation:
All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].

Constraints:
1 <= zero, one, limit <= 1000
 */

// check if string has prerequisite number of 0s and 1s
function hasCorrectZO(s: string, z: number, o: number) {
  let zs = 0;
  let os = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "0") {
      zs += 1;
    } else {
      os += 1;
    }
  }

  return zs === z && os === o;
}

// Check if a string has both '0' and '1'
function hasBoth(s: string): boolean {
  let zeroFound = false;
  let oneFound = false;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "0") {
      zeroFound = true;
    } else {
      oneFound = true;
    }
    if (zeroFound && oneFound) return true;
  }
  return false;
}

// Check if all substrings of a given length have both '0' and '1'
function allSubstringsOfLengthHaveBoth(s: string, l: number): boolean {
  for (let i = l; i <= s.length; i++) {
    const substr = s.slice(i - l, i);
    if (!hasBoth(substr)) return false;
  }

  return true;
}

// Check if all substrings of a length above given have both '0' and '1'
// No need to check the largest substring (the string itself)
function allSubstringsOfLengthLargerHaveBoth(s: string, l: number): boolean {
  for (let i = l + 1; i < s.length; i++) {
    if (!allSubstringsOfLengthHaveBoth(s, i)) return false;
  }

  return true;
}

// get smallest number for given 0s and 1s
function getSmallest(z: number, o: number): number {
  let numberStr = "";
  for (let i = 0; i < z; i++) {
    numberStr += "0";
  }
  for (let i = 0; i < o; i++) {
    numberStr += "1";
  }
  return parseInt(numberStr, 2);
}

// get largest number for given 0s and 1s
function getLargest(z: number, o: number): number {
  let numberStr = "";
  for (let i = 0; i < o; i++) {
    numberStr += "1";
  }
  for (let i = 0; i < z; i++) {
    numberStr += "0";
  }
  return parseInt(numberStr, 2);
}

function numberOfStableArrays(
  zero: number,
  one: number,
  limit: number,
): number {
  const MOD = 1_000_000_007;
  const smallest = getSmallest(zero, one);
  const largest = getLargest(zero, one);
  const length = zero + one;
  const actualLimit = limit > length ? length : limit;
  let stableArrays = 0;
  for (let i = smallest; i <= largest; i++) {
    const bI = i.toString(2).padStart(length, "0");
    if (hasCorrectZO(bI, zero, one)) {
      if (allSubstringsOfLengthLargerHaveBoth(bI, actualLimit)) {
        stableArrays += 1;
      }
    }
  }
  return stableArrays % MOD;
}

/**
 * The question is now well understood, here is my understanding
 * The domain is all arrays with numOfZeros = zero and numOfOnes = one
 * Qualifying arrays are those whose subarrays of length > limit contain both 0 and 1
 */

/**
 * Plan 1 (example: zero=3, one=2 and limit=1)
 * Compute max length (zero+one, 5)
 * Start number = (zero 0 + one 1 = 00011)
 * End number = (one 1 + zero 0 = 11000)
 * Get decimal value of start and end
 * Loop from start to end
 * Durint the loop, convert index to binary
 * Count the number of 1s and 0s
 * If it qualifies, check subarrays (separate function)
 * If it qualifies, count and continue
 *
 * Function: check if array has both 0 and 1
 * Loop through array(string)
 * If char at index is 0, set 0 to found
 * If char at index is 1, set 1 to found
 * If both 0 and 1 are found, short circuit return true
 * At the end of the loop, return false
 *
 * Function to check if all subarrays of length>limit contain both 0 and 1 given a binary array (string)
 * Loop from limit+1 to array length as current length (cl)
 * For each cl, loop from cl-1 to length-1
 * Get the subarray in the indices and check if it has both 0 and 1
 * At any point the result is false, short the entire function to false
 * Return true at the end of the function
 *
 * Missing: Where to stop for very large answers
 */

/**
 * Missed issue: If limit > (zero + one), there is no subarray that the script can compute that meets this
 * According to AI, this means just get the total number of possible stable arrays.
 * Part not well understood: For (z=9, o=23, l=79), count number of ways to arrange 9 zeros among 32 positions.
 */

console.log("Expected 2 found ", numberOfStableArrays(1, 1, 2));
console.log("Expected 1 found ", numberOfStableArrays(1, 2, 1));
console.log("Expected 14 found ", numberOfStableArrays(3, 3, 2));
//console.log("Expected 14 found ", numberOfStableArrays(9, 23, 79)) - takes too long;


// Failed: I just don't get how a limit larger than the possible subarray length can be allowed or computed.
// Answer understood: In such a case there are 0 subarrays larger than limit, hence the answer is simply every subarray meeting the first two conditions.
// Can this be done by counting to max length only?

// Failed: Solution inefficient!
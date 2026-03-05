/**
1758. Minimum Changes To Make Alternating Binary String
You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.

 

Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.
Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.
Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".
 

Constraints:

1 <= s.length <= 104
s[i] is either '0' or '1'.
*/

function minOperations(s: string): number {
  // track needed changes for a solution starting with '0'
  let zeroStartChangeCounter = 0;
  // track needed changes for a solution starting with '1'
  let oneStartChangeCounter = 0;
  // set flags for the following loop that indicate which check against each counter
  let currentZero = "0";
  let currentOne = "1";
  // loop through string (if TLE, convert to array first)
  for (let i = 0; i < s.length; i++) {
    // check if the current character conforms with zero-start solution
    // if not, increment needed zero-start changes
    if (s.charAt(i) !== currentZero) zeroStartChangeCounter++;
    // check if the current character conforms with one-start solution
    // if not, increment needed one-start changes
    if (s.charAt(i) !== currentOne) oneStartChangeCounter++;
    // toggle flags for next checks
    currentZero = currentZero === "0" ? "1" : "0";
    currentOne = currentOne === "0" ? "1" : "0";
  }

  // return smaller of the two change counters
  return Math.min(zeroStartChangeCounter, oneStartChangeCounter);
}

console.log("Expected 1, found ",minOperations("0100"))
console.log("Expected 0, found ",minOperations("10"))
console.log("Expected 2, found ",minOperations("1111"))


/**
1784. Check if Binary String Has at Most One Segment of Ones
Easy
Given a binary string s ​​​​​without leading zeros, return true​​​ if s contains at most one contiguous segment of ones. Otherwise, return false.

 

Example 1:

Input: s = "1001"
Output: false
Explanation: The ones do not form a contiguous segment.
Example 2:

Input: s = "110"
Output: true
 

Constraints:

1 <= s.length <= 100
s[i]​​​​ is either '0' or '1'.
s[0] is '1'.
*/

function checkOnesSegment(s: string): boolean {
  // short circuit if length is only 1
  // this means there are no zeros e.g. 1 contiguous 1 via 1, 10 or 11
  if (s.length < 3) return true;

  // loop through string from 3rd character
  for (let i = 2; i < s.length; i++) {
    // if the current char is 1
    // and the previous is 0
    if (s.charAt(i) === "1" && s.charAt(i - 1) === "0") {
      // there is more than 1 contiguous one, hence fail
      return false;
    }
  }

  // if the loop is fully processed, there is only 1 group of ones
  return true;
}
console.log("Expected false, found ", checkOnesSegment("1001"));
console.log("Expected true, found ", checkOnesSegment("110"));

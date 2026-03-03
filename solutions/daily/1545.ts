/**
1545. Find Kth Bit in Nth Binary String
Medium
Given two positive integers n and k, the binary string Sn is formed as follows:

S1 = "0"
Si = Si - 1 + "1" + reverse(invert(Si - 1)) for i > 1
Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).

For example, the first four strings in the above sequence are:

S1 = "0"
S2 = "011"
S3 = "0111001"
S4 = "011100110110001"
Return the kth bit in Sn. It is guaranteed that k is valid for the given n.

 

Example 1:

Input: n = 3, k = 1
Output: "0"
Explanation: S3 is "0111001".
The 1st bit is "0".
Example 2:

Input: n = 4, k = 11
Output: "1"
Explanation: S4 is "011100110110001".
The 11th bit is "1".
 

Constraints:

1 <= n <= 20
1 <= k <= 2n - 1
 */
function invert(s: string) {
  let inverted = "";
  for (let i = 0; i < s.length; i++) {
    inverted += s.charAt(i) === "1" ? "0" : "1";
  }
  return inverted;
}

function reverse(s: string) {
  const charArray = s.split("");
  charArray.reverse();
  return charArray.join("");
}

function compute(n: number): string {
  if (n < 2) return "0";
  const prev = compute(n - 1);
  return prev + "1" + reverse(invert(prev));
}

function findKthBit(n: number, k: number): string {
  const sn = compute(n);
  console.log(`Computed for n=${n}, k=${k}: `, sn);
  return sn.charAt(k - 1);
}

// console.log("N=1", compute(1));
// console.log("N=2", compute(2));
// console.log("N=3", compute(3));
// console.log("N=4", compute(4));

console.log("For n=3 and k=1, expected '0', found ", findKthBit(3, 1));
console.log("For n=4 and k=11, expected '1', found ", findKthBit(4, 11));

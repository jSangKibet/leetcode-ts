/***
 * 1461. Check If a String Contains All Binary Codes of Size K (Medium)
 *
 * Given a binary string s and an integer k, return true if every binary code
 * of length k is a substring of s. Otherwise, return false.
 *
 * Example 1:
 * * Input: s = "00110110", k = 2
 * * Output: true
 * * Explanation: The binary codes of length 2 are "00", "01", "10" and "11".
 * *   They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
 *
 * Example 2:
 * * Input: s = "0110", k = 1
 * * Output: true
 * * Explanation: The binary codes of length 1 are "0" and "1", it is clear
 * *   that both exist as a substring.
 *
 * Example 3:
 * * Input: s = "0110", k = 2
 * * Output: false
 * * Explanation: The binary code "00" is of length 2 and does not exist in the array.
 *
 * Constraints:
 * * 1 <= s.length <= 5 * 10^5
 * * s[i] is either '0' or '1'.
 * * 1 <= k <= 20
 */

function getBinaryCode(len: number) {
  let largest = "";
  for (let i = 0; i < len; i++) {
    largest += "1";
  }

  let largestDecimal = parseInt(largest, 2);

  const binaryCode = new Set<string>();
  for (let i = 0; i <= largestDecimal; i++) {
    binaryCode.add(i.toString(2).padStart(len, "0"));
  }

  return binaryCode;
}

function hasAllCodes(s: string, k: number): boolean {
  const binaryCode = getBinaryCode(k);
  const solved = new Set<string>();

  for (let i = 0; i < s.length; i++) {
    const slice = s.slice(i, i + k);
    if (binaryCode.has(slice)) {
      solved.add(slice);
    }

    if (solved.size === binaryCode.size) {
      return true;
    }
  }

  return false;
}

console.log(hasAllCodes("0100011100110011110110101101011100110101110100110100110100010010010101001000011111010011011001001011000100001100000111001101100110010111011010111010101001000101101011110100100000111111010011010000110000010100011111011111100001111100110001000010010011001001010001011001011000011111100011111100101111101100101000100010111011000101100010101100010100001010011001010110100101100111111101110111100010110101000001101101100000010101001010100010011101001010011000001010101010001011110001111010011110110111001001000001101100101111000000010101010110000100111000111001000000001111010101101000101110001010111101101111111111000110010100100100111111001101111011101100100000111010000010000100010110001100000111001101110111111000010010000000000111001011001001000110000110000", 19));


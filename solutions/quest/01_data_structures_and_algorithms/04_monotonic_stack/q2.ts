/**
Q2. Daily Temperatures
Medium
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:

1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100
 */

function dailyTemperatures(temperatures: number[]): number[] {
  // temporary interface for operations
  interface Temp {
    // index at which temp was found
    index: number;
    // temp value
    temp: number;
  }

  // ordered stack of temps, desc order
  const stack: Temp[] = [];
  // set of temps where larger values are found
  // key: index, value: count to larger value
  const found: Map<number, number> = new Map();

  // loop through source temps
  for (let i = 0; i < temperatures.length; i++) {
    // check if item can be pushed to stack (value at the top must be >= current value)
    let canPush = stack.length
      ? stack[stack.length - 1].temp >= temperatures[i]
      : true;

    // for as long as the temp can't be pushed
    while (!canPush) {
      // get item at top of stack
      const top = stack.pop();
      // if item exists
      if (top !== undefined) {
        // count difference in index
        const diff = i - top.index;
        // set diff in set of found
        found.set(top.index, diff);
      }
      // set loop condition
      canPush = stack.length
        ? stack[stack.length - 1].temp >= temperatures[i]
        : true;
    }

    // push item to stack
    stack.push({
      index: i,
      temp: temperatures[i],
    });
  }

  // reconstruct result list
  const result: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    // get value from found set
    const c = found.get(i);
    // push found value or 0
    result.push(c === undefined ? 0 : c);
  }

  return result;
}

console.log(
  "Expected [1,1,4,2,1,1,0,0] found ",
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
);
console.log("Expected [1,1,1,0] found ", dailyTemperatures([30, 40, 50, 60]));
console.log("Expected [1,1,0] found ", dailyTemperatures([30, 60, 90]));

const input: number[] = [];
for (let i = 0; i <= 99999; i++) {
  input.push(99);
}
input.push(100);
console.log("Expected [99, 98, ..., 1, 0] found ", dailyTemperatures(input));

// Failed: solution is inefficient (TLE)

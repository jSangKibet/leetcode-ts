/**
Q3. Largest Rectangle in Histogram
Hard
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.

The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:
Input: heights = [2,4]
Output: 4
 
Constraints:
1 <= heights.length <= 105
0 <= heights[i] <= 104
 */

// interface to track existing found rectangles
interface Rectangle {
  // rectangle height
  height: number;
  // rectangle start
  start: number;
}

function largestRectangleArea(heights: number[]): number {
  // track largest area
  let largestArea = 0;

  // stack of rectangles
  const stack: Rectangle[] = [];

  // loop through heights
  for (let i = 0; i < heights.length; i++) {
    // get current height
    const nh: Rectangle = {
      height: heights[i],
      start: i,
    };
    // if there is an item in the stack
    if (stack.length) {
      // track if stack order is valid
      let stackOrderValid = false;
      // as long as stack order is invalid
      while (!stackOrderValid) {
        // check if stack still has items
        if (stack.length) {
          // get item on top of the stack
          const top = stack[stack.length - 1];
          // check if top item's height is larger than the next item
          if (top.height > nh.height) {
            // if so
            // calculate the item's area
            const na = top.height * (i - top.start);
            // if the area is larger than largest, set it as such
            if (na > largestArea) largestArea = na;
            // remove the item from the stack
            stack.pop();
            // reduce the next stack item's start by 1
            nh.start = top.start;
          } else {
            // if not, stack order is valid
            stackOrderValid = true;
          }
        } else {
          // if not, stack order is valid
          stackOrderValid = true;
        }
      }
    }

    // push the next item to the stack
    stack.push(nh);
  }

  // loop through the items remaining in the stack
  // use length as current index
  const end = heights.length;
  stack.forEach((h) => {
    // calculate the item's area
    const na = h.height * (end - h.start);
    // if the area is larger than largest, set it as such
    if (na > largestArea) largestArea = na;
  });

  // return largest area
  return largestArea;
}

// Correctnes test
console.log("Expected 10, found ", largestRectangleArea([2, 1, 5, 6, 2, 3]));
console.log("Expected 4, found ", largestRectangleArea([2, 4]));
console.log(
  "Expected 20, found ",
  largestRectangleArea([3, 6, 5, 7, 4, 8, 1, 0]),
);

// Efficiency test
const input: number[] = [];
for (let i = 0; i < 100000; i++) {
  input.push(1);
}
console.log("Expected 100000, found ", largestRectangleArea(input));

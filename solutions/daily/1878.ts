/**
1878. Get Biggest Three Rhombus Sums in a Grid
Medium
You are given an m x n integer matrix grid​​​.
A rhombus sum is the sum of the elements that form the border of a regular rhombus shape in grid​​​.
The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell. 
Below is an image of four valid rhombus shapes with the corresponding colored cells that should be included in each rhombus sum:
Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom right corner.
Return the biggest three distinct rhombus sums in the grid in descending order. If there are less than three distinct values, return all of them.

Example 1:
Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
Output: [228,216,211]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 20 + 3 + 200 + 5 = 228
- Red: 200 + 2 + 10 + 4 = 216
- Green: 5 + 200 + 4 + 2 = 211

Example 2:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: [20,9,8]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 4 + 2 + 6 + 8 = 20
- Red: 9 (area 0 rhombus in the bottom right corner)
- Green: 8 (area 0 rhombus in the bottom middle)

Example 3:
Input: grid = [[7,7,7]]
Output: [7]
Explanation: All three possible rhombus sums are the same, so return [7].
 

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 105
 */

// Takes a rhombus origin & size and calculates the sum of it's edges
function getRhombusSum(
  grid: number[][],
  originRow: number,
  originCol: number,
  size: number,
): number {
  // track edge sum
  let sum = grid[originRow][originCol];
  // track start position for each step
  let startRow = originRow;
  let startCol = originCol;
  //track current position, for subsequent steps
  let currentRow = originRow;
  let currentCol = originCol;
  // left (origin) ->top
  for (let i = 1; i <= size; i++) {
    currentRow = startRow - i;
    currentCol = startCol + i;
    sum += grid[currentRow][currentCol];
  }
  // reset start position
  startRow = currentRow;
  startCol = currentCol;
  // top -> right
  for (let i = 1; i <= size; i++) {
    currentRow = startRow + i;
    currentCol = startCol + i;
    sum += grid[currentRow][currentCol];
  }
  // reset start position
  startRow = currentRow;
  startCol = currentCol;
  // right -> bottom
  for (let i = 1; i <= size; i++) {
    currentRow = startRow + i;
    currentCol = startCol - i;
    sum += grid[currentRow][currentCol];
  }
  // reset start position
  startRow = currentRow;
  startCol = currentCol;
  // bottom -> left
  for (let i = 1; i < size; i++) {
    currentRow = startRow - i;
    currentCol = startCol - i;
    sum += grid[currentRow][currentCol];
  }

  // return tracked sum
  return sum;
}

function getBiggestThree(grid: number[][]): number[] {
  // get number of rows & columns (based on constraints)
  const rows = grid.length;
  const cols = grid[0].length;
  // store the set of found rhombus sums
  const sums = new Set<number>();
  // loop through each row
  for (let r = 0; r < rows; r++) {
    // loop through each column in a row
    for (let c = 0; c < cols; c++) {
      // store the cell
      sums.add(grid[r][c]);
      // grow the rhombus by 1 coordinate in all directions
      // track the growth steps
      let step = 1;
      // for there to be the next step, there must be:
      // cell grid[r-step][c+step] r-step>=0
      // cell grid[r][c+(step*2)] c+(step*2)<cols
      // cell grid[r+step][c+step] r+step<rows
      let hasNextStep = r - step >= 0 && r + step < rows && c + step * 2 < cols;
      // as long as this is the case, process the next step
      while (hasNextStep) {
        // calculate the sum for the step
        sums.add(getRhombusSum(grid, r, c, step));
        // increment the step
        step += 1;
        // check/set if the subsequent step exists
        hasNextStep = r - step >= 0 && r + step < rows && c + step * 2 < cols;
      }
    }
  }

  const sumsArray = Array.from(sums);
  sumsArray.sort((a, b) => b - a);
  if (sumsArray.length > 3) {
    return [sumsArray[0], sumsArray[1], sumsArray[2]];
  } else {
    return sumsArray;
  }
}

console.log(
  "Expected [228, 216, 211], found ",
  getBiggestThree([
    [3, 4, 5, 1, 3],
    [3, 3, 4, 2, 3],
    [20, 30, 200, 40, 10],
    [1, 5, 5, 4, 1],
    [4, 3, 2, 2, 5],
  ]),
);

console.log(
  "Expected [20, 9, 8], found ",
  getBiggestThree([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
);

console.log("Expected [7], found ", getBiggestThree([[7, 7, 7]]));

/**
1582. Special Positions in a Binary Matrix
Given an m x n binary matrix mat, return the number of special positions in mat.

A position (i, j) is called special if mat[i][j] == 1 and all other elements in row i and column j are 0 (rows and columns are 0-indexed).

 

Example 1:


Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
Output: 1
Explanation: (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.
Example 2:


Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: (0, 0), (1, 1) and (2, 2) are special positions.
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 100
mat[i][j] is either 0 or 1.
*/

// Check if a coordinate point is special
function checkIfSpecial(
  matrix: number[][],
  row: number,
  column: number,
): boolean {
  // short circuit: if the value in the position is not 1, it is not special
  const value = matrix[row][column];
  if (value !== 1) return false;

  let isSpecialRow = true;

  // loop through each row in the matrix except the coordinate row
  for (let r = 0; r < matrix.length; r++) {
    // if the current row isn't the row being checked for specialty
    // and the value in the position for the matrix[current_row][column] isn't 0
    // then the coordinate provided isn't special
    if (r !== row && matrix[r][column] !== 0) return false;
  }

  // loop through each column in the coordinate's row except the coordinate column
  const coordinateRow = matrix[row];
  for (let c = 0; c < coordinateRow.length; c++) {
    // if the current column isn't the column being checked for specialty
    // and the value in the position for the matrix[row][current_column] isn't 0
    // then the coordinate provided isn't special
    if (c !== column && coordinateRow[c] !== 0) return false;
  }

  // otherwise, the coordinate point is special
  return true;
}

function numSpecial(mat: number[][]): number {
  // count special coordinates
  let numOfSpecialCoordinates = 0;

  // loop through matrix rows
  for (let r = 0; r < mat.length; r++) {
    // get current row
    const row = mat[r];
    // loop through current row's columns
    for (let c = 0; c < row.length; c++) {
      // check if the coordinate is special
      const isSpecial = checkIfSpecial(mat, r, c);
      // if it is, increment special coordinate counter
      if (isSpecial) numOfSpecialCoordinates += 1;
    }
  }

  // return result
  return numOfSpecialCoordinates;
}

console.log("Expected 1, found ", numSpecial([[1,0,0],[0,0,1],[1,0,0]]))
console.log("Expected 3, found ", numSpecial([[1,0,0],[0,1,0],[0,0,1]]))

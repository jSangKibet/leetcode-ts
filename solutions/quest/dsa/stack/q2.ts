/**
Q2. Evaluate Reverse Polish Notation
Medium
You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.
 

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 

Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200]. 
*/

function performOperation(a: number, b: number, o: string) {
  let result = 0;
  switch (o) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    default:
      result = Math.trunc(a / b);
  }
  return `${result}`;
}

// look for the next valid operation, return the index of the first operand
function findValidOperation(tokens: string[]): number {
  // loop through the list of tokens
  for (let i = 0; i < tokens.length; i++) {
    // if the value at the index is not an integer
    if (!Number.isInteger(parseInt(tokens[i]))) {
      // return the index before the last as the first operand
      return i - 2;
    }
  }

  return -1;
}

function evalRPN(tokens: string[]): number {
  // process list of tokens as long as there is more than 1 token
  while (tokens.length > 1) {
    // find the index of the first valid operation
    const aIndex = findValidOperation(tokens);
    // get first operand
    const a = parseInt(tokens[aIndex]);
    // get second operand
    const b = parseInt(tokens[aIndex + 1]);
    // perform operation using operator
    const result = performOperation(a, b, tokens[aIndex + 2]);
    // replace the operation with the result
    tokens.splice(aIndex, 3, result);
  }
  // return result as a number
  return parseInt(tokens[0]);
}

console.log("Expected 9, found ", evalRPN(["2", "1", "+", "3", "*"]));
console.log("Expected 6, found ", evalRPN(["4", "13", "5", "/", "+"]));
console.log(
  "Expected 22, found ",
  evalRPN([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ]),
);

/**
Input: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Strategy: Compose by starting from left formulating smallest possible tokens
Smallest token = Two integers  followed by an operand
Step 1: ["10","6",(9,3,+),"-11","*","/","*","17","+","5","+"] = ["10","6","12","-11","*","/","*","17","+","5","+"]
Step 2: ["10","6",(12,-11,*),"/","*","17","+","5","+"] = ["10","6",-132,"/","*","17","+","5","+"] 
Step 3: ["10",(6,-132,/),"*","17","+","5","+"] = ["10","0","*","17","+","5","+"] 
Step 4: [(10,0,*),"17","+","5","+"] =["0","17","+","5","+"]
Step 5: ["17","5","+"]
Step 6: ["22"]

Algorithm:
- while the array has more than 1 item
- find valid operation: two operands followed by an operator
- perform operation
- remove the 3 found indices
- insert in their place the result of the operation as a string
- when the array has only 1 item, parse and return it

Operations:
- findValidOperation(string array): number array (3 indices)
*/

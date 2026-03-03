/**

 */

function smallerNumbersThanCurrent(nums: number[]): number[] {
  const smallers: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    let smaller = 0;
    for (let j = 0; j < nums.length; j++) {
      if (j !== i && nums[j] < nums[i]) smaller++;
    }
    smallers.push(smaller);
  }

  return smallers;
}

console.log(
  "Expected [4,0,1,1,3], found ",
  smallerNumbersThanCurrent([8, 1, 2, 2, 3]),
);
console.log(
  "Expected [2,1,0,3], found ",
  smallerNumbersThanCurrent([6, 5, 4, 8]),
);
console.log(
  "Expected [0,0,0,0], found ",
  smallerNumbersThanCurrent([7, 7, 7, 7]),
);

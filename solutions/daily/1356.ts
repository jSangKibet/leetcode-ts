function sortByBits(arr: number[]): number[] {
  const bitMap = new Map<number, number>();
  arr.forEach((a) => {
    const e = bitMap.get(a);
    if (e === undefined) {
      bitMap.set(a, getNumOfOnes(a));
    }
  });

  return arr.sort(getComparator(bitMap));
}

function getNumOfOnes(a: number) {
  const binString = a.toString(2);
  let numOfOnes = 0;

  for (let i = 0; i < binString.length; i++) {
    if (binString.charAt(i) === "1") numOfOnes++;
  }

  return numOfOnes;
}

function getComparator(bitMap: Map<number, number>) {
  return function (a: number, b: number) {
    let numOfOnesInA = bitMap.get(a) || 0;
    let numOfOnesInB = bitMap.get(b) || 0;

    if (numOfOnesInA < numOfOnesInB) return -1;
    if (numOfOnesInA > numOfOnesInB) return 1;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
}

console.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8]));
console.log(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]));

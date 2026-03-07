/**
Q1. Final Prices With a Special Discount in a Shop
Easy
You are given an integer array prices where prices[i] is the price of the ith item in a shop.

There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.

Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.

 

Example 1:

Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation: 
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
For items 3 and 4 you will not receive any discount at all.
Example 2:

Input: prices = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: In this case, for all items, you will not receive any discount at all.
Example 3:

Input: prices = [10,1,1,6]
Output: [9,0,1,6]
 

Constraints:

1 <= prices.length <= 500
1 <= prices[i] <= 1000
*/

function finalPrices(prices: number[]): number[] {
  // track final prices
  const finalPrices: number[] = [];
  // loop through prices
  for (let i = 0; i < prices.length; i++) {
    // current price
    let price = prices[i];

    // only loop over next prices if not at last price
    if (i < prices.length - 1) {
      // loop through prices from next index
      for (let j = i + 1; j < prices.length; j++) {
        // get next price of prices ahead of current
        const nextPrice = prices[j];
        // if the next price is less than the current price
        if (nextPrice <= price) {
          // current price = current price - next price
          price -= nextPrice;
          // stop processing inner loop
          break;
        }
      }
    }

    // push new final price
    finalPrices.push(price);
  }

  // return list of final prices
  return finalPrices;
}

console.log("Expected [4,2,4,2,3], found ", finalPrices([8, 4, 6, 2, 3]));
console.log("Expected [1,2,3,4,5], found ", finalPrices([1, 2, 3, 4, 5]));
console.log("Expected [9,0,1,6], found ", finalPrices([10, 1, 1, 6]));

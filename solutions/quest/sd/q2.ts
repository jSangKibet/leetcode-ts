/**
Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
 

Constraints:

1 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
 */

class LFUCache {
  // Cache value is stored internally as an integer array i.e., [value, timesAccessed]
  data: Map<number, number[]>;

  // Times accessed is a map of times accessed against a list of keys accessed that number of times
  timesAccessed: Map<number, number[]>;

  // Capacity is the max capacity of the cache
  capacity: number;
  constructor(capacity: number) {
    this.data = new Map();
    this.timesAccessed = new Map();
    this.capacity = capacity;
  }

  get(key: number): number {
    // get value
    const value = this.data.get(key);
    // if value does not exist, return not found value
    if (value === undefined) return -1;

    // if value is found
    // get the list of keys sharing the value's access times
    let keysForTimesAccessed = this.timesAccessed.get(value[1]);

    // if there are no keys, this is an error
    if (keysForTimesAccessed === undefined) return -1;

    // get key index for the value
    const keyIndex = keysForTimesAccessed.findIndex((k) => k === key);

    // if the key wasn't in the list, this is an issue
    if (keyIndex === undefined) return -1;

    // pop the value's key
    keysForTimesAccessed.splice(keyIndex, 1);

    // if the new key list has values no values, delete this number of accessed
    if (!keysForTimesAccessed.length) {
      this.timesAccessed.delete(value[1]);
    }

    // increment value's times accessed
    value[1] = value[1] + 1;

    // get the list of keys sharing the value's new access times
    keysForTimesAccessed = this.timesAccessed.get(value[1]);

    // if there are no keys, set a new list with the value's key
    if (keysForTimesAccessed === undefined) {
      this.timesAccessed.set(value[1], [key]);
    } else {
      // otherwise, pop the value's key to the start of the key list
      keysForTimesAccessed.splice(0, 0, key);
    }

    // return the found value
    return value[0];
  }

  put(key: number, value: number): void {
    // call get
    // this correctly updates the number of times accessed for existing values
    const existingValue = this.get(key);

    // if the value doesn't exist
    if (existingValue === -1) {
      // delete least/last used if necessary
      if (this.data.size >= this.capacity) {
        // find least times accessed: TODO: This will probably cause a fail for time usage
        const smallestTA = Math.min(...this.timesAccessed.keys());

        // find LTA
        const LTAKeys = this.timesAccessed.get(smallestTA);

        // if keys not found, throw error
        if (LTAKeys === undefined) {
          throw new Error("Least Accessed Keys not found");
        } else {
          // otherwise, process keys
          // otherwise, get the last key
          const keyToDelete = LTAKeys[LTAKeys.length - 1];
          // delete the data for this key
          this.data.delete(keyToDelete);
          // if length of array is only 1, delete the list from TA;
          if (LTAKeys.length < 2) {
            this.timesAccessed.delete(smallestTA);
          } else {
            // pop the last item
            LTAKeys.splice(LTAKeys.length - 1, 1);
          }
        }
      }

      // generate and set new value
      this.data.set(key, [value, 1]);

      // get keys accessed once
      const keysForTimesAccessed = this.timesAccessed.get(1);

      // if non-existent, set to only this key
      if (keysForTimesAccessed === undefined) {
        this.timesAccessed.set(1, [key]);
      } else {
        // update number of times accessed & set
        keysForTimesAccessed.splice(0, 0, key);
      }
    } else {
      // if the value exists
      // just update it, there is nothing else to do
      const existing = this.data.get(key);
      if (existing) {
        existing[0] = value;
      }
    }
  }
}

function run(data: number[][], expected: any[]) {
  let cache = new LFUCache(data[0][0]);
  console.log("Cache initialized to length: ", data[0][0]);
  for (let i = 1; i < data.length; i++) {
    console.log("------------------");
    const operation = data[i];
    if (operation.length === 1) {
      console.log("Get Operation for Key: ", data[i][0]);
      console.log("Value: ", cache.get(data[i][0]));
      console.log("Expected: ", expected[i]);
    }
    if (operation.length === 2) {
      console.log("Put Operation for K/V: ", data[i][0], data[i][1]);
      cache.put(data[i][0], data[i][1]);
    }
    console.log("Values: ", cache.data);
    console.log("Access times: ", cache.timesAccessed);
  }
}

run(
  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]],
  [null, null, null, 1, null, -1, 3, null, -1, 3, 4],
);

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

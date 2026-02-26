/**
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
 */

class LRUCache {
  data: Map<number, number>;
  keys: number[];
  capacity: number;
  constructor(capacity: number) {
    this.data = new Map();
    this.keys = [];
    this.capacity = capacity;
  }

  get(key: number): number {
    // get value
    const value = this.data.get(key);

    // if value does not exist, return not found value
    if (value === undefined) return -1;

    // if value is found, get it's key's index
    const index = this.keys.findIndex((k) => k === key);

    // if index of key is not found, return not found value
    if (index === undefined) return -1;

    // remove key from the list of keys
    this.keys.splice(index, 1);

    // insert key at first index
    this.keys.splice(0, 0, key);

    // return value
    return value;
  }

  put(key: number, value: number): void {
    // call get
    const existing = this.get(key);

    // set value
    this.data.set(key, value);

    // if value is -1
    if (existing === -1) {
      // insert key at start of keys list
      this.keys.splice(0, 0, key);

      // if keys list length is larger than capacity
      if (this.keys.length > this.capacity) {
        // delete value for last key
        this.data.delete(this.keys[this.capacity]);

        // remove last key
        this.keys.splice(this.capacity, 1);
      }
    }
  }
}

function run(data: number[][]) {
  let cache = new LRUCache(data[0][0]);
  console.log("Cache initialized to length: ", data[0][0]);
  for (let i = 1; i < data.length; i++) {
    console.log("------------------");
    const operation = data[i];
    if (operation.length === 1) {
      console.log("Get Operation for Key: ", data[i][0]);
      console.log("Value: ", cache.get(data[i][0]));
    }
    if (operation.length === 2) {
      console.log("Put Operation for K/V: ", data[i][0], data[i][1]);
      cache.put(data[i][0], data[i][1]);
    }
    console.log("Keys: ", cache.keys);
    console.log("Values: ", cache.data);
  }
}

run([[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]]);

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

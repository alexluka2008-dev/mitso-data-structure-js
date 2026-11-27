import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  /**
   * @param {number} size - the size of the storage.
   */
  constructor(size=100) {
    this.size = size;
    this.store = this.createStore(size);
    
  }

  /**
   * @param {string} item
   */

  insert(item) {
    const hashValues = this.getHashValues(item);

    hashValues.forEach((index) => {
      this.store.setValue(index, 1);
    })
  };

  /**
   * @param {string} item
   * @return {boolean}
   */

  mayContain(item) {
    const hashValues = this.getHashValues(item);

    for (let i = 0; i < hashValues.length; i += 1){
      if (!this.store.getValue(hashValues[i])){
        return false;
      }
    }
    return true;
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   *
   * @param {number} size
   * @return {Object}
   */

  createStore(size) {
    const storage = [];
    for (let i = 0; i < size; i += 1){
      storage.push(0);
  }

  return {
    getValue(index){
      return storage[index];
    },
    setValue(index, value){
      storage[index] = value;
    },
  };
  }
  /**
   * @param {string} item
   * @return {number}
   */

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i += 1){
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char;
      hash &= hash;
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */

  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i += 1){
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char;
    }
    return Math.abs(hash % this.size);
  }

  /**
   * @param {string} item
   * @return {number}
   */

  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i += 1){
      const char = item.charCodeAt(i);
      hash = (hash << 5) - hash;
      hash += char;
      hash &= hash;
    }
    return Math.abs(hash % this.size);
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   *
   * @param {string} item
   * @return {number[]}
   */

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}

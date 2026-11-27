import { NotImplementedError } from "../extensions/index.js";

import { Node } from '../extensions/list-tree.js';

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
export default class BinarySearchTree {
constructor(){
  this.rootNode = null;
}


  root() {
    return this.rootNode;
  }

  add(data) {
    const addWithin = (node, data) =>{
      if(!node){
        return new Node(data);
      }
      if (node.data === data){
        return node;
      }
      if (data < node.data){
        node.left = addWithin(node.left, data);
      }
      else {
        node.right = addWithin(node.right, data);
      }
      return node;
    };
    this.rootNode = addWithin(this.rootNode, data);
  }


  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.rootNode;
    while (current){
      if (data === current.data){
        return current;
      }
      if(data < current.data){
        current = current.left;
      }
      else{
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if(!node) return null;
      if(data < node.data){
        node.left = removeNode(node.left, data);
        return node;
      }
      else if (data > node.data){
        node.right = removeNode(node.right, data);
        return node;
      }
      else {
        if (!node.left && !node.right){
          return null;
        }
        if(!node.left){
          return node.right;
        }
        if (!node.right){
          return node.left;
        }
        let minFromRight = node.right;
        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    };
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) return null;

    let current = this.rootNode;
    while(current.left){
      current = current.left;
    }
    return current.data;
  }

  max() {
    if(!this.rootNode) return null;

    let current = this.rootNode;
    while (current.right){
      current = current.right;
    }
    return current.data;
  }
}

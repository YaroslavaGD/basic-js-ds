const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
   return this._root;
  }

  add(data) {
    this._root = this.addNode(this._root, data);
  }

  addNode(currNode, data) {
    if (currNode === null) return new Node(data);

    if (currNode.data === data) return currNode;

    if (data < currNode.data) {
      currNode.left = this.addNode(currNode.left, data);
    } else {
      currNode.right = this.addNode(currNode.right, data);
    }

    return currNode;
  }

  find(data) {
    return this.findNode(this._root, data);
  }

  findNode(currNode, data) {
    if (currNode === null) return null;

    if (currNode.data === data) return currNode;

    if (data < currNode.data) {
      return this.findNode(currNode.left, data);
    } else {
      return this.findNode(currNode.right, data);
    }
    }

  has(data) {
    return (this.find(data) === null) ? false : true;
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  removeNode(currNode, data) {
    if (currNode === null) return null;

    if (data < currNode.data) {
      currNode.left = this.removeNode(currNode.left, data);
      return currNode;
    } else if (data > currNode.data) {
      currNode.right = this.removeNode(currNode.right, data);
      return currNode;
    } else {
      //equals currNode.data
      if (!currNode.left && !currNode.right) return null;

      if (!currNode.left) {
        currNode = currNode.right;
        return currNode;
      }

      if (!currNode.right) {
        currNode = currNode.left;
        return currNode;
      }

      let minRight = currNode.right;
      while (minRight.left) {
        minRight = minRight.left;
      }

      currNode.data = minRight.data;
      currNode.right = this.removeNode(currNode.right, minRight.data);

      return currNode;
    }
  }

  min() {
    if (this._root === null) return null;

    let currNode = this._root;
    while (currNode.left) {
      currNode = currNode.left;
    }

    return currNode.data;
  }

  max() {
    if (this._root === null) return null;

    let currNode = this._root;
    while (currNode.right) {
      currNode = currNode.right;
    }

    return currNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
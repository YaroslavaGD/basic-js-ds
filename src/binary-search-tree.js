const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    this.head = addInside(this.head, data);

    function addInside(node, value) {
      if (!node) return new Node(value);

      if (node.data === value) return node;

      if (value < node.data) {
        node.left = addInside(node.left, value);
      } else {
        node.right = addInside(node.right, value);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.head, data)

    function searchInside(node, value) {
      if (!node) return false;

      if (node.data === value) return true;

      return value < node.data ? searchInside(node.left, value) : searchInside(node.right, value);
    }
  }

  find(data) {
    return searchInside(this.head, data)

    function searchInside(node, value) {
      if (!node) return null;

      if (node.data === value) return node;

      return value < node.data ? searchInside(node.left, value) : searchInside(node.right, value);
    }
  }

  remove(data) {
    this.head = removeNode(this.head, data);

    function removeNode(node, value) {
      if (!node) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;

      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.right && !node.left) return null;

        if (!node.left) {
          node = node.right;
          return node;
        } 

        if (!node.right) {
          node = node.left;
          return node;
        } 

        let maxFromLeft = node.left;
        while (maxFromLeft.right) maxFromLeft = maxFromLeft.right;

        node.data = maxFromLeft.data;
        node.left = removeNode(node.left, maxFromLeft.data);

        return node;
      }
    }
  }

  min() {
    if (!this.head) return undefined;

    let currentNode = this.head;

    while (currentNode.left) currentNode = currentNode.left;

    return currentNode.data;
  }

  max() {
    if (!this.head) return undefined;

    let currentNode = this.head;

    while (currentNode.right) currentNode = currentNode.right;

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
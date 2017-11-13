class Node {
  constructor(id, seed, solution, resources) {
    this.id = id;
    this.seed = seed;
    this.solution = solution;
    this.resources = resources;
    this.prev = null;
    this.next = null;
  }
}

export default class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(...args) {
    if (!this.head) {
      this.head = new Node(...args);
      this.tail = this.head;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = new Node(...args);
    currentNode.next.prev = currentNode;
    this.tail = currentNode.next;
  }

  makeCircular() {
    this.head.prev = this.tail;
    this.tail.next = this.head;
  }

  fetchNode(id) {
    let currentNode = this.head;

    while (id !== currentNode.id) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}
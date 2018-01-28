export const tail = `
if (typeof new LinkedList() === 'object') {
  LinkedList.prototype.__clearList__ = function() {
    this.head = null
    this.length = 0
  }
}
const checkNodes = (list) => {
  if (typeof list.head.next === 'undefined' ||
      typeof list.head.value === 'undefined') {
    console.log('WARNING: Nodes must have <code>next</code> and <code>value</code> properties for tests to work!');
    return null;
  }
}

let __list__
const testHooks = {
  beforeAll: () => {
    __list__ = new LinkedList()
  },
  beforeEach: () => {
    __list__.__clearList__()
  },
  afterAll: () => {
    __list__ = null
  }
}
`;
export const tests = [
  {
    expression: `typeof __list__ === 'object'`,
    message: 'The <code>LinkedList</code> data structure exists'
  },
  {
    expression: `__list__.head === null && __list__.size === 0`,
    message: 'The <code>LinkedList</code> data structure has <code>head</code> and <code>length</code> properties, which initialize to <code>null</code> and <code>0</code>, respectively'
  },
  {
    expression: `typeof __list__.add === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>add</code>: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      checkNodes(__list__);
      return __list__.head.value === 'cat' && __list__.head.next === null;
    })()`,
    message: 'The <code>add</code> method assigns the first node added (with <code>value</code> and <code>next</code> properties) to the list\'s <code>head</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      const test_1 = __list__.head.next.value === 'dog';
      __list__.add('bird');
      __list__.add('pig');
      const test_2 = __list__.head.next.next.next.value === 'pig';
      const test_3 = __list__.head.next.next.next.next === null;
      return test_1 && test_2;
    })()`,
    message: 'Additional elements are appended to the tail node, such that each node keeps track of the next node. The last node has a <code>next</code> value of <code>null</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      const test_1 = __list__.length;
      __list__.add('bird');
      const test_2 = __list__.add('pig') === true
      const test_3 = __list__.length === 4;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>add</code> method returns a truthy value and increments the <code>length</code> property of the list by one for each node added to the list'
  },
  {
    expression: `typeof __list__.peekHead === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>peekHead</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      return JSON.stringify(__list__.peekHead()) === '{"value":"cat","next":{"value":"dog","next":null}}';
    })()`,
    message: 'The <code>peekHead</code> method returns the <code>head</code> property of the <code>LinkedList</code> structure, so that you can easily and visually inspect the list'
  },
  {
    expression: `typeof __list__.remove === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>remove</code>: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.add('bird');
      __list__.remove('cat');
      const test_1 = __list__.head.value === 'dog' && __list__.head.next.value === 'bird';
      __list__.remove('dog');
      const test_2 = __list__.head.value === 'bird' && __list__.head.next === null;
      __list__.remove('bird');
      const test_3 = __list__.head === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'When the first node is removed, the <code>head</code> node assumes the value of the removed node\'s <code>next</code> value'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.remove('dog');
      return __list__.head.next === null;
    })()`,
    message: 'When the last, or tail node, of a list is removed, the previous node\'s <code>next</code> property is set to <code>null</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.add('bird');
      __list__.remove('dog');
      return __list__.head.next.value === 'bird';
    })()`,
    message: 'When a node that is neither the head or tail node is removed, the linked list structure and <code>next</code> references are correctly maintained'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('bird');
      __list__.add('pig');
      __list__.add('cow');
      const test_1 = __list__.remove('cat') && __list__.length === 3;
      const test_2 = __list__.remove('pig') && __list__.length === 2;
      const test_3 = __list__.remove('cow') && __list__.length === 1;
      const test_4 = __list__.remove('bird') && __list__.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'For every node removed from the list, the <code>remove</code> method returns a truthy value and decrements the <code>length</code> of the list by one'
  },
  {
    expression: `
    (() => {
      const test_1 = __list__.remove('cat') === null;
      __list__.add('dog');
      __list__.add('cat');
      const test_2 = __list__.remove('bird') === null;
      return test_1 && test_2 && __list__.length === 2;
    })()`,
    message: 'If <code>remove</code> is called on an empty list, or finds no matching value to remove, <code>null</code> is returned and the list\'s length property is un-mutated'
  },
  {
    expression: `typeof __list__.indexOf === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>indexOf</code>: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      const test_1 = __list__.indexOf('cat') === -1
      __list__.add('cat');
      __list__.add('dog');
      __list__.add('bird');
      const test_2 = __list__.indexOf('bird') === 2;
      __list__.add('pig');
      __list__.add('cow');
      const test_3 = __list__.indexOf('cow') === 4;
      __list__.remove('dog');
      const test_4 = __list__.indexOf('bird') === 1;
      const test_5 = __list__.indexOf('monkey') === -1;
      return test_1 && test_2 && test_3 && test_4 && test_5;
    })()`,
    message: 'The <code>indexOf</code> method returns the zero-based index of the given element or <code>-1</code> if it doesn\'t exist: <span class="type">@param {(number|string)}</span> <code>value</code>'
  },
  {
    expression: `typeof __list__.elementAt === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>elementAt</code>: <span class="type">@param {number}</span> <code>index</code>'
  },
  {
    expression: `
    (() => {
      const test_1 = __list__.elementAt(0) === null;
      __list__.add('cat');
      const test_2 = __list__.elementAt(1) === null;
      __list__.add('dog');
      const test_3 = __list__.elementAt(1) === 'dog';
      const test_4 = __list__.elementAt(0) === 'cat';
      __list__.add('pig');
      __list__.add('bird');
      __list__.add('toad');
      const test_5 = __list__.elementAt(3) === 'bird';
      __list__.remove('bird');
      const test_6 = __list__.elementAt(3) === 'toad';
      const test_7 = __list__.elementAt(5) === null;
      const test_8 = __list__.elementAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4 && test_5 && test_6 && test_7 && test_8;
    })()`,
    message: 'The <code>elementAt</code> method returns the value at the given index, or null if the given index is out of scope'
  },
  {
    expression: `typeof __list__.removeAt === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>removeAt</code>: <span class="type">@param {number}</span> <code>index</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.add('bird');
      __list__.add('fish');
      const test_1 = __list__.removeAt(1) === 'dog' && __list__.head.next.value === 'bird';
      const test_2 = __list__.removeAt(0) === 'cat' && __list__.head.value === 'bird' && __list__.head.next.value === 'fish';
      const test_3 = __list__.removeAt(1) === 'fish' && __list__.head.next === null;
      const test_4 = __list__.removeAt(0) === 'bird' && __list__.head === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method removes the node at the given index and returns its value, while retaining the linked list structure/references (consider each of the cases outlined in the <code>__list__.remove(\'val\')</code> tests above)'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.add('kitten');
      const test_1 = __list__.length === 3;
      __list__.removeAt(1);
      const test_2 = __list__.length === 2;
      __list__.removeAt(1);
      const test_3 = __list__.length === 1;
      __list__.removeAt(1); // no change
      __list__.removeAt(0);
      const test_4 = __list__.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method decrements the <code>length</code> of the list by one for every node removed from the list'
  },
  {
    expression: `
    (() => {
      const test_1 = __list__.removeAt(0) === null;
      __list__.add('cat');
      const test_2 = __list__.removeAt(1) === null;
      const test_3 = __list__.removeAt(5) === null;
      const test_4 = __list__.removeAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method returns <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty'
  },
  {
    expression: `typeof __list__.addAt === 'function'`,
    message: 'The <code>LinkedList</code> class has a method called <code>addAt</code>: <span class="type">@param {number}</span> <code>index</code> <span class="type">@param {(string|number)}</span> <code>value</code>'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.addAt(1, 'bird');
      return __list__.head.value === 'cat' && __list__.head.next.value === 'bird' && __list__.head.next.next.value === 'dog';
    })()`,
    message: 'The <code>addAt</code> method adds the given value to the list at the given index, while maintaining the linked-list structure/references'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.addAt(0, 'bird');
      return __list__.head.value === 'bird' && __list__.head.next.value === 'cat' && __list__.head.next.next === null;
    })()`,
    message: 'When the given index is <code>0</code>, the value passed to <code>addAt</code> becomes the new head node, referencing the rest of the list in its <code>next</code> property'
  },
  {
    expression: `
    (() => {
      const test_1 = __list__.addAt(0, 'cat') === null;
      __list__.add('cat');
      __list__.add('dog');
      const test_2 = __list__.addAt(4, 'cat') === null;
      const test_3 = __list__.addAt(-4, 'cat') === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>addAt</code> method returns <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty'
  },
  {
    expression: `
    (() => {
      __list__.add('cat');
      __list__.add('dog');
      __list__.addAt(0, 'bird');
      const test_1 = __list__.addAt(1, 'fish') === true;
      return test_1 && __list__.length === 4;
    })()`,
    message: 'The <code>addAt</code> method returns a truthy value and increments the <code>length</code> of the linked list by one for each node added to the list'
  }
];

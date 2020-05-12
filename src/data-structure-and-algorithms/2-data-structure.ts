class LNode {
  public element: string;
  public next: LNode;
  constructor(element: string) {
    this.element = element;
    this.next = this;
  }
}

class LindedList {
  public head: LNode;
  public constructor() {
    this.head = new LNode('head');
  }
  find = (item: string) => {
    let currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  };
  insert = (newElement: string, item: string) => {
    const newNode = new LNode(newElement);
    const currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  };
}

console.log('hi');
const test = new LindedList();
test.insert('hi', 'head');
test.insert('ho', 'hi');

console.log(test.head.element);

export class DoublyLinkedList<T> {
  private _start?: LL_Node<T>
  private _end?: LL_Node<T>
  private _iterator?: LL_Node<T>
  count: number = 0;

  constructor(start: T | T[] | undefined = undefined) {
    if (Array.isArray(start)) {
      for (const e of start) {
        this.add(e);
      }
    } else if (typeof start !== 'undefined') {
      this._start = this._end = { value: start };
      this.count = 1;
    }
    this._iterator = this._start;
  }

  first(): T | undefined {
    return this._start?.value;
  }

  current(): T|undefined {
    return this._iterator?.value;
  }

  last(): T | undefined {
    return this._end?.value;
  }

  contains(val: T) {
    this.rewind();
    var cur = this.next();
    while (typeof cur !== 'undefined') {
      if (cur === val) {
        return true;
      }

      cur = this.next();
    }

    return false;
  }

  next(): T | undefined {
    if (typeof this._iterator == 'undefined') {
      this.rewind();
      return;
    }
    const ret = this._iterator.value;
    this._iterator = this._iterator.next;
    return ret;
  }

  prev(): T | undefined {
    if (typeof this._iterator == 'undefined') {
      this.rewind();
      return;
    }
    const ret = this._iterator.value;
    this._iterator = this._iterator.prev;
    return ret;
  }

  get(index: number): T {
    return this._getNode(index).value;
  }

  at(index: number): T {
    return this.get(index);
  }

  rewind(): void {
    this._iterator = this._start;
  }

  add(value: T): void {
    const newNode: LL_Node<T> = { value, prev: this._end };

    if (typeof this._end !== 'undefined') {
      this._end.next = newNode;
      this._end = newNode;
    } else {
      this._start = this._end = newNode;
    }
    this.count++;
  }

  insert(index: number, value: T): void {
    if (index > this.count) {
      throw new Error(`Index [${index}] out of range.`);
    }
    const cur = this._getNode(index);
    const prev = cur?.prev;
    if (typeof cur === 'undefined') {
      this.add(value);
      return;
    }
    const newNode: LL_Node<T> = { value, next: cur };
    if (typeof prev === 'undefined') {
      this._start = newNode;
    } else {
      prev.next = newNode;
    }
  }

  remove(value: T): void {
    this.rewind();
    let prev = this._start;
    let cur = this._nextNode();
    if (typeof cur === 'undefined') return;
    while (cur?.value !== value) {
      prev = cur;
      cur = this._nextNode();
    }

    if (typeof prev === 'undefined') return;
    if (typeof cur === 'undefined') return;

    prev.next = cur.next;
    this.count--;
  }

  removeAt(index: number): void {
    const cur = this._getNode(index);
    const prev = cur?.prev;

    if (typeof prev === 'undefined') {
      this._start = cur.next;
      if (typeof this._start !== 'undefined') {
        this._start.prev = undefined;
      }
    } else {
      prev.next = cur.next;
    }
    this.count--;
  }

  removeLast(): void {
    if (typeof this._end === 'undefined') {
      throw new Error("Unable to remove when there are no values in list.");
    }
    const prev = this._end?.prev;
    if (typeof prev !== 'undefined') {
      prev.next = undefined;
    }
    this._end = prev;
    this.count--;
  }

  foreach(callback: (idx: number, val: T) => void): void {
    this.iterate(callback);
  }
  iterate(callback: (idx: number, val: T) => void): void
  {
    this.rewind();
    let val = this._nextNode();
    let idx = 0;
    while (typeof val !== 'undefined') {
      callback(idx, val.value);
      val = this._nextNode();
      idx++;
    }
  }

  length(): number {
    return this.count;
  }

  private _nextNode(): LL_Node<T>|undefined {
    if (typeof this._iterator == 'undefined') {
      this.rewind();
      return;
    }
    const ret = this._iterator;
    this._iterator = this._iterator.next;
    return ret;
  }

  private _getNode(index: number): LL_Node<T> {
    this.rewind();
    if (index < 0) {
      throw new Error(`Index [${index}] out of range.`);
    }
    let idx = 0;
    let cur = this._nextNode();
    if (typeof cur === 'undefined') {
      throw new Error(`Doubly Linked List is empty.`);
    }
    while (idx < index) {
      cur = this._nextNode();
      if (typeof cur === 'undefined') {
        throw new Error(`Index [${index}] out of range.`);
      }
      idx++;
    }

    return cur;
  }
}

interface LL_Node<T> {
  value: T,
  prev?: LL_Node<T>,
  next?: LL_Node<T>,
}

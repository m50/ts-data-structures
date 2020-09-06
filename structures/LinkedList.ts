export class LinkedList<T> {
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
    var cur = this.next();
    while (typeof cur !== 'undefined') {
      if (cur === val) {
        return true;
      }

      cur = this.next();
    }

    return false;
  }

  next(): T|undefined {
    if (typeof this._iterator == 'undefined') {
      this.rewind();
      return;
    }
    const ret = this._iterator.value;
    this._iterator = this._iterator.next;
    return ret;
  }

  get(index: number): T | undefined {
    return this._getNode(index)?.value;
  }

  at(index: number): T | undefined {
    return this.get(index);
  }

  rewind(): void {
    this._iterator = this._start;
  }

  add(value: T): void {
    const newNode: LL_Node<T> = { value };

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
    // This would be faster if I did the iteration here, as opposed to using `getNode`.
    // Currently this is O(2n) because I have to iterate through twice.
    // This is why Doubly Linked Lists are far better.
    const prev = this._getNode(index - 1);
    const cur = this._getNode(index);
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

  remove(value: T): void
  {
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

  removeAt(index: number): void
  {
    let prev = this._getNode(index - 1);
    let cur = this._getNode(index);

    if (typeof cur === 'undefined') {
      throw new Error(`Unable to remove, index [${index}] out of range.`);
    }

    if (typeof prev === 'undefined') {
      this._start = cur.next;
    } else {
      prev.next = cur.next;
    }
    this.count--;
  }

  foreach(callback: (idx: number, val: T) => void): void {
    this.iterate(callback);
  }
  iterate(callback: (idx: number, val: T) => void): void {
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

  private _getNode(index: number): LL_Node<T> | undefined {
    this.rewind();
    if (index < 0) return;
    let cur = this._nextNode();
    if (typeof cur === 'undefined') return;
    let idx = 0;
    while (idx < index) {
      cur = this._nextNode();
      idx++;
    }

    return cur;
  }
}

interface LL_Node<T> {
  value: T,
  next?: LL_Node<T>,
}

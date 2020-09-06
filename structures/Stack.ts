import { DoublyLinkedList } from './DoublyLinkedList';

export class Stack<T> {
  private _list: DoublyLinkedList<T>

  constructor(val: T | T[] | undefined = undefined) {
    this._list = new DoublyLinkedList<T>(val);
  }

  pop(): T | undefined {
    var ret = this._list.last();
    this._list.removeLast();
    return ret;
  }

  push(value: T): void {
    this._list.add(value);
  }

  peek(): T | undefined {
    return this._list.last();
  }

  contains(value: T) {
    return this._list.contains(value);
  }

  size(): number {
    return this._list.count;
  }
}

import { DoublyLinkedList } from './DoublyLinkedList';

export class Queue<T> {
  private _list: DoublyLinkedList<T>

  constructor(val: T | T[] | undefined = undefined) {
    this._list = new DoublyLinkedList<T>(val);
  }

  dequeue(): T | undefined {
    var ret = this._list.first();
    this._list.removeAt(0);
    return ret;
  }

  enqueue(value: T): void {
    this._list.add(value);
  }

  peek(): T | undefined {
    return this._list.first();
  }

  contains(value: T) {
    return this._list.contains(value);
  }

  size(): number {
    return this._list.count;
  }
}

import {DoublyLinkedList} from "./DoublyLinkedList";

it('can be initialized with array', () => {
  const dll = new DoublyLinkedList<number>([5, 2, 3]);
  expect(dll.last()).toBe(3);
})

it('can add to doubly linked list', () => {
  const dll = new DoublyLinkedList(2);
  expect(dll.first()).toBe(2);
  expect(dll.last()).toBe(2);
  dll.add(5);
  expect(dll.last()).toBe(5);
});

it('can check if it contains value', () => {
  const dll = new DoublyLinkedList(2);
  expect(dll.contains(2)).toBe(true);
  expect(dll.contains(5)).toBe(false);
})

it('can go to next value', () => {
  const dll = new DoublyLinkedList(1);
  dll.add(2);
  let k = dll.next();
  expect(k).toBe(1);
  k = dll.current();
  expect(k).toBe(2);
})

it('can go to previous value', () => {
  const dll = new DoublyLinkedList(1);
  dll.add(2);
  let k = dll.next();
  expect(k).toBe(1);
  k = dll.prev();
  expect(k).toBe(2);
  k = dll.current();
  expect(k).toBe(1);
})

it('can get retrieve at index', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  dll.add(6);
  dll.add(7);
  dll.add(8);
  expect(dll.get(2)).toBe(6);
})

it('can delete at index', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  dll.add(6);
  expect(dll.get(1)).toBe(5);
  dll.removeAt(1);
  expect(dll.get(1)).not.toBe(5);
  expect(dll.get(1)).toBe(6);
  expect(dll.count).toBe(2);
})

it('can delete at index 0 multiple times', () => {
  const dll = new DoublyLinkedList(2);
  expect(dll.count).toBe(1);
  dll.add(5);
  expect(dll.count).toBe(2);
  dll.add(6);
  expect(dll.count).toBe(3);
  expect(dll.get(0)).toBe(2);
  dll.removeAt(0);
  expect(dll.get(0)).toBe(5);
  expect(dll.count).toBe(2);
  dll.removeAt(0);
  expect(dll.get(0)).toBe(6);
  expect(dll.count).toBe(1);
})

it('can delete a value', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  dll.add(6);
  expect(dll.get(1)).toBe(5);
  dll.remove(5);
  expect(dll.count).toBe(2);
  expect(dll.get(1)).toBe(6);
})

it('can delete last value', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  expect(dll.get(1)).toBe(5);
  dll.removeLast();
  expect(() => dll.get(1)).toThrow();
})

it('can iterate', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  const v = [2, 5];
  dll.iterate((idx, val) => {
    expect(val).toBe(v[idx]);
  })
})

it('can insert', () => {
  const dll = new DoublyLinkedList(2);
  dll.add(5);
  expect(dll.get(1)).toBe(5);
  dll.insert(1, 10);
  expect(dll.get(1)).toBe(10);
})

it('can insert at beginning', () => {
  const dll = new DoublyLinkedList(2);
  expect(dll.get(0)).toBe(2);
  dll.insert(0, 5);
  expect(dll.get(0)).toBe(5);
})

it('can throws error when index out of range', () => {
  const dll = new DoublyLinkedList(2);
  expect(() => dll.insert(15, 2)).toThrowError('Index [15] out of range.');
})

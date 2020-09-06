import {LinkedList as LL} from "./LinkedList";

it('can be initialized with array', () => {
  const ll = new LL<number>([5, 2, 3]);
  expect(ll.last()).toBe(3);
})

it('can add to linked list', () => {
  const ll = new LL(2);
  expect(ll.first()).toBe(2);
  expect(ll.last()).toBe(2);
  ll.add(5);
  expect(ll.last()).toBe(5);
});

it('can check if it contains value', () => {
  const ll = new LL(2);
  expect(ll.contains(2)).toBe(true);
  expect(ll.contains(5)).toBe(false);
})

it('can get retrieve at index', () => {
  const ll = new LL(2);
  ll.add(5);
  ll.add(6);
  ll.add(7);
  ll.add(8);
  expect(ll.get(2)).toBe(6);
})

it('can delete at index', () => {
  const ll = new LL(2);
  ll.add(5);
  ll.add(6);
  expect(ll.get(1)).toBe(5);
  ll.removeAt(1);
  expect(ll.get(1)).not.toBe(5);
  expect(ll.get(1)).toBe(6);
  expect(ll.count).toBe(2);
})

it('can delete a value', () => {
  const ll = new LL(2);
  ll.add(5);
  ll.add(6);
  expect(ll.get(1)).toBe(5);
  ll.remove(5);
  expect(ll.count).toBe(2);
  expect(ll.get(1)).toBe(6);
})

it('can iterate', () => {
  const ll = new LL(2);
  ll.add(5);
  const v = [2, 5];
  ll.iterate((idx, val) => {
    expect(val).toBe(v[idx]);
  })
})

it('can insert', () => {
  const ll = new LL(2);
  ll.add(5);
  expect(ll.get(1)).toBe(5);
  ll.insert(1, 10);
  expect(ll.get(1)).toBe(10);
})

it('can go to next value', () => {
  const ll = new LL(1);
  ll.add(2);
  let k = ll.next();
  expect(k).toBe(1);
  k = ll.current();
  expect(k).toBe(2);
})

it('can insert at beginning', () => {
  const ll = new LL(2);
  expect(ll.get(0)).toBe(2);
  ll.insert(0, 5);
  expect(ll.get(0)).toBe(5);
})

it('can throws error when index out of range', () => {
  const ll = new LL(2);
  expect(() => ll.insert(15, 2)).toThrowError('Index [15] out of range.');
})

import { Stack } from "./Stack";

it('can check if it contains value', () => {
  const stack = new Stack(2);
  expect(stack.contains(2)).toBe(true);
  expect(stack.contains(5)).toBe(false);
})

it('can push', () => {
  const stack = new Stack<number>();
  expect(stack.size()).toBe(0);
  stack.push(5);
  expect(stack.size()).toBe(1);
  expect(stack.peek()).toBe(5);
})

it('can pop', () => {
  const stack = new Stack<number>([1,2,3]);
  expect(stack.size()).toBe(3);
  expect(stack.pop()).toBe(3);
  expect(stack.size()).toBe(2);
})

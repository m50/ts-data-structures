import { Queue } from "./Queue";

it('can check if it contains value', () => {
  const queue = new Queue(2);
  expect(queue.contains(2)).toBe(true);
  expect(queue.contains(5)).toBe(false);
})

it('can enqueue', () => {
  const queue = new Queue<number>();
  expect(queue.size()).toBe(0);
  queue.enqueue(5);
  expect(queue.size()).toBe(1);
  expect(queue.peek()).toBe(5);
})

it('can dequeue', () => {
  const queue = new Queue<number>([1,2,3]);
  expect(queue.size()).toBe(3);
  expect(queue.dequeue()).toBe(1);
  expect(queue.size()).toBe(2);
})

it('can be processed', () => {
  const vals = [1, 2, 3];
  const q = new Queue<number>(vals);
  let idx = 0;
  q.process((val) => {
    expect(val).toBe(vals[idx]);
    idx++;
  })
})

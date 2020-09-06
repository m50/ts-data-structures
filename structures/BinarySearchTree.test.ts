import { BinarySearchTree as BST } from "./BinarySearchTree";

it('can add to tree', () => {
  const bst = new BST(5);
  expect(bst.size()).toBe(1);
  bst.add(6);
  expect(bst.size()).toBe(2);
})

it('throws when duplicate value gets added to tree', () => {
  const bst = new BST(5);
  expect(() => bst.add(5)).toThrowError('Value [5] already exists in Binary Search Tree. Duplicate values aren\'t allowed.');
});

it('can remove from tree', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(6);
  bst.add(1);
  expect(bst.size()).toBe(4);
  expect(bst.contains(2)).toBe(true);
  bst.remove(2);
  expect(bst.size()).toBe(3);
  expect(bst.contains(2)).toBe(false);
})

it('can get largest value', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(9);
  bst.add(6);
  bst.add(12);
  expect(bst.digRight().value).toBe(12);
})

it('can get largest value', () => {
  const bst = new BST(5);
  bst.add(3);
  bst.add(9);
  bst.add(4);
  bst.add(1);
  expect(bst.digLeft().value).toBe(1);
})

it('can preorder', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(3);
  bst.add(6);
  bst.add(1);
  const order = [5, 2, 1, 3, 6];
  let idx = 0;
  bst.preorder((val) => {
    expect(val).toBe(order[idx]);
    idx++;
  });
})

it('can inorder', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(6);
  bst.add(1);
  const order = [1, 2, 5, 6];
  let idx = 0;
  bst.inorder((val) => {
    expect(val).toBe(order[idx]);
    idx++;
  });
})

it('can postorder', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(3);
  bst.add(6);
  bst.add(1);
  const order = [1, 3, 2, 6, 5];
  let idx = 0;
  bst.postorder((val) => {
    expect(val).toBe(order[idx]);
    idx++;
  });
})

it('can level order', () => {
  const bst = new BST(5);
  bst.add(2);
  bst.add(3);
  bst.add(6);
  bst.add(1);
  const order = [5,2,6,1,3];
  let idx = 0;
  bst.levelOrder((val) => {
    expect(val).toBe(order[idx]);
    idx++;
  });
})

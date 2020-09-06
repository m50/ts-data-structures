import { Queue } from "./Queue";

export class BinarySearchTree<T> {
  private _count: number = 0;
  private _root?: BST_Node<T>

  constructor(value: T) {
    this._root = { value };
    this._count++;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this._count;
  }

  find(value: T, start: BST_Node<T> | undefined = this._root): BST_Node<T> {
    if (typeof start === 'undefined') {
      throw new Error(`Value [${value}] not found in search tree.`);
    }
    if (value < start.value) return this.find(value, start.left);
    else if (value > start.value) return this.find(value, start.right);

    return start;
  }

  digLeft(start: BST_Node<T> | undefined = this._root): BST_Node<T> {
    if (typeof start === 'undefined') {
      throw new Error('Search tree is empty.');
    }
    let cur = start;
    while (typeof cur.left !== 'undefined') {
      cur = cur.left;
    }

    return cur;
  }

  digRight(start: BST_Node<T> | undefined = this._root): BST_Node<T> {
    if (typeof start === 'undefined') {
      throw new Error('Search tree is empty.');
    }
    let cur = start;
    while (typeof cur.right !== 'undefined') {
      cur = cur.right;
    }

    return cur;
  }

  add(value: T): void {
    if (this.contains(value)) {
      throw new Error(`Value [${value}] already exists in Binary Search Tree. Duplicate values aren't allowed.`);
    }
    this._root = this._add(value, this._root);
    this._count++;
  }

  private _add(value: T, node: BST_Node<T> | undefined): BST_Node<T> {
    if (typeof node === 'undefined') {
      node = { value };
    } else {
      if (value < node.value) {
        node.left = this._add(value, node.left);
      } else {
        node.right = this._add(value, node.right);
      }
    }

    return node;
  }

  remove(value: T): void {
    if (!this.contains(value)) return;

    this._root = this._remove(value, this._root);
    this._count--;
  }

  private _remove(value: T, node: BST_Node<T> | undefined): BST_Node<T> | undefined {
    if (typeof node === 'undefined') return;

    if (value < node.value) {
      node.left = this._remove(value, node.left);
    } else if (value > node.value) {
      node.right = this._remove(value, node.right);
    } else {
      if (typeof node.left === 'undefined') {
        return node.right;
      } else if (typeof node.right === 'undefined') {
        return node.left;
      } else {
        const tmp = this.digLeft(node.right);
        node.right = this._remove(value, node.right);
      }
    }

    return node;
  }

  contains(value: T): boolean {
    return this._contains(value, this._root);
  }
  private _contains(value: T, node: BST_Node<T> | undefined): boolean {
    if (typeof node === 'undefined') return false;

    if (value < node.value) {
      return this._contains(value, node.left);
    }
    else if (value > node.value) {
      return this._contains(value, node.right);
    }

    return true;
  }

  traverse(order: TreeTraversalOrder, callback: cb<T>): void {
    switch (order) {
      case TreeTraversalOrder.PRE_ORDER: return this.preorder(callback);
      case TreeTraversalOrder.IN_ORDER: return this.inorder(callback);
      case TreeTraversalOrder.POST_ORDER: return this.postorder(callback);
      case TreeTraversalOrder.LEVEL_ORDER: return this.levelOrder(callback);
    }
  }

  preorder(callback: cb<T>): void {
    return this._preorder(callback, this._root);
  }
  inorder(callback: cb<T>): void {
    return this._inorder(callback, this._root);
  }
  postorder(callback: cb<T>): void {
    return this._postorder(callback, this._root);
  }
  levelOrder(callback: cb<T>): void {
    if (typeof this._root === 'undefined') {
      throw new Error('Search tree is empty');
    }
    const q = new Queue<BST_Node<T>>();
    q.enqueue(this._root);
    this._addToQueue(this._root, q);

    q.process((val) => callback(val.value));
  }

  private _addToQueue(start: BST_Node<T>, q: Queue<BST_Node<T>>): void {
    const leftDefined = typeof start.left !== 'undefined';
    const rightDefined = typeof start.right !== 'undefined';
    if (leftDefined) {
      q.enqueue(start.left as BST_Node<T>);
    }
    if (rightDefined) {
      q.enqueue(start.right as BST_Node<T>);
    }
    if (leftDefined) {
      this._addToQueue(start.left as BST_Node<T>, q);
    }
    if (rightDefined) {
      this._addToQueue(start.right as BST_Node<T>, q);
    }
  }

  private _preorder(callback: cb<T>, node?: BST_Node<T>): void {
    if (typeof node === 'undefined') return;
    callback(node.value);
    this._preorder(callback, node.left);
    this._preorder(callback, node.right);
  }
  private _inorder(callback: cb<T>, node?: BST_Node<T>): void {
    if (typeof node === 'undefined') return;
    this._inorder(callback, node.left);
    callback(node.value);
    this._inorder(callback, node.right);
  }
  private _postorder(callback: cb<T>, node?: BST_Node<T>): void {
    if (typeof node === 'undefined') return;
    this._postorder(callback, node.left);
    this._postorder(callback, node.right);
    callback(node.value);
  }
}

type cb<T> = (val: T) => void;

interface BST_Node<T> {
  value: T,
  left?: BST_Node<T>,
  right?: BST_Node<T>,
}

export enum TreeTraversalOrder {
  PRE_ORDER,
  IN_ORDER,
  POST_ORDER,
  LEVEL_ORDER,
}

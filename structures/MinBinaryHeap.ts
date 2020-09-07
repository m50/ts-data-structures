export class MinBinaryHeap<T> {
  private _root?: BH_Node<T>
  private _count: number = 0;

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

  find(value: T, node: BH_Node<T> | undefined = this._root): BH_Node<T> {
    if (typeof node === 'undefined') {
      throw new Error(`Value [${value}] not found in search tree.`);
    }

    return node;
  }

  contains(value: T): boolean {
    return this._contains(value, this._root);
  }
  private _contains(value: T, node: BH_Node<T> | undefined): boolean {
    if (typeof node === 'undefined') return false;

    return true;
  }

  add(value: T): void {
    if (this.contains(value)) {
      throw new Error(`Value [${value}] already exists in Binary Search Tree. Duplicate values aren't allowed.`);
    }
    this._root = this._add(value, this._root);
    this._count++;
  }

  private _add(value: T, node: BH_Node<T> | undefined): BH_Node<T> {
    if (typeof node === 'undefined') {
      node = { value };
    } else {
      if (typeof node.left !== 'undefined') {
        
      }
    }

    return node;
  }
}

interface BH_Node<T> {
  value: T,
  left?: BH_Node<T>,
  right?: BH_Node<T>,
}

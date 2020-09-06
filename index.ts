import {LinkedList as LL} from "./structures/LinkedList";

console.log("Linked List usage:");
let linkedList = new LL<number>(5);
linkedList.add(2);
linkedList.add(10);
linkedList.add(30);

console.log("count: ", linkedList.count);
linkedList.iterate((idx, val) => console.log(idx, ": ", val));

console.log("remove 10");
linkedList.remove(10);
linkedList.iterate((idx, val) => console.log(idx, ": ", val));

console.log("remove at 2");
linkedList.removeAt(2);
linkedList.iterate((idx, val) => console.log(idx, ": ", val));

// @flow

import Stack from "./Stack";

export default class Node {
  stack: Stack;
  children: Node[];
  parents: Node[];
  id: number;
  image: string;

  constructor(stack: Stack, id: number) {
    this.parents = [];
    this.children = [];
    this.stack = stack;
    this.id = id;
    this.image = '';
  }

  getChildren(): Node[] {
    return this.children;
  }

  getParents(): Node[] {
    return this.parents;
  }

  addChild(child: Node) {
    this.children.push(child);
  }

  addParent(parent: Node) {
    this.parents.push(parent);
  }

  setImage(image: string) {
    this.image = image;
  }
}
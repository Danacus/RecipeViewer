// @flow

import Stack from "./Stack";
import Recipe from "./Recipe";

export default class Node {
  stack: Stack;
  children: Node[];
  parents: Node[];
  id: number;
  image: string;
  amount: number;
  group: number;
  props: Object;

  constructor(stack: Stack, id: number, amount: number = 0, group: number = 0) {
    this.parents = [];
    this.children = [];
    this.stack = stack;
    this.id = id;
    this.image = '';
    this.amount = amount;
    this.group = group;
    this.props = {};
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
// @flow

import PrimitiveStack from "./PrimitiveStack";

export default class PrimitiveNode {
  stack: PrimitiveStack;
  children: PrimitiveNode[];
  parents: PrimitiveNode[];
  id: number;
  image: string;
  amount: number;
  group: number;
  props: Object;

  constructor(stack: PrimitiveStack, id: number, amount: number = 0, group: number = 0) {
    this.parents = [];
    this.children = [];
    this.stack = stack;
    this.id = id;
    this.image = '';
    this.amount = amount;
    this.group = group;
    this.props = {};
  }

  serialize(): Object {
    return {
      stack: this.stack.serialize(),
      id: this.id,
      image: this.image,
      amount: this.amount,
      group: this.group
    }
  }

  deserialize(data: Object) {
    this.stack = new PrimitiveStack(['']).deserialize(data.stack);
    this.id = data.id;
    this.image = data.image;
    this.amount = data.amount;
    this.group = data.group;
    return this;
  }

  getChildren(): PrimitiveNode[] {
    return this.children;
  }

  getParents(): PrimitiveNode[] {
    return this.parents;
  }

  addChild(child: PrimitiveNode) {
    this.children.push(child);
  }

  addParent(parent: PrimitiveNode) {
    this.parents.push(parent);
  }

  setImage(image: string) {
    this.image = image;
  }
}
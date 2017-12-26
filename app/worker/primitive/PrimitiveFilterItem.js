// @flow

import PrimitiveStack from "./PrimitiveStack";

export default class PrimitiveFilterItem {
  value: string;
  inverse: boolean;

  constructor(value: string, inverse: boolean = false) {
    this.value = value;
    this.inverse = inverse;
  }

  test(item: string): boolean {
    return this.inverse ? this.value != item : this.value == item;
  }

  testStack(item: PrimitiveStack): boolean {
    return (item.names.some(name => this.test(name)) && !item.names.every(name => !this.test(name))) || item.names.length == 0;
  }

  testStacks(items: PrimitiveStack[]): boolean {
    return (items.every(stack => this.testStack(stack)) && !items.every(stack => !this.testStack(stack)));
  }

  serialize(): Object {
    return {
      value: this.value,
      inverse: this.inverse
    }
  }

  deserialize(data: Object) {
    this.value = data.value;
    this.inverse = data.inverse;
    return this;
  }
}
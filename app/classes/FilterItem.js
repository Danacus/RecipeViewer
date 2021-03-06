// @flow

import { observable, action } from "mobx";
import Stack from "./Stack";

export default class FilterItem {
  @observable value: string;
  @observable inverse: boolean;

  constructor(value: string, inverse: boolean = false) {
    this.value = value;
    this.inverse = inverse;
  }

  test(item: string): boolean {
    return this.inverse ? this.value != item : this.value == item;
  }

  testStack(item: Stack): boolean {
    return (item.names.some(name => this.test(name)) && !item.names.every(name => !this.test(name))) || item.names.length == 0;
  }

  testStacks(items: Stack[]): boolean {
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
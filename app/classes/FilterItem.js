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

  matches(item: string): boolean {
    return this.inverse ? this.value != item : this.value == item;
  }

  matchesStack(item: Stack): boolean {
    return item.names.some(name => this.matches(name)) || item.names.length == 0;
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
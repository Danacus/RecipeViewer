// @flow

import Stack from "./Stack";

export default class Recipe {
  inputs: Stack[];
  outputs: Stack[];
  catalysts: Stack[];
  id: number;
  constructor(inputs: Stack[], outputs: Stack[], catalysts: Stack[], id: number) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.catalysts = catalysts;
    this.id = id;
  }

  isWhitelisted(list: RegExp[]): boolean {
    return (this.inputs.every(input => input.isWhitelisted(list)) && this.catalysts.some(catalyst => catalyst.isWhitelisted(list))) || list.length == 0;
  }

  isBlacklisted(list: RegExp[]): boolean {
    return this.inputs.some(input => input.isBlacklisted(list)) || this.catalysts.some(catalyst => catalyst.isBlacklisted(list));
  }
}
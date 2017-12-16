// @flow

import Stack from "./Stack";

export default class Recipe {
  inputs: Stack[];
  outputs: Stack[];
  catalysts: Stack[];
  constructor(inputs: Stack[], outputs: Stack[], catalysts: Stack[]) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.catalysts = catalysts;
  }
}
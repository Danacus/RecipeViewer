import Stack from "./Stack";

export default class Recipe {
  inputs: Stack[];
  outputs: Stack[];
  constructor(inputs: Stack[], outputs: Stack[]) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
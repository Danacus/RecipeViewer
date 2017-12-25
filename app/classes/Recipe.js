// @flow

import Stack from "./Stack";

export default class Recipe {
  inputs: Stack[];
  outputs: Stack[];
  catalysts: Stack[];
  id: number;
  props: Object;

  constructor(inputs: Stack[], outputs: Stack[], catalysts: Stack[], id: number) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.catalysts = catalysts;
    this.id = id;
    this.props = {};
  }

  serialize(): Object {
    return {
      inputs: this.inputs.map(input => input.serialize()),
      outputs: this.outputs.map(output => output.serialize()),
      catalysts: this.catalysts.map(catalyst => catalyst.serialize()),
      id: this.id,
    }
  }

  deserialize(data: Object) {
    this.inputs = data.inputs.map(input => new Stack(['']).deserialize(input));
    this.outputs = data.outputs.map(output => new Stack(['']).deserialize(output));
    this.catalysts = data.catalysts.map(catalyst => new Stack(['']).deserialize(catalyst));
    this.id = data.id;
    this.props = {};
    return this;
  }
}
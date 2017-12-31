// @flow

import Stack from "./Stack";

export default class Recipe {
  inputs: Stack[];
  outputs: Stack[];
  catalysts: Stack[];
  category: string;
  id: number;
  name: ?string;
  props: Object;

  constructor(inputs: Stack[] = [], outputs: Stack[] = [], catalysts: Stack[] = [], id: number = -1, name: ?string) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.catalysts = catalysts;
    this.id = id;
    this.props = {};
    this.name = name;
  }

  serialize(): Object {
    return {
      inputs: this.inputs.map(input => input.serialize()),
      outputs: this.outputs.map(output => output.serialize()),
      catalysts: this.catalysts.map(catalyst => catalyst.serialize()),
      category: this.category,
      id: this.id,
    }
  }

  deserialize(data: Object) {
    this.inputs = data.inputs.map(input => new Stack().deserialize(input));
    this.outputs = data.outputs.map(output => new Stack().deserialize(output));
    this.catalysts = data.catalysts.map(catalyst => new Stack().deserialize(catalyst));
    this.id = data.id;
    this.category = data.category;
    this.props = {};
    return this;
  }
}
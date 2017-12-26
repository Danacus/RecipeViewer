// @flow

import PrimitiveStack from "./PrimitiveStack";

export default class Recipe {
  inputs: PrimitiveStack[];
  outputs: PrimitiveStack[];
  catalysts: PrimitiveStack[];
  category: string;
  id: number;
  props: Object;

  constructor(inputs: PrimitiveStack[], outputs: PrimitiveStack[], catalysts: PrimitiveStack[], id: number) {
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
      category: this.category,
      id: this.id,
    }
  }

  deserialize(data: Object) {
    this.inputs = data.inputs.map(input => new PrimitiveStack(['']).deserialize(input));
    this.outputs = data.outputs.map(output => new PrimitiveStack(['']).deserialize(output));
    this.catalysts = data.catalysts.map(catalyst => new PrimitiveStack(['']).deserialize(catalyst));
    this.id = data.id;
    this.category = data.category;
    this.props = {};
    return this;
  }
}
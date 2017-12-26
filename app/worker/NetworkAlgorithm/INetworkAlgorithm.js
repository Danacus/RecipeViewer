// @flow

import PrimitiveStack from "../primitive/PrimitiveStack";
import PrimitiveRecipes from "../primitive/PrimitiveRecipes";

export interface INetworkAlgorithm {
  target: PrimitiveStack;
  recipes: PrimitiveRecipes;
  limit: number;
  depth: number;
  counter: number;
  
  static name(): string;
  generateNetwork(): Object;
}
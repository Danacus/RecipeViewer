// @flow

import Stack from "../../api/Stack";
import Recipes from "../../api/Recipes";

export interface INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  counter: number;
  
  static name(): string;
  generateNetwork(): Object;
}
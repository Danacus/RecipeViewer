// @flow

import Stack from "../Stack";
import Recipe from "../Recipe";
import Node from '../Node';
import Recipes from "../../worker/PrimitiveRecipes";

export interface INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  counter: number;
  
  static name(): string;
  generateNetwork(): Object;
}
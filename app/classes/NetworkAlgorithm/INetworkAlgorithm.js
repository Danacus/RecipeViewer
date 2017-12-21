// @flow

import Stack from "../Stack";
import Recipe from "../Recipe";
import Node from '../Node';
import Recipes from "../../stores/Recipes";
import Filter from "../Filter";

export interface INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  filter: Filter;
  counter: number;
  
  static name(): string;
  generateNetwork(): Object;
}
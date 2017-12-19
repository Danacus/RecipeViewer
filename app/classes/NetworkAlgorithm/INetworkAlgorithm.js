// @flow

import Stack from "../Stack";
import Recipe from "../Recipe";
import Node from '../Node';
import Recipes from "../../stores/Recipes";

export interface INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  blacklist: RegExp[];
  whitelist: RegExp[];
  counter: number;
  name: string;
  
  generateNetwork(): Node[];
}
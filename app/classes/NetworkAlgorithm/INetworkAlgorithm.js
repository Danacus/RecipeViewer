// @flow

import Stack from "../Stack";
import Recipe from "../Recipe";
import Node from '../Node';
import Recipes from "../../stores/Recipes";

export type AlgorithmOptions = {
  target: Stack,
  recipes: Recipes,
  limit: number,
  depth: number,
  blacklist: RegExp[],
  whitelist: RegExp[],
}

export default class INetworkAlgorithm {
  options: AlgorithmOptions;
  counter: number;
  name: string;
  constructor(options: AlgorithmOptions) {
    this.options = options;
    this.counter = 0;
  }

  generateNetwork(): Node[] {return [];}
}
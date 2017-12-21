// @flow

import Stack from "./Stack";
import Node from "./Node";
import Recipe from "./Recipe";

export default class Edge {
  child: Node;
  parent: Node;
  recipe: Recipe;
  recipeIndex: number;
  id: number;
  props: Object;

  constructor(parent: Node, child: Node, recipe: Recipe, index: number, id: number) {
    this.parent = parent;
    this.child = child;
    this.recipe = recipe;
    this.recipeIndex = index;
    this.id = id;
    this.props = {};
  }
}
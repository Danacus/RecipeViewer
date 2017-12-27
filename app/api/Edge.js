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

  constructor(parent: Node = new Node(), child: Node = new Node(), recipe: Recipe = new Recipe(), index: number = 0, id: number = 0) {
    this.parent = parent;
    this.child = child;
    this.recipe = recipe;
    this.recipeIndex = index;
    this.id = id;
    this.props = {};
  }

  serialize(): Object {
    return {
      child: this.child.serialize(),
      parent: this.parent.serialize(),
      recipe: this.recipe.serialize(),
      recipeIndex: this.recipeIndex,
      id: this.id
    }
  }

  deserialize(data: Object) {
    this.child = new Node().deserialize(data.child);
    this.parent = new Node().deserialize(data.parent);
    this.recipe = new Recipe().deserialize(data.recipe);
    this.recipeIndex = data.recipeIndex;
    this.id = data.id;
    return this;
  }
}
// @flow

import PrimitiveStack from "./PrimitiveStack";
import PrimitiveNode from "./PrimitiveNode";
import PrimitiveRecipe from "./PrimitiveRecipe";

export default class Edge {
  child: PrimitiveNode;
  parent: PrimitiveNode;
  recipe: PrimitiveRecipe;
  recipeIndex: number;
  id: number;
  props: Object;

  constructor(parent: PrimitiveNode, child: PrimitiveNode, recipe: PrimitiveRecipe, index: number, id: number) {
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
    this.child = new PrimitiveNode(new PrimitiveStack(['']), -1, -1).deserialize(data.child);
    this.parent = new PrimitiveNode(new PrimitiveStack(['']), -1, -1).deserialize(data.parent);
    this.recipe = new PrimitiveRecipe([], [], [], -1).deserialize(data.recipe);
    this.recipeIndex = data.recipeIndex;
    this.id = data.id;
    return this;
  }
}
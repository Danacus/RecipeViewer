// @flow

import Recipe from "./Recipe";
import Stack from "./Stack";

export default class Recipes {
  recipes: Recipe[] = [];
  categories: string[] = [];

  serialize(): Object {
    return {
      recipes: this.recipes.map(recipe => recipe.serialize()),
      categories: this.categories
    }
  }

  deserialize(data: Object) {
    this.recipes = data.recipes.map(recipe => new Recipe().deserialize(recipe));
    this.categories = data.categories;
    return this;
  }

  getRecipesWithOutput(output: Stack): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => recipeOutput.equals(output)));
  }

  getRecipesWithInput(input: Stack): Recipe[] {
    return this.recipes.filter(recipe => recipe.inputs.some(recipeInput => recipeInput.equals(input)));
  }

  getRecipesWithOutputs(outputs: Stack[]): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => outputs.some(output => recipeOutput.equals(output))));
  }

  getRecipesWithInputs(inputs: Stack[]): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeInput => inputs.some(input => recipeInput.equals(input))));
  }
}

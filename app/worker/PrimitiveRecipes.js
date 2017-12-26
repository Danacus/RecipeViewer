// @flow

import Recipe from "../classes/Recipe";
import Stack from "../classes/Stack";


//Thanks to the serialization, I can convert between Recipes and PrimitiveRecipes. Neat!
export default class PrimitiveRecipes {
  recipes: Recipe[] = [];
  categories: string[] = [];

  serialize(): Object {
    return {
      recipes: this.recipes.map(recipe => recipe.serialize()),
      categories: this.categories
    }
  }

  deserialize(data: Object) {
    this.recipes = data.recipes.map(recipe => new Recipe([], [], [], -1).deserialize(recipe));
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

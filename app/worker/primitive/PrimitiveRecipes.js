// @flow

import PrimitiveRecipe from "./PrimitiveRecipe";
import PrimitiveStack from "./PrimitiveStack";


//Thanks to the serialization, I can convert between Recipes and PrimitiveRecipes. Neat!
export default class PrimitiveRecipes {
  recipes: PrimitiveRecipe[] = [];
  categories: string[] = [];

  serialize(): Object {
    return {
      recipes: this.recipes.map(recipe => recipe.serialize()),
      categories: this.categories
    }
  }

  deserialize(data: Object) {
    this.recipes = data.recipes.map(recipe => new PrimitiveRecipe([], [], [], -1).deserialize(recipe));
    this.categories = data.categories;
    return this;
  }

  getRecipesWithOutput(output: PrimitiveStack): PrimitiveRecipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => recipeOutput.equals(output)));
  }

  getRecipesWithInput(input: PrimitiveStack): PrimitiveRecipe[] {
    return this.recipes.filter(recipe => recipe.inputs.some(recipeInput => recipeInput.equals(input)));
  }

  getRecipesWithOutputs(outputs: PrimitiveStack[]): PrimitiveRecipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => outputs.some(output => recipeOutput.equals(output))));
  }

  getRecipesWithInputs(inputs: PrimitiveStack[]): PrimitiveRecipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeInput => inputs.some(input => recipeInput.equals(input))));
  }
}

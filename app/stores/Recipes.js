// @flow

import { observable, computed } from "mobx";
import Recipe from "../classes/Recipe";
import Stack from "../classes/Stack";
import jetpack from 'fs-jetpack';

export default class Recipes {
  @observable recipes: Recipe[] = [];

  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  @computed get list(): Recipe[] {
    return this.recipes;
  }

  getRecipesWithOutput(output: Stack): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => recipeOutput.matches(output)));
  }

  getRecipesWithInput(input: Stack): Recipe[] {
    return this.recipes.filter(recipe => recipe.inputs.some(recipeInput => recipeInput.matches(input)));
  }

  getRecipesWithOutputs(outputs: Stack[]): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeOutput => outputs.some(output => recipeOutput.matches(output))));
  }

  getRecipesWithInputs(inputs: Stack[]): Recipe[] {
    return this.recipes.filter(recipe => recipe.outputs.some(recipeInput => inputs.some(input => recipeInput.matches(input))));
  }

  loadRecipes(gamePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let recipePath = gamePath + "/config/jeiexporter/exports/recipes/";

      jetpack.findAsync(recipePath, {matching: "*.json"}).then(files =>
        Promise.all(files.map(file =>
          this.readRecipeFile(file)
        )).then(() => resolve())
      )
    })
  }

  readRecipeFile(file: string): Promise<any> {
    return jetpack.readAsync(file, 'json').then(file => this.loadRecipeFile(file))
  }

  loadRecipeFile(file: {recipes: [], catalysts: []}) {
    file.recipes.forEach(recipe => {
      this.recipes.push(new Recipe(
        recipe.input.items.map(item => new Stack(item.stacks.map(stack => stack.name))),
        recipe.output.items.map(item => new Stack(item.stacks.map(stack => stack.name))),
        file.catalysts.map(catalyst => new Stack([catalyst]))
      ))
    })
  }
}
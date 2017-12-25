// @flow

import { observable, computed } from "mobx";
import Recipe from "../classes/Recipe";
import Stack from "../classes/Stack";
import jetpack from 'fs-jetpack';

export default class Recipes {
  @observable recipes: Recipe[] = [];

  @computed get list(): Recipe[] {
    return this.recipes;
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

  loadRecipes(gamePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.recipes = [];
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
    file.recipes.forEach((recipe, i) => {
      this.recipes.push(new Recipe(
        recipe.input.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        recipe.output.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        file.catalysts.map(catalyst => new Stack([catalyst])),
        i
      ))
    })

    this.recipes.forEach(recipe => {
      recipe.inputs = reduceStacks(recipe.inputs);
      recipe.outputs = reduceStacks(recipe.outputs);
    })
  }
}

const reduceStacks = (stacks: Stack[]) => {
  return stacks.reduce((total: Array<Stack>, current: Stack) => {
    let other = total.find(stack => stack.equals(current));

    if (!other) {
      total.push(current);
    } else {
      other.amount += current.amount;
    }

    return total;
  }, [])
}
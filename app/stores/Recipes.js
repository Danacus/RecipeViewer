// @flow

import { observable, computed } from "mobx";
import Recipe from "../classes/Recipe";
import Stack from "../classes/Stack";
import jetpack from 'fs-jetpack';
import { ipcRenderer } from "electron";
import os from 'os';
import { store } from "../App";

export default class Recipes {
  @observable recipes: Recipe[] = [];

  @computed get list(): Recipe[] {
    return this.recipes;
  }

  serialize(): Object {
    return {
      recipes: this.recipes.map(recipe => recipe.serialize())
    }
  }

  deserialize(data: Object) {
    this.recipes = data.recipes.map(recipe => new Recipe([], [], [], -1).deserialize(recipe));
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

  loadRecipes(gamePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.recipes = [];
      let recipePath = gamePath + "/config/jeiexporter/exports/recipes/";

      jetpack.findAsync(recipePath, {matching: "*.json"}).then(files => {
        let chunks = [];
        for (var i = 0, j = 0; i < os.cpus().length; i++, j += files.length / os.cpus().length) {
          if (i == os.cpus().length - 1) {
            chunks[i] = files.slice(j, files.length);
          } else {
            chunks[i] = files.slice(j, j + files.length / os.cpus().length);
          } 
        }

        let counter = chunks.length;
        chunks.forEach((chunk, i) => {
          store.tasks.push(`Worker #${i}: Loading recipes...`);
          ipcRenderer.send('start', {path: chunk, type: 'recipeloader'});
        });

        ipcRenderer.on('recipeloader-response', (event, data) => {  
          counter--; 
          data.recipes = data.recipes.map(recipe => new Recipe([], [], [], -1).deserialize(recipe));
          console.log("Added recipe file")
          store.tasks = store.tasks.filter(task => task != `Worker #${counter}: Loading recipes...`);

          this.recipes = this.recipes.concat(data.recipes);   

          if (counter == 0) {
            console.log("Done")
            ipcRenderer.removeAllListeners('recipeloader-response');
            resolve();
          }
        })
      })
    })
  }

  readRecipeFile(file: string): Promise<any> {
    return jetpack.readAsync(file, 'json').then(file => this.loadRecipeFile(file))
  }

  loadRecipeFile(file: {recipes: [], catalysts: []}) {
    let recipes: Recipe[] = [];
    file.recipes.forEach((recipe, i) => {
      recipes.push(new Recipe(
        recipe.input.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        recipe.output.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        file.catalysts.map(catalyst => new Stack([catalyst])),
        i
      ))
    })

    return recipes;
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
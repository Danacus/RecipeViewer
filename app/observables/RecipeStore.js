// @flow

import { observable, computed } from "mobx";
import Recipe from "../api/Recipe";
import Stack from "../api/Stack";
import jetpack from 'fs-jetpack';
import { ipcRenderer } from "electron";
import os from 'os';
import { store } from "../App";
import Recipes from "../api/Recipes";
import { action } from "mobx";

export default class RecipeStore extends Recipes {
  @observable categories: string[] = [];
  @observable recipes: Recipe[];

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
          ipcRenderer.send('start', {path: chunk, type: 'recipeloader'});
        });

        store.addTask(`Loading recipes (${chunks.length - counter + 1}/${chunks.length})`);

        ipcRenderer.on('recipeloader-response', (event, data) => {  
          store.removeTask(`Loading recipes (${chunks.length - counter + 1}/${chunks.length})`);
          counter--; 
          data.recipes = data.recipes.map(recipe => new Recipe().deserialize(recipe));
          console.log("Added recipe file");
          store.addTask(`Loading recipes (${chunks.length - counter + 1}/${chunks.length})`);    

          this.recipes = this.recipes.concat(data.recipes);  
          this.categories = this.categories.concat(data.categories); 

          if (counter == 0) {
            console.log("Done")
            store.removeTask(`Loading recipes (${chunks.length - counter + 1}/${chunks.length})`);
            ipcRenderer.removeAllListeners('recipeloader-response');
            resolve();
          }
        })
      })
    })
  }

  addRecipe(inputs: Stack[], outputs: Stack[], catalysts: Stack[], name: string) {
    console.log(`Adding recipe ${name}:`);
    console.log(inputs);
    console.log(outputs);
    console.log(catalysts);
    console.log(new Recipe(inputs, outputs, catalysts, this.recipes.length, name))
    this.recipes.push(new Recipe(inputs, outputs, catalysts, this.recipes.length, name));
  }

  @action
  removeRecipe(inputs: ?Stack[], outputs: Stack[], catalysts: Stack[], wildcard: boolean = false) {
    this.recipes = this.recipes.filter(recipe => 
      wildcard && inputs ?
      !recipe.outputs.map(output => output.serialize()) == outputs.map(output => output.serialize())
      && !recipe.inputs.some(input => inputs.some(inp => inp.equals(input))) :
      !recipe.outputs.map(output => output.names) == outputs.map(output => output.names)
      && inputs ? !recipe.inputs.map(input => input.serialize()) == outputs.map(output => output.serialize()) : true
    );
  }

  @action
  removeAllRecipes(catalysts: Stack[]) {
    this.recipes = this.recipes.filter(recipe => 
      !recipe.catalysts.some(catalyst => catalysts.some(cat => cat.equals(catalyst)))
    )
  } 

  @action
  removeRecipesByName(name: string) {
    this.recipes = this.recipes.filter(recipe => 
      recipe.name === name
    )
  }

  @action
  removeRecipesByRegex(name: RegExp) {
    this.recipes = this.recipes.filter(recipe => 
      recipe.name ? recipe.name.match(name): true
    )
  }
}
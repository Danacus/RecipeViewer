// @flow

import { observable, computed } from "mobx";
import Recipe from "../api/Recipe";
import Stack from "../api/Stack";
import jetpack from 'fs-jetpack';
import { ipcRenderer } from "electron";
import os from 'os';
import { store } from "../App";
import Recipes from "../api/Recipes";

export default class RecipeStore extends Recipes {
  @observable categories: string[] = [];

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

  getRecipesWithOutput(output: Stack): Recipe[] {
    return super.getRecipesWithOutput(output);
  }
}
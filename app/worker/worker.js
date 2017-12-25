// @flow

import { ipcRenderer } from "electron";
import RecipeLoader from "./RecipeLoader";
import { NetworkAlgorithms } from "../classes/NetworkAlgorithm/NetworkAlgorithms";
import Stack from "../classes/Stack";
import Recipes from "../stores/Recipes";

window.onload = () => {
  ipcRenderer.on('recipeloader', (event, data) => {
    let recipeLoader = new RecipeLoader(data.path);
    recipeLoader.readRecipeFiles().then(() => {
      ipcRenderer.send('response', {recipes: recipeLoader.recipes, type: 'recipeloader-response'});
    })
  })

  ipcRenderer.on('algorithm', (event, data) => {
    let algorithm = new NetworkAlgorithms[data.algorithm]();
    algorithm.target = new Stack(['']).deserialize(data.target);
    algorithm.recipes = new Recipes().deserialize(data.recipes);
    algorithm.limit = data.limit;
    algorithm.depth = data.depth;
    let obj = algorithm.generateNetwork();
    ipcRenderer.send('response', {
      type: 'algorithm-response',
      network: data.network,
      nodes: obj.nodes.map(node => node.serialize()),
      edges: obj.edges.map(edge => edge.serialize())
    });
  })
}


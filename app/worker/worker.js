// @flow

import RecipeLoader from "./RecipeLoader";
import { NetworkAlgorithms } from "./NetworkAlgorithm/NetworkAlgorithms";
import Recipes from "../api/Recipes";
import process from 'process';
import Filter from "../api/Filter";
import Stack from "../api/Stack";
import MapLoader from "./MapLoader";

process.on('message', (data) => {
  switch (data.type) {
    case 'recipeloader':
      let recipeLoader = new RecipeLoader(data.path);
      recipeLoader.readRecipeFiles().then(() => {
        process.send({recipes: recipeLoader.recipes, categories: recipeLoader.categories, type: 'recipeloader-response'});
      });
      break;
    case 'maploader':
      let mapLoader = new MapLoader();
      mapLoader.loadAll(data.tooltipMap, data.modlist, new Recipes().deserialize(data.recipes)).then(() => {
        process.send({tooltipMap: mapLoader.titles, modlist: mapLoader.mods, filteredMap: mapLoader.filteredTitles, type: 'maploader-response'});
      });
      break;
    case 'algorithm':
      let algorithm = new NetworkAlgorithms[data.algorithm]();
      let filteredRecipes = new Recipes();
      filteredRecipes.recipes = new Recipes().deserialize(data.recipes).recipes.slice();
      filteredRecipes.recipes = filteredRecipes.recipes.filter(recipe => new Filter().deserialize(data.filter).recipeFilter(recipe));
      algorithm.target = new Stack().deserialize(data.target);
      algorithm.recipes = filteredRecipes;
      algorithm.limit = data.limit;
      algorithm.depth = data.depth;
      let obj = algorithm.generateNetwork();
      process.send({
        type: 'algorithm-response',
        network: data.network,
        nodes: obj.nodes.map(node => node.serialize()),
        edges: obj.edges.map(edge => edge.serialize())
      });
      break;
  }
});
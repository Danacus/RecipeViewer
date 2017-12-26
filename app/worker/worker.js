// @flow

import RecipeLoader from "./RecipeLoader";
import { NetworkAlgorithms } from "../classes/NetworkAlgorithm/NetworkAlgorithms";
import Stack from "../classes/Stack";
import PrimitiveRecipes from "./PrimitiveRecipes";
import process from 'process';
import PrimitiveFilter from "./PrimitiveFilter";

process.on('message', (data) => {
  switch (data.type) {
    case 'recipeloader':
      let recipeLoader = new RecipeLoader(data.path);
      recipeLoader.readRecipeFiles().then(() => {
        process.send({recipes: recipeLoader.recipes, categories: recipeLoader.categories, type: 'recipeloader-response'});
      });
      break;
    case 'algorithm':
      let algorithm = new NetworkAlgorithms[data.algorithm]();
      let filteredRecipes = new PrimitiveRecipes();
      filteredRecipes.recipes = new PrimitiveRecipes().deserialize(data.recipes).recipes.slice();
      filteredRecipes.recipes = filteredRecipes.recipes.filter(recipe => new PrimitiveFilter().deserialize(data.filter).recipeFilter(recipe));
      algorithm.target = new Stack(['']).deserialize(data.target);
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
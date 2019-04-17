// @flow

import RecipeLoader from "./RecipeLoader";
import { NetworkAlgorithms } from "./NetworkAlgorithm/NetworkAlgorithms";
import PrimitiveRecipes from "./primitive/PrimitiveRecipes";
import process from 'process';
import PrimitiveFilter from "./primitive/PrimitiveFilter";
import PrimitiveStack from "./primitive/PrimitiveStack";


process.on('message', (data) => {
  switch (data.type) {
    case 'recipeloader':
      let recipeLoader = new RecipeLoader(data.path);
      recipeLoader.readRecipeFiles().then(() => {
        process.send({recipes: recipeLoader.recipes, categories: recipeLoader.categories, type: 'recipeloader-response'});
      });
      break;
    case 'algorithm':
      let algorithm = NetworkAlgorithms[data.algorithm];
      let filteredRecipes = new PrimitiveRecipes();
      filteredRecipes.recipes = new PrimitiveRecipes().deserialize(data.recipes).recipes.slice();
      filteredRecipes.recipes = filteredRecipes.recipes.filter(recipe => new PrimitiveFilter().deserialize(data.filter).recipeFilter(recipe));
      algorithm.target = new PrimitiveStack(['']).deserialize(data.target);
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
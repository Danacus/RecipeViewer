// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";
import Stack from '../Stack';
import Recipes from '../../stores/Recipes';
import Filter from "../Filter";
import Recipe from "../Recipe";

export default class Shortest implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  filteredRecipes: Recipes;
  limit: number;
  depth: number;
  filter: Filter;
  counter: number;
  nodes: Node[];
  edges: Edge[];

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
  }

  static name(): string {
    return "Shortest"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
    // When you realize you should be using Immutable instead
    this.filteredRecipes = new Recipes(this.recipes.list.slice());
    this.filteredRecipes.recipes = this.filteredRecipes.recipes.filter(recipe => this.filter.recipeFilter(recipe));
    this.counter = 0;
    this.createNode(targetNode, 0);
    return {nodes: this.nodes, edges: this.edges};
  }

  createNode(node: Node, depth: number) {
    this.nodes.push(node);
    this.counter++;

    if (this.counter > this.limit || depth > this.depth) {
      return;
    }

    let parentRecipes = this.filteredRecipes.getRecipesWithOutput(node.stack);

    if (parentRecipes.length > 0) {
      let bestRecipe = this.getCheapest(node.stack).recipe;
  
      bestRecipe.inputs.forEach(input => {
        if (input.names.length > 0 && !node.children.some(child => child.stack.equals(input))) {
          let output = bestRecipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: Node = new Node(input, this.nodes.length + 1, Math.round(100 * node.amount * (input.amount / outputAmount)) / 100, bestRecipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new Edge(n, node, bestRecipe, 0, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    }
  }

  getCheapest(item: Stack): Object {
    let parentRecipes = this.filteredRecipes.getRecipesWithOutput(item);
    let best;

    parentRecipes.forEach(recipe => {
      let price = recipe.inputs.reduce((total, input) => 
        total + this.getCheapest(input).recipe.price
      , 0) / recipe.outputs.reduce((total, output) => 
        total + this.getCheapest(output).recipe.price
      , 0);

      if (!best || price < best.price) {
        recipe.props.price = price;
        best = recipe;
      }
    })

    let obj = {recipe: best, isResource: false}

    if (parentRecipes.length == 0) {
      obj.isResource = true;
      obj.recipe = {price: item.amount}
    } else {
      obj = {recipe: best, isResource: false}
    }

    return obj;
  }
}
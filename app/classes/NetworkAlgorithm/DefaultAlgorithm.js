// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";
import Stack from '../Stack';
import Recipes from '../../stores/Recipes';
import Filter from "../Filter";

export default class DefaultAlgorithm implements INetworkAlgorithm {
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
    return "Default"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
    // When you realize you should be using Immutable instead
    this.filteredRecipes = new Recipes();
    this.filteredRecipes.recipes = this.recipes.list.slice();
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

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0 && !node.children.some(child => child.stack.equals(input))) {
          let output = recipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: Node = new Node(input, this.nodes.length + 1, Math.round(100 * node.amount * (input.amount / outputAmount)) / 100, recipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new Edge(n, node, recipe, i, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    });
  }
}
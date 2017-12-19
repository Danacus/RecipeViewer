// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";
import Stack from '../Stack';
import Recipes from '../../stores/Recipes';

export default class DefaultAlgorithm implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  blacklist: RegExp[];
  whitelist: RegExp[];
  counter: number;
  nodes: Node[];
  edges: Edge[];
  name: string;

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
    this.name = "Default Algorithm"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
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

    let parentRecipes = this.recipes.getRecipesWithOutput(node.stack)
    .filter(recipe => !recipe.isBlacklisted(this.blacklist))
    .filter(recipe => recipe.isWhitelisted(this.whitelist));

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0) {
          let output = recipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: Node = new Node(input, this.nodes.length + 1, Math.ceil(node.amount * (input.amount / outputAmount)), recipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new Edge(n, node, recipe, i, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    });
  }
}
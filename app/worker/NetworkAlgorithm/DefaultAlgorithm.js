// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Stack from '../../api/Stack';
import Recipes from '../../api/Recipes';
import Node from "../../api/Node";
import Edge from "../../api/Edge";

export default class DefaultAlgorithm implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
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

    let parentRecipes = this.recipes.getRecipesWithOutput(node.stack);

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